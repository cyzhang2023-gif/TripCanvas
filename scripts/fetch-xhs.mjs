#!/usr/bin/env node
// Fetches a Xiaohongshu note's content using Playwright headless browser.
// Usage: node scripts/fetch-xhs.mjs <url>
// Outputs JSON: { title, desc, tags } or { error }

import { chromium } from "playwright";

const url = process.argv[2];
if (!url) {
  console.log(JSON.stringify({ error: "No URL provided" }));
  process.exit(1);
}

async function fetchNote(noteUrl) {
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-blink-features=AutomationControlled",
        "--disable-features=IsolateOrigins,site-per-process",
      ],
    });
    const context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      locale: "zh-CN",
      viewport: { width: 1440, height: 900 },
    });

    const page = await context.newPage();

    // Hide webdriver flag
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
      // Override plugins
      Object.defineProperty(navigator, "plugins", {
        get: () => [1, 2, 3, 4, 5],
      });
      // Override permissions
      const originalQuery = window.navigator.permissions.query;
      window.navigator.permissions.query = (parameters) =>
        parameters.name === "notifications"
          ? Promise.resolve({ state: Notification.permission })
          : originalQuery(parameters);
    });

    // Block heavy resources
    await page.route("**/*.{png,jpg,jpeg,gif,webp,avif,mp4,webm,svg,woff,woff2}", (route) => route.abort());
    await page.route("**/api/sns/web/v1/homefeed**", (route) => route.abort());

    // Intercept the feed API response to grab note data directly
    let apiData = null;
    page.on("response", async (response) => {
      const reqUrl = response.url();
      if (reqUrl.includes("/api/sns/web/v1/feed") || reqUrl.includes("/api/sns/web/v1/note")) {
        try {
          const json = await response.json();
          if (json?.data?.items?.[0]?.note_card) {
            const card = json.data.items[0].note_card;
            apiData = {
              title: card.title || "",
              desc: card.desc || card.note_desc || "",
              tags: (card.tag_list || []).map((t) => t?.name).filter(Boolean),
            };
          } else if (json?.data?.note_card || json?.data?.title) {
            const d = json.data.note_card || json.data;
            apiData = {
              title: d.title || "",
              desc: d.desc || d.note_desc || "",
              tags: (d.tag_list || []).map((t) => t?.name).filter(Boolean),
            };
          }
        } catch {}
      }
    });

    await page.goto(noteUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(2000);

    // Debug: save screenshot of initial state
    if (DEBUG) await page.screenshot({ path: "/tmp/xhs-debug-1.png" });

    // Dismiss popups: first check checkbox, then click button
    await page.evaluate(() => {
      // Check the agreement checkbox first if it exists
      const checkboxes = document.querySelectorAll('input[type="checkbox"], [class*="checkbox"], [class*="check"]');
      for (const cb of checkboxes) {
        cb.click?.();
        if (cb instanceof HTMLInputElement) cb.checked = true;
      }
    });
    await page.waitForTimeout(500);

    await page.evaluate(() => {
      const allEls = document.querySelectorAll("button, div, span, a");
      for (const el of allEls) {
        const text = el.textContent?.trim();
        if (text === "同意并继续") {
          el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          break;
        }
      }
    });
    await page.waitForTimeout(2000);

    if (DEBUG) await page.screenshot({ path: "/tmp/xhs-debug-2.png" });

    // Close login popup if it appears
    await page.evaluate(() => {
      const closeEls = document.querySelectorAll('[class*="close"], [class*="Close"]');
      for (const el of closeEls) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.width < 60) {
          el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          break;
        }
      }
    });
    await page.waitForTimeout(1000);

    // Wait for note content to load
    try {
      await page.waitForSelector('#detail-desc, .note-text, [class*="note-content"]', { timeout: 8000 });
    } catch {
      await page.waitForTimeout(3000);
    }

    // If we caught the API response, return it
    if (apiData && (apiData.title || apiData.desc)) {
      await browser.close();
      return apiData;
    }

    // Extract from the rendered page
    const result = await page.evaluate(() => {
      // Try __INITIAL_STATE__
      try {
        const state = window.__INITIAL_STATE__;
        if (state?.note?.noteDetailMap) {
          for (const [key, v] of Object.entries(state.note.noteDetailMap)) {
            if (key === "null") continue;
            const note = v?.note;
            if (note?.title || note?.desc) {
              return {
                title: note.title || "",
                desc: note.desc || "",
                tags: (note.tagList || []).map((t) => t?.name).filter(Boolean),
              };
            }
          }
          // Try the "null" key too
          const nullEntry = state.note.noteDetailMap["null"]?.note;
          if (nullEntry?.title || nullEntry?.desc) {
            return {
              title: nullEntry.title || "",
              desc: nullEntry.desc || "",
              tags: (nullEntry.tagList || []).map((t) => t?.name).filter(Boolean),
            };
          }
        }
      } catch {}

      // DOM extraction
      const title =
        document.querySelector("#detail-title")?.textContent?.trim() ||
        document.querySelector('[class*="title"][class*="note"]')?.textContent?.trim() ||
        "";

      // Try multiple selectors for description
      let desc = "";
      for (const sel of [
        "#detail-desc",
        '[class*="desc"]',
        ".note-text",
        '[class*="content"]',
        "article",
      ]) {
        const el = document.querySelector(sel);
        const text = el?.innerText?.trim();
        if (text && text.length > desc.length && text.length > 10) {
          desc = text;
        }
      }

      const tagEls = document.querySelectorAll('a[href*="/search_result/"], [class*="tag"] a');
      const tags = [...tagEls]
        .map((el) => el.textContent?.trim().replace(/^#/, ""))
        .filter((t) => t && t.length < 20);

      if (title || (desc && desc.length > 20)) {
        return { title, desc: desc.slice(0, 3000), tags: [...new Set(tags)] };
      }

      return null;
    });

    await browser.close();
    return result;
  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    return { error: err.message };
  }
}

const DEBUG = process.argv.includes("--debug");

const result = await fetchNote(url);
console.log(JSON.stringify(result || { error: "No content found" }));
