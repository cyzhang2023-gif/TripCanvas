import { EventEmitter } from "node:events";
const hrtime$1 = /* @__PURE__ */ Object.assign(function hrtime(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, { bigint: function bigint() {
  return BigInt(Date.now() * 1e6);
} });
class ReadStream {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
}
class WriteStream {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
}
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = () => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  };
  return Object.assign(fn, { __unenv__: true });
}
const NODE_VERSION = "22.14.0";
class Process extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
}
const globalProcess = globalThis["process"];
const getBuiltinModule = globalProcess.getBuiltinModule;
const workerdProcess = getBuiltinModule("node:process");
const unenvProcess = new Process({
  env: globalProcess.env,
  hrtime: hrtime$1,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
const { exit, features, platform } = workerdProcess;
const {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime2,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
const _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime2,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
globalThis.process = _process;
const _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
const _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
const nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
class PerformanceEntry {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
}
const PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
class PerformanceMeasure extends PerformanceEntry {
  entryType = "measure";
}
class PerformanceResourceTiming extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
}
class PerformanceObserverEntryList {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
}
class Performance {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
}
class PerformanceObserver {
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
}
const performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
let lastCapturedError;
const TTL_MS = 5e3;
function record(error) {
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record(event.error ?? event));
  globalThis.addEventListener(
    "unhandledrejection",
    (event) => record(event.reason)
  );
}
function consumeLastCapturedError() {
  if (!lastCapturedError) return void 0;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = void 0;
    return void 0;
  }
  const { error } = lastCapturedError;
  lastCapturedError = void 0;
  return error;
}
class TTLCache {
  cache = /* @__PURE__ */ new Map();
  maxSize;
  ttlMs;
  constructor(options) {
    this.maxSize = options.maxSize;
    this.ttlMs = options.ttlMs;
  }
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return void 0;
    if (Date.now() - entry.ts > this.ttlMs) {
      this.cache.delete(key);
      return void 0;
    }
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }
  has(key) {
    return this.get(key) !== void 0;
  }
  set(key, value) {
    this.cache.delete(key);
    while (this.cache.size >= this.maxSize) {
      const oldest = this.cache.keys().next().value;
      if (oldest !== void 0) this.cache.delete(oldest);
      else break;
    }
    this.cache.set(key, { value, ts: Date.now() });
  }
  delete(key) {
    return this.cache.delete(key);
  }
  get size() {
    return this.cache.size;
  }
  /** Remove all expired entries (call periodically if desired) */
  prune() {
    const now = Date.now();
    let removed = 0;
    for (const [key, entry] of this.cache) {
      if (now - entry.ts > this.ttlMs) {
        this.cache.delete(key);
        removed++;
      }
    }
    return removed;
  }
}
const __vite_import_meta_env__$1 = {};
function getAmapKey() {
  if (typeof process !== "undefined" && process.env?.AMAP_WEB_KEY) {
    return process.env.AMAP_WEB_KEY;
  }
  const env2 = __vite_import_meta_env__$1;
  return env2.AMAP_WEB_KEY ?? "";
}
function isLiveRoutePlanningEnabled() {
  if (typeof process !== "undefined" && process.env?.ENABLE_LIVE_ROUTE_PLANNING) {
    return process.env.ENABLE_LIVE_ROUTE_PLANNING === "true";
  }
  const env2 = __vite_import_meta_env__$1;
  return env2.ENABLE_LIVE_ROUTE_PLANNING === "true";
}
async function nominatimGeocode(query) {
  const params = new URLSearchParams({
    q: query,
    format: "json",
    limit: "1"
  });
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { "User-Agent": "Routey/1.0" }
    });
    const data = await res.json();
    if (data.length > 0) {
      const lng = parseFloat(data[0].lon);
      const lat = parseFloat(data[0].lat);
      if (!isNaN(lng) && !isNaN(lat)) return { lng, lat };
    }
  } catch {
  }
  return null;
}
async function geocode(address, city) {
  const queries = [];
  queries.push(address);
  if (city) queries.push(`${address}, ${city}`);
  const parts = address.split(",").map((s) => s.trim());
  if (parts.length >= 3) {
    queries.push(`${parts[0]}, ${parts[parts.length - 1]}`);
    queries.push(`${parts[0]} ${parts[1]}`);
  }
  if (parts.length > 1) queries.push(parts[0]);
  const seen = /* @__PURE__ */ new Set();
  for (const q of queries) {
    if (seen.has(q)) continue;
    seen.add(q);
    const result = await nominatimGeocode(q);
    if (result) return result;
  }
  return null;
}
const geocodeCache = new TTLCache({
  maxSize: 500,
  ttlMs: 60 * 60 * 1e3
  // 1 hour
});
async function batchGeocode(spots) {
  const results = [];
  for (const spot of spots) {
    if (spot.lat != null && spot.lng != null) {
      results.push(spot);
      continue;
    }
    const cacheKey = `${spot.title}|${spot.city ?? ""}`;
    if (geocodeCache.has(cacheKey)) {
      const cached = geocodeCache.get(cacheKey);
      results.push(cached ? { ...spot, lat: cached.lat, lng: cached.lng } : spot);
      continue;
    }
    const geo = await geocode(spot.title, spot.city);
    geocodeCache.set(cacheKey, geo);
    if (geo) {
      results.push({ ...spot, lat: geo.lat, lng: geo.lng });
    } else {
      console.log(`[Geocode] Failed for: ${spot.title} (${spot.city})`);
      results.push(spot);
    }
    await new Promise((r) => setTimeout(r, 1100));
  }
  return results;
}
function parsePolyline(steps) {
  const points = [];
  for (const step of steps) {
    if (!step.polyline) continue;
    for (const pair of step.polyline.split(";")) {
      const [lng, lat] = pair.split(",").map(Number);
      if (!isNaN(lng) && !isNaN(lat)) points.push([lng, lat]);
    }
  }
  return points;
}
async function getDrivingRoute(origin, destination) {
  const amapKey = getAmapKey();
  if (!amapKey) return null;
  const params = new URLSearchParams({
    key: amapKey,
    origin: `${origin.lng},${origin.lat}`,
    destination: `${destination.lng},${destination.lat}`,
    output: "JSON",
    strategy: "10",
    extensions: "all"
    // get polyline in steps
  });
  try {
    const res = await fetch(`https://restapi.amap.com/v3/direction/driving?${params}`);
    const data = await res.json();
    if (data.status !== "1" || !data.route?.paths?.length) return null;
    const path = data.route.paths[0];
    return {
      distance: parseInt(path.distance, 10),
      duration: parseInt(path.duration, 10),
      mode: "driving",
      polyline: parsePolyline(path.steps)
    };
  } catch {
    return null;
  }
}
async function getWalkingRoute(origin, destination) {
  const amapKey = getAmapKey();
  if (!amapKey) return null;
  const params = new URLSearchParams({
    key: amapKey,
    origin: `${origin.lng},${origin.lat}`,
    destination: `${destination.lng},${destination.lat}`,
    output: "JSON"
  });
  try {
    const walkRes = await fetch(`https://restapi.amap.com/v3/direction/walking?${params}`);
    const data = await walkRes.json();
    if (data.status !== "1" || !data.route?.paths?.length) return null;
    const path = data.route.paths[0];
    return {
      distance: parseInt(path.distance, 10),
      duration: parseInt(path.duration, 10),
      mode: "walking",
      polyline: parsePolyline(path.steps)
    };
  } catch {
    return null;
  }
}
function isInChina(coord) {
  return coord.lng >= 73 && coord.lng <= 135 && coord.lat >= 18 && coord.lat <= 54;
}
async function getOsrmRoute(origin, destination, profile = "foot") {
  const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.code !== "Ok" || !data.routes?.length) return null;
    const route = data.routes[0];
    const distMeters = Math.round(route.distance);
    const polyline = route.geometry.coordinates.map((c) => [c[0], c[1]]);
    const isWalking = profile === "foot";
    const duration = isWalking ? Math.round(distMeters / 1.39) : Math.round(route.duration);
    return {
      distance: distMeters,
      duration,
      mode: isWalking ? "walking" : "driving",
      polyline
    };
  } catch (err) {
    console.log(`[OSRM] Route failed:`, err);
    return null;
  }
}
function estimateRoute(origin, destination) {
  const dlat = (origin.lat - destination.lat) * 111e3;
  const dlng = (origin.lng - destination.lng) * 111e3 * Math.cos(origin.lat * Math.PI / 180);
  const distMeters = Math.sqrt(dlat * dlat + dlng * dlng);
  const isWalking = distMeters < 2e3;
  const speedMps = isWalking ? 5e3 / 3600 : 3e4 / 3600;
  const durationSec = Math.round(distMeters / speedMps);
  return {
    distance: Math.round(distMeters * 1.3),
    duration: Math.round(durationSec * 1.3),
    mode: isWalking ? "walking" : "driving",
    polyline: [
      [origin.lng, origin.lat],
      [destination.lng, destination.lat]
    ]
  };
}
async function getSmartRoute(origin, destination) {
  if (!isLiveRoutePlanningEnabled()) return estimateRoute(origin, destination);
  const dlat = (origin.lat - destination.lat) * 111e3;
  const dlng = (origin.lng - destination.lng) * 111e3 * Math.cos(origin.lat * Math.PI / 180);
  const roughDist = Math.sqrt(dlat * dlat + dlng * dlng);
  const isWalking = roughDist < 3e3;
  if (isInChina(origin) && isInChina(destination)) {
    if (isWalking) {
      const walk = await getWalkingRoute(origin, destination);
      if (walk) return walk;
    }
    const drive = await getDrivingRoute(origin, destination);
    if (drive) return drive;
  }
  const osrm = await getOsrmRoute(origin, destination, isWalking ? "foot" : "car");
  if (osrm) return osrm;
  return estimateRoute(origin, destination);
}
async function getDayTravelInfo(spots) {
  const result = /* @__PURE__ */ new Map();
  const tasks = [];
  for (let i = 0; i < spots.length - 1; i++) {
    const a = spots[i];
    const b = spots[i + 1];
    if (a.lng == null || a.lat == null || b.lng == null || b.lat == null) continue;
    `${a.id}→${b.id}`;
    tasks.push({
      fromId: a.id,
      toId: b.id,
      promise: getSmartRoute({ lng: a.lng, lat: a.lat }, { lng: b.lng, lat: b.lat })
    });
  }
  const settled = await Promise.all(tasks.map((t) => t.promise));
  tasks.forEach((task, i) => {
    const info = settled[i];
    if (info) {
      result.set(`${task.fromId}→${task.toId}`, info);
    }
  });
  return result;
}
const JSON_FORMAT = `{
  "name": "行程名称，如'东京5日游'",
  "destination": "主要目的地城市名",
  "country": "国家",
  "totalDays": 3,
  "cover": "tokyo|japan|korea|thailand|france|map",
  "days": [
    {
      "label": "Day 1",
      "route": "区域概要，如'新宿·涩谷'",
      "spots": [
        {
          "time": "09:00",
          "title": "景点名称（使用当地常用名称）",
          "desc": "简短活动描述，如'游览 1.5h'",
          "category": "景点|美食|购物|住宿|休闲",
          "intro": "50字以内的景点介绍",
          "rating": 4.5,
          "price": "¥1000（如有门票或消费估价）",
          "tags": ["标签1", "标签2"],
          "lat": 35.6762,
          "lng": 139.6503,
          "address": "Shinjuku Gyoen, Shinjuku, Tokyo, Japan",
          "imageQuery": "英文关键词如 'Shinjuku Gyoen garden'"
        }
      ]
    }
  ]
}`;
const SHARED_RULES = `1. cover只能是以下之一：tokyo（日本东京）、japan（日本其他）、korea（韩国）、thailand（泰国）、france（法国/欧洲）、map（其他地区）
2. category只能是：景点、美食、购物、住宿、休闲
3. 每天安排5-8个地点；完整行程至少包含12个地点，并覆盖景点、餐厅/美食、酒店/住宿、购物、休闲体验
4. 时间从早到晚合理安排（09:00-21:00）
5. 同一天的地点应该在相近区域，避免大量交通往返
6. price用当地货币标注，如"₱500"、"¥980"、"฿200"、"免费"
7. 【最关键】lat和lng必须填写每个地点的真实GPS坐标（WGS84），精确到小数点后4位。坐标必须在目的地国家范围内！
8. address用英文，格式："地点名, 城市, 国家"
9. rating范围 3.0-5.0
10. intro要有信息量，告诉旅行者为什么值得去
11. imageQuery必须是英文，用地点官方英文名称`;
const PARSE_SYSTEM_PROMPT = `你是一个旅行规划助手。用户会发来旅行攻略内容（可能是链接内容、文本描述、截图描述等），请你解析并生成结构化的旅行行程。

请严格返回以下JSON格式（不要包含任何其他文字，只返回JSON）：
${JSON_FORMAT}

规则：
${SHARED_RULES}
12. 如果用户提供的内容不足以生成完整行程，请根据目的地补充推荐景点
13. destination和country必须准确填写。如果是多个城市，destination填主要城市`;
const QUIZ_SYSTEM_PROMPT = `你是旅行规划助手。根据用户的旅行偏好，推荐一个具体的目的地并生成完整行程。

请严格返回以下JSON格式（不要包含任何其他文字，只返回JSON）：
${JSON_FORMAT}

规则：
1. 根据用户的旅行偏好，选择一个最合适的具体目的地城市
${SHARED_RULES.split("\n").slice(0).join("\n")}
12. 行程要符合用户的预算和旅行风格偏好`;
const __vite_import_meta_env__ = {};
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
function getDeepseekKey() {
  if (typeof process !== "undefined" && process.env?.DEEPSEEK_API_KEY) {
    return process.env.DEEPSEEK_API_KEY;
  }
  const env2 = __vite_import_meta_env__;
  return env2.DEEPSEEK_API_KEY ?? "";
}
async function callDeepseek(messages) {
  const apiKey = getDeepseekKey();
  if (!apiKey) throw new Error("未配置 Deepseek API Key");
  const hasImage = messages.some((m) => Array.isArray(m.content));
  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature: 0.2,
      max_tokens: 4096,
      response_format: hasImage ? void 0 : { type: "json_object" }
    })
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Deepseek API error ${res.status}: ${errText}`);
  }
  const data = await res.json();
  console.log(`[AI] Tokens used: ${data.usage?.total_tokens ?? "?"}`);
  return data.choices[0]?.message?.content ?? "";
}
function extractImageBase64(content) {
  const match = content.match(/\[IMAGE_BASE64\]([\s\S]+?)\[\/IMAGE_BASE64\]/);
  if (!match) return { text: content, base64: null };
  const text = content.replace(/\[IMAGE_BASE64\][\s\S]+?\[\/IMAGE_BASE64\]/, "").trim();
  return { text, base64: match[1] };
}
function buildUserMessage(kind, content) {
  const prefix = {
    link: "以下是一篇旅行攻略的链接和内容，请解析生成行程：",
    image: "这是一张旅行攻略截图，请仔细识别图中的所有地点、行程安排、价格等信息，解析生成完整行程：",
    text: "以下是旅行攻略的文本内容，请解析生成行程：",
    video: "以下是旅行视频的链接和描述，请解析生成行程："
  }[kind];
  const { text, base64 } = extractImageBase64(content);
  if (base64) {
    const parts = [
      { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64}` } },
      { type: "text", text: `${prefix}${text ? `

用户补充说明：${text}` : ""}` }
    ];
    return parts;
  }
  return `${prefix}

${text || content}`;
}
function pickCover(parsed) {
  const valid = ["tokyo", "japan", "korea", "thailand", "france", "map"];
  const c = parsed.cover;
  return valid.includes(c) ? c : "map";
}
function normalizeCategory(cat) {
  const valid = ["景点", "美食", "购物", "住宿", "休闲"];
  return valid.includes(cat) ? cat : "景点";
}
async function parseAiResponse(raw, kind) {
  let jsonStr = raw.trim();
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) jsonStr = codeBlockMatch[1].trim();
  const parsed = JSON.parse(jsonStr);
  const tripId = `ai-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`;
  const allRaw = [];
  for (let dIdx = 0; dIdx < parsed.days.length; dIdx++) {
    const dayData = parsed.days[dIdx];
    dayData.spots.forEach((s, sIdx) => {
      allRaw.push({
        dIdx,
        sIdx,
        id: `${tripId}-d${dIdx + 1}-s${sIdx + 1}`,
        time: s.time || "09:00",
        title: s.title,
        desc: s.desc || "停留 1h",
        category: normalizeCategory(s.category),
        intro: s.intro,
        rating: s.rating,
        price: s.price,
        tags: s.tags,
        imageQuery: s.imageQuery,
        lat: s.lat,
        lng: s.lng,
        _address: s.address || s.title
      });
    });
  }
  const needGeocode = allRaw.filter((s) => s.lat == null || s.lng == null);
  if (needGeocode.length > 0) {
    console.log(`[AI] ${allRaw.length - needGeocode.length}/${allRaw.length} spots have AI coordinates, geocoding ${needGeocode.length} remaining...`);
    const geocoded = await batchGeocode(
      needGeocode.map((s) => ({
        title: s._address || s.title,
        city: parsed.destination || parsed.country
      }))
    );
    needGeocode.forEach((s, i) => {
      if (geocoded[i]?.lat != null) {
        s.lat = geocoded[i].lat;
        s.lng = geocoded[i].lng;
      }
    });
  } else {
    console.log(`[AI] All ${allRaw.length} spots have AI coordinates — skipping geocoding`);
  }
  const days = parsed.days.map((dayData, dIdx) => {
    const daySpots = allRaw.filter((s) => s.dIdx === dIdx);
    const spots = daySpots.map((s) => ({
      id: s.id,
      time: s.time,
      title: s.title,
      desc: s.desc,
      category: s.category,
      intro: s.intro,
      rating: s.rating,
      price: s.price,
      tags: s.tags,
      lat: s.lat,
      lng: s.lng
    }));
    return {
      id: `d${dIdx + 1}`,
      label: dayData.label || `Day ${dIdx + 1}`,
      route: dayData.route || spots.map((s) => s.title).slice(0, 2).join(" · "),
      spots
    };
  });
  return {
    id: tripId,
    name: parsed.name || "AI 生成行程",
    date: generateDateRange(parsed.totalDays || days.length),
    cover: pickCover(parsed),
    status: "草稿",
    favorite: false,
    days,
    source: { kind, title: sourceTitle$1(kind) }
  };
}
function sourceTitle$1(kind) {
  return { link: "链接导入", image: "截图导入", text: "文本导入", video: "视频导入" }[kind];
}
function generateDateRange(totalDays) {
  const start = /* @__PURE__ */ new Date();
  start.setDate(start.getDate() + 7);
  const end = new Date(start);
  end.setDate(end.getDate() + totalDays - 1);
  const fmt = (d) => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  return `${fmt(start)} — ${fmt(end)}`;
}
async function parseWithAI(kind, content) {
  const hasImage = content.includes("[IMAGE_BASE64]");
  const messages = [
    { role: "system", content: PARSE_SYSTEM_PROMPT },
    { role: "user", content: buildUserMessage(kind, content) }
  ];
  console.log(`[AI] Calling Deepseek for trip parsing (${hasImage ? "with image" : "text only"})...`);
  let raw;
  try {
    raw = await callDeepseek(messages);
  } catch (err) {
    if (hasImage) {
      console.log("[AI] Multimodal call failed, retrying with text only...");
      const { text } = extractImageBase64(content);
      const textContent = text || "请根据用户意图生成一个推荐旅行行程";
      const fallbackMessages = [
        { role: "system", content: PARSE_SYSTEM_PROMPT },
        { role: "user", content: `以下是旅行截图中提取的文字信息，请解析生成行程：

${textContent}` }
      ];
      raw = await callDeepseek(fallbackMessages);
    } else {
      throw err;
    }
  }
  console.log("[AI] Got response, parsing...");
  const trip = await parseAiResponse(raw, kind);
  console.log(`[AI] Trip "${trip.name}" created with ${trip.days.length} days`);
  return trip;
}
async function generateQuizTrip(answers) {
  const scopeText = answers.scope === "domestic" ? "国内旅行" : "国际旅行";
  const stylesText = answers.styles.join("、");
  const daysMap = {
    "1-3": "1-3天",
    "4-5": "4-5天",
    "6-7": "6-7天",
    "7+": "7天以上"
  };
  const daysText = daysMap[answers.days] ?? answers.days;
  const travelTypeMap = {
    solo: "独自旅行",
    couple: "情侣出游",
    family: "家庭亲子",
    friends: "朋友聚会"
  };
  const travelTypeText = travelTypeMap[answers.travelType] ?? answers.travelType;
  const budgetMap = {
    budget: "经济实惠",
    comfort: "舒适中档",
    luxury: "高端奢华"
  };
  const budgetText = budgetMap[answers.budget] ?? answers.budget;
  const seasonMap = {
    spring: "春季",
    summer: "夏季",
    autumn: "秋季",
    winter: "冬季",
    anytime: "不限"
  };
  const seasonText = seasonMap[answers.season] ?? answers.season;
  const userPrompt = `请根据以下旅行偏好推荐一个具体目的地并生成完整行程：

- 范围：${scopeText}
- 旅行风格：${stylesText}
- 天数：${daysText}
- 出行方式：${travelTypeText}
- 预算：${budgetText}
- 季节：${seasonText}`;
  const messages = [
    { role: "system", content: QUIZ_SYSTEM_PROMPT },
    { role: "user", content: userPrompt }
  ];
  console.log("[AI] Calling Deepseek for quiz trip generation...");
  const raw = await callDeepseek(messages);
  console.log("[AI] Got response, parsing...");
  const trip = await parseAiResponse(raw, "text");
  console.log(`[AI] Quiz trip "${trip.name}" created with ${trip.days.length} days`);
  return trip;
}
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
const getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
const ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
const errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
let overrideErrorMap = errorMap;
function getErrorMap() {
  return overrideErrorMap;
}
const makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
const INVALID = Object.freeze({
  status: "aborted"
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
const handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
const getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}
class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const stringType = ZodString.create;
const numberType = ZodNumber.create;
ZodNever.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
ZodIntersection.create;
ZodTuple.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
ZodPromise.create;
ZodOptional.create;
ZodNullable.create;
const sourceKinds = ["link", "image", "text", "video"];
const poiCategories = ["景点", "美食", "购物", "住宿", "休闲"];
const importPayloadSchema = objectType({
  kind: enumType(sourceKinds),
  content: stringType().min(2, "请提供有效的导入内容")
});
const tripPatchSchema = discriminatedUnionType("action", [
  objectType({ action: literalType("toggleFavorite") }),
  objectType({ action: literalType("regenerate") }),
  objectType({ action: literalType("optimizeDay"), dayId: stringType().min(1) }),
  objectType({
    action: literalType("addSpot"),
    dayId: stringType().min(1),
    title: stringType().optional(),
    desc: stringType().optional()
  }),
  objectType({
    action: literalType("deleteSpot"),
    dayId: stringType().min(1),
    spotId: stringType().min(1)
  }),
  objectType({
    action: literalType("updateSpot"),
    dayId: stringType().min(1),
    spot: objectType({
      id: stringType().min(1),
      time: stringType().optional(),
      title: stringType().optional(),
      desc: stringType().optional(),
      category: enumType(poiCategories).optional(),
      lat: numberType().optional(),
      lng: numberType().optional(),
      intro: stringType().optional(),
      rating: numberType().min(0).max(5).optional(),
      price: stringType().optional(),
      tags: arrayType(stringType()).optional()
    })
  })
]);
const travelInfoSchema = objectType({
  tripId: stringType().min(1),
  dayId: stringType().min(1)
});
const quizAnswersSchema = objectType({
  scope: enumType(["domestic", "international"]),
  styles: arrayType(stringType()).min(1),
  days: stringType().min(1),
  travelType: stringType().min(1),
  budget: stringType().min(1),
  season: stringType().min(1)
});
const exploreAddSchema = objectType({
  routeId: stringType().min(1)
});
const quizAiStatusSchema = objectType({
  ids: arrayType(stringType())
});
function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
const exploreRegionProfiles = [
  {
    key: "ukLondon",
    name: "英国",
    cover: "map",
    date: "2026.06.01 — 06.04",
    defaultDays: 4,
    aliases: ["伦敦", "英国", "london", "爱丁堡", "苏格兰"],
    days: [
      {
        label: "Day 1",
        route: "伦敦西城",
        spots: [
          { id: "", time: "09:00", title: "大本钟与威斯敏斯特", desc: "外观徒步 1.5h", lat: 51.5007, lng: -0.1246, category: "景点", intro: "议会大厦与泰晤士河经典天际线", rating: 4.8, tags: ["地标"] },
          { id: "", time: "11:00", title: "大英博物馆", desc: "参观 2.5h", lat: 51.5194, lng: -0.1269, category: "景点", intro: "罗塞塔石碑与全球文明珍藏", rating: 4.9, tags: ["博物馆"] },
          { id: "", time: "15:00", title: "考文特花园", desc: "逛街 1.5h", lat: 51.5129, lng: -0.1243, category: "购物", intro: "露天市集与街头表演", rating: 4.5, tags: ["街区"] }
        ]
      },
      {
        label: "Day 2",
        route: "伦敦东区 · 塔桥",
        spots: [
          { id: "", time: "09:30", title: "伦敦塔", desc: "参观 2h", lat: 51.5081, lng: -0.0759, category: "景点", intro: "王冠珠宝与千年要塞", rating: 4.7, price: "£33", tags: ["历史"] },
          { id: "", time: "13:00", title: "塔桥", desc: "步行 1h", lat: 51.5055, lng: -0.0754, category: "景点", intro: "维多利亚哥特式开启桥", rating: 4.6, tags: ["地标"] }
        ]
      },
      {
        label: "Day 3",
        route: "牛津",
        spots: [
          { id: "", time: "10:00", title: "牛津大学博德利图书馆", desc: "参观 2h", lat: 51.7541, lng: -1.2544, category: "景点", intro: "霍格沃茨图书馆取景地之一", rating: 4.7, tags: ["学术"] },
          { id: "", time: "13:00", title: "基督教堂学院", desc: "参观 1.5h", lat: 51.7503, lng: -1.2577, category: "景点", intro: "牛津最大学院与大礼堂", rating: 4.8, price: "£18", tags: ["校园"] }
        ]
      },
      {
        label: "Day 4",
        route: "苏格兰高地",
        spots: [
          { id: "", time: "09:00", title: "格伦科峡谷", desc: "观景公路 2h", lat: 56.6825, lng: -5.1028, category: "景点", intro: "壮丽火山谷地与《007》取景公路", rating: 4.9, tags: ["自然"] },
          { id: "", time: "14:00", title: "尼斯湖", desc: "湖畔 1h", lat: 57.3229, lng: -4.4244, category: "景点", intro: "神秘湖水与厄克哈特城堡遗址", rating: 4.4, tags: ["湖泊"] }
        ]
      }
    ]
  },
  {
    key: "itRome",
    name: "意大利",
    cover: "france",
    date: "2026.05.10 — 05.14",
    defaultDays: 5,
    aliases: ["罗马", "佛罗伦萨", "威尼斯", "italy", "米兰"],
    days: [
      {
        label: "Day 1",
        route: "罗马古城",
        spots: [
          { id: "", time: "09:00", title: "罗马斗兽场", desc: "参观 2h", lat: 41.8902, lng: 12.4922, category: "景点", intro: "帝国时代角斗场遗址", rating: 4.9, price: "€18", tags: ["世界遗产"] },
          { id: "", time: "12:00", title: "古罗马广场", desc: "遗址漫步 1.5h", lat: 41.8915, lng: 12.4865, category: "景点", intro: "共和与帝国政治中心废墟", rating: 4.7, tags: ["古迹"] },
          { id: "", time: "15:00", title: "特莱维喷泉", desc: "游览 45min", lat: 41.9009, lng: 12.4833, category: "景点", intro: "巴洛克许愿池夜景更佳", rating: 4.6, tags: ["地标"] }
        ]
      },
      {
        label: "Day 2",
        route: "梵蒂冈",
        spots: [
          { id: "", time: "08:30", title: "圣彼得大教堂", desc: "参观 2h", lat: 41.9022, lng: 12.4539, category: "景点", intro: "文艺复兴巨作穹顶与城市俯瞰", rating: 4.9, tags: ["宗教"] },
          { id: "", time: "12:00", title: "梵蒂冈博物馆", desc: "参观 3h", lat: 41.9065, lng: 12.4536, category: "景点", intro: "西斯廷天顶画与拉斐尔画室", rating: 4.9, price: "€20", tags: ["博物馆"] }
        ]
      },
      {
        label: "Day 3",
        route: "佛罗伦萨",
        spots: [
          { id: "", time: "10:00", title: "圣母百花大教堂", desc: "参观 2h", lat: 43.7731, lng: 11.256, category: "景点", intro: "布鲁内莱斯基穹顶与文艺复兴心脏", rating: 4.9, price: "€18", tags: ["建筑"] },
          { id: "", time: "14:00", title: "乌菲兹美术馆", desc: "参观 2.5h", lat: 43.7687, lng: 11.255, category: "景点", intro: "波提切利与文艺复兴绘画宝库", rating: 4.9, price: "€20", tags: ["美术馆"] }
        ]
      },
      {
        label: "Day 4",
        route: "威尼斯",
        spots: [
          { id: "", time: "09:00", title: "圣马可广场", desc: "游览 2h", lat: 45.4342, lng: 12.3388, category: "景点", intro: "钟楼、总督宫与咖啡历史", rating: 4.8, tags: ["地标"] },
          { id: "", time: "14:00", title: "贡多拉游运河", desc: "体验 1h", lat: 45.4376, lng: 12.3359, category: "景点", intro: "水城巷道与拱桥经典视角", rating: 4.5, tags: ["体验"] }
        ]
      },
      {
        label: "Day 5",
        route: "阿马尔菲海岸",
        spots: [
          { id: "", time: "10:00", title: "波西塔诺", desc: "海滨 2h", lat: 40.628, lng: 14.485, category: "景点", intro: "彩色悬崖小镇与地中海", rating: 4.8, tags: ["海岸"] },
          { id: "", time: "14:00", title: "阿马尔菲主教座堂", desc: "参观 1h", lat: 40.6333, lng: 14.6027, category: "景点", intro: "华丽马赛克正立面", rating: 4.6, tags: ["教堂"] }
        ]
      }
    ]
  },
  {
    key: "ausEast",
    name: "澳洲东岸",
    cover: "map",
    date: "2026.11.01 — 11.05",
    defaultDays: 5,
    aliases: ["悉尼", "墨尔本", "澳大利亚", "大洋路"],
    days: [
      {
        label: "Day 1",
        route: "悉尼港湾",
        spots: [
          { id: "", time: "09:00", title: "悉尼歌剧院", desc: "导览 1.5h", lat: -33.8568, lng: 151.2153, category: "景点", intro: "世界文化遗产贝壳屋顶", rating: 4.8, tags: ["地标"] },
          { id: "", time: "11:30", title: "悉尼海港大桥", desc: "步行 1h", lat: -33.8523, lng: 151.2108, category: "景点", intro: "钢拱大桥与环形码头景观", rating: 4.7, tags: ["观景"] }
        ]
      },
      {
        label: "Day 2",
        route: "邦迪 · 蓝山",
        spots: [
          { id: "", time: "09:00", title: "邦迪海滩", desc: "冲浪散步 2h", lat: -33.8915, lng: 151.2767, category: "景点", intro: "澳洲最著名城市海滩", rating: 4.7, tags: ["海滩"] },
          { id: "", time: "14:00", title: "蓝山三姐妹峰", desc: "观景 2h", lat: -33.715, lng: 150.311, category: "景点", intro: "桉树油雾营造的蓝雾山脉", rating: 4.8, tags: ["自然"] }
        ]
      },
      {
        label: "Day 3",
        route: "墨尔本",
        spots: [
          { id: "", time: "10:00", title: "弗林德斯街车站", desc: "街区 1h", lat: -37.8183, lng: 144.9671, category: "景点", intro: "墨尔本地标黄砂岩车站", rating: 4.5, tags: ["地标"] },
          { id: "", time: "12:00", title: "联邦广场", desc: "文化与咖啡 2h", lat: -37.8179, lng: 144.9691, category: "景点", intro: "NGV 与雅拉河畔公共空间", rating: 4.4, tags: ["艺术"] }
        ]
      },
      {
        label: "Day 4",
        route: "大洋路",
        spots: [
          { id: "", time: "09:00", title: "十二使徒岩", desc: "观景 1.5h", lat: -38.6499, lng: 143.1051, category: "景点", intro: "石灰岩海柱与南大洋日落", rating: 4.9, tags: ["海岸"] },
          { id: "", time: "13:00", title: "洛克阿德峡谷", desc: "步道 1h", lat: -38.62, lng: 143.08, category: "景点", intro: "壮观峡湾与沉船故事", rating: 4.7, tags: ["徒步"] }
        ]
      },
      {
        label: "Day 5",
        route: "凯恩斯 / 大堡礁",
        spots: [
          { id: "", time: "08:00", title: "大堡礁出海浮潜", desc: "一日游 6h", lat: -16.4833, lng: 145.4667, category: "景点", intro: "道格拉斯港出发珊瑚礁与热带鱼", rating: 4.9, tags: ["潜水"] }
        ]
      }
    ]
  },
  {
    key: "maMarrakech",
    name: "摩洛哥",
    cover: "map",
    date: "2026.04.01 — 04.04",
    defaultDays: 4,
    aliases: ["摩洛哥", "马拉喀什", "撒哈拉", "菲斯", "舍夫沙万", "卡萨布兰卡"],
    days: [
      {
        label: "Day 1",
        route: "马拉喀什",
        spots: [
          { id: "", time: "10:00", title: "杰马艾夫纳广场", desc: "市集 2h", lat: 31.6258, lng: -7.9891, category: "景点", intro: "世界遗产夜市与街头美食", rating: 4.6, tags: ["集市"] },
          { id: "", time: "15:00", title: "马若雷勒花园", desc: "散步 1.5h", lat: 31.6413, lng: -8.0025, category: "景点", intro: "伊夫·圣罗兰蓝墙仙人掌园", rating: 4.7, price: "¥70", tags: ["花园"] }
        ]
      },
      {
        label: "Day 2",
        route: "阿特拉斯山麓",
        spots: [
          { id: "", time: "09:00", title: "阿伊特·本·哈杜村", desc: "古城 2h", lat: 31.0471, lng: -7.1295, category: "景点", intro: "夯土城堡村落，《权游》取景地", rating: 4.8, tags: ["古迹"] }
        ]
      },
      {
        label: "Day 3",
        route: "菲斯",
        spots: [
          { id: "", time: "10:00", title: "菲斯古城麦地那", desc: "迷宫巷弄 3h", lat: 34.0617, lng: -4.9833, category: "景点", intro: "九千条巷道与传统皮革染坊", rating: 4.7, tags: ["老城"] }
        ]
      },
      {
        label: "Day 4",
        route: "蓝城 / 海岸",
        spots: [
          { id: "", time: "09:00", title: "舍夫沙万老城", desc: "拍照 2h", lat: 35.171, lng: -5.2696, category: "景点", intro: "山城蓝白小巷", rating: 4.8, tags: ["拍照"] },
          { id: "", time: "14:00", title: "哈桑二世清真寺", desc: "参观 1.5h", lat: 33.6085, lng: -7.6328, category: "景点", intro: "矗立大西洋上的现代清真寺", rating: 4.7, tags: ["建筑"] }
        ]
      }
    ]
  },
  {
    key: "esSpain",
    name: "西班牙",
    cover: "france",
    date: "2026.09.01 — 09.07",
    defaultDays: 7,
    aliases: ["巴塞罗那", "马德里", "西班牙", "安达卢西亚", "圣地亚哥"],
    days: [
      {
        label: "Day 1",
        route: "巴塞罗那",
        spots: [
          { id: "", time: "09:00", title: "圣家堂", desc: "参观 2.5h", lat: 41.4036, lng: 2.1744, category: "景点", intro: "高迪未竟杰作", rating: 4.9, price: "€26", tags: ["建筑"] },
          { id: "", time: "14:00", title: "古埃尔公园", desc: "游览 1.5h", lat: 41.4145, lng: 2.1527, category: "景点", intro: "马赛克蜥蜴与城景露台", rating: 4.6, tags: ["公园"] }
        ]
      },
      {
        label: "Day 2",
        route: "巴塞罗那海滨",
        spots: [
          { id: "", time: "10:00", title: "兰布拉大道 · 波盖利亚市场", desc: "美食 2h", lat: 41.3819, lng: 2.1717, category: "美食", intro: "彩色果蔬与 tapas", rating: 4.5, tags: ["市场"] },
          { id: "", time: "14:00", title: "巴塞罗那海滩", desc: "休息 2h", lat: 41.3851, lng: 2.1975, category: "景点", intro: "地中海城市沙滩", rating: 4.4, tags: ["海滩"] }
        ]
      },
      {
        label: "Day 3",
        route: "马德里",
        spots: [
          { id: "", time: "09:30", title: "马德里王宫", desc: "参观 2h", lat: 40.418, lng: -3.7142, category: "景点", intro: "波旁王朝宫殿与御花园", rating: 4.7, price: "€12", tags: ["宫殿"] },
          { id: "", time: "14:00", title: "普拉多博物馆", desc: "参观 2.5h", lat: 40.4138, lng: -3.6921, category: "景点", intro: "戈雅、委拉斯开兹核心馆藏", rating: 4.9, price: "€15", tags: ["博物馆"] }
        ]
      },
      {
        label: "Day 4",
        route: "塞维利亚",
        spots: [
          { id: "", time: "10:00", title: "塞维利亚王宫", desc: "参观 2h", lat: 37.3831, lng: -5.9904, category: "景点", intro: "穆德哈尔宫殿与权游多恩取景", rating: 4.8, tags: ["宫殿"] },
          { id: "", time: "14:00", title: "西班牙广场", desc: "游览 1h", lat: 37.3772, lng: -5.9869, category: "景点", intro: "半圆形陶瓦建筑的巨无霸广场", rating: 4.8, tags: ["广场"] }
        ]
      },
      {
        label: "Day 5",
        route: "格拉纳达",
        spots: [
          { id: "", time: "09:00", title: "阿尔罕布拉宫", desc: "参观 3h", lat: 37.1761, lng: -3.5881, category: "景点", intro: "纳斯瑞德宫与轩尼洛里菲花园", rating: 4.9, price: "€14", tags: ["世界遗产"] }
        ]
      },
      {
        label: "Day 6",
        route: "科尔多瓦 / 白色小镇",
        spots: [
          { id: "", time: "10:00", title: "科尔多瓦大清真寺", desc: "参观 2h", lat: 37.8789, lng: -4.7794, category: "景点", intro: "拱柱森林与天主教座堂共存", rating: 4.8, tags: ["古迹"] }
        ]
      },
      {
        label: "Day 7",
        route: "圣地亚哥",
        spots: [
          { id: "", time: "10:00", title: "圣地亚哥大教堂", desc: "参观 1.5h", lat: 42.8806, lng: -8.5447, category: "景点", intro: "朝圣之路终点与香薰炉摆动仪式", rating: 4.8, tags: ["教堂"] }
        ]
      }
    ]
  },
  {
    key: "deGermany",
    name: "德国",
    cover: "map",
    date: "2026.07.01 — 07.04",
    defaultDays: 4,
    aliases: ["柏林", "慕尼黑", "德国", "莱茵", "新天鹅堡"],
    days: [
      {
        label: "Day 1",
        route: "柏林",
        spots: [
          { id: "", time: "09:00", title: "勃兰登堡门", desc: "游览 1h", lat: 52.5163, lng: 13.3777, category: "景点", intro: "统一德国的象征性地标", rating: 4.7, tags: ["地标"] },
          { id: "", time: "11:00", title: "国会大厦穹顶", desc: "预约参观 1.5h", lat: 52.5186, lng: 13.3761, category: "景点", intro: "诺曼·福斯特玻璃穹顶俯瞰柏林", rating: 4.8, tags: ["建筑"] }
        ]
      },
      {
        label: "Day 2",
        route: "柏林博物 · 东边画廊",
        spots: [
          { id: "", time: "10:00", title: "博物馆岛", desc: "任选馆 3h", lat: 52.5169, lng: 13.4016, category: "景点", intro: "佩加蒙祭坛与古埃及馆", rating: 4.8, tags: ["博物馆"] },
          { id: "", time: "15:00", title: "东边画廊", desc: "漫步 1h", lat: 52.5055, lng: 13.4445, category: "景点", intro: "《兄弟之吻》柏林墙壁画", rating: 4.5, tags: ["历史"] }
        ]
      },
      {
        label: "Day 3",
        route: "慕尼黑",
        spots: [
          { id: "", time: "10:00", title: "玛丽恩广场与新市政厅", desc: "游览 1.5h", lat: 48.1372, lng: 11.5755, category: "景点", intro: "木偶钟表演与巴伐利亚心脏", rating: 4.6, tags: ["广场"] },
          { id: "", time: "14:00", title: "英国花园", desc: "散步 2h", lat: 48.1646, lng: 11.6055, category: "景点", intro: "城市公园内冲浪河与人面溪", rating: 4.7, tags: ["公园"] }
        ]
      },
      {
        label: "Day 4",
        route: "新天鹅堡",
        spots: [
          { id: "", time: "09:00", title: "新天鹅堡", desc: "参观 3h", lat: 47.5576, lng: 10.7498, category: "景点", intro: "巴伐利亚童话城堡与阿尔卑斯背景", rating: 4.8, price: "€15", tags: ["城堡"] }
        ]
      }
    ]
  },
  {
    key: "chSwiss",
    name: "瑞士",
    cover: "france",
    date: "2026.08.01 — 08.04",
    defaultDays: 4,
    aliases: ["瑞士", "苏黎世", "琉森", "少女峰", "因特拉肯"],
    days: [
      {
        label: "Day 1",
        route: "苏黎世",
        spots: [
          { id: "", time: "10:00", title: "苏黎世老城与林登霍夫", desc: "散步 2h", lat: 47.3713, lng: 8.5419, category: "景点", intro: "利马特河与双塔大教堂天际线", rating: 4.6, tags: ["老城"] }
        ]
      },
      {
        label: "Day 2",
        route: "卢塞恩",
        spots: [
          { id: "", time: "09:00", title: "卡佩尔廊桥", desc: "游览 1h", lat: 47.0516, lng: 8.3077, category: "景点", intro: "欧洲最古老木结构廊桥之一", rating: 4.7, tags: ["地标"] },
          { id: "", time: "12:00", title: "卢塞恩湖游船", desc: "2h", lat: 47.0503, lng: 8.3115, category: "景点", intro: "皮拉图斯山与湖水倒影", rating: 4.6, tags: ["湖泊"] }
        ]
      },
      {
        label: "Day 3",
        route: "少女峰地区",
        spots: [
          { id: "", time: "09:00", title: "劳特布龙嫩山谷", desc: "观景 2h", lat: 46.5934, lng: 7.9082, category: "景点", intro: "72条瀑布峭壁村落", rating: 4.9, tags: ["自然"] },
          { id: "", time: "13:00", title: "格林德瓦梦幻山坡", desc: "徒步 2h", lat: 46.6239, lng: 8.0367, category: "景点", intro: "艾格峰北壁下的木屋草坡", rating: 4.9, tags: ["徒步"] }
        ]
      },
      {
        label: "Day 4",
        route: "采尔马特",
        spots: [
          { id: "", time: "10:00", title: "戈尔内格拉特观景台", desc: "齿轨火车 3h", lat: 45.9835, lng: 7.7859, category: "景点", intro: "马特洪峰经典三角倒影", rating: 4.9, tags: ["雪山"] }
        ]
      }
    ]
  },
  {
    key: "sgCity",
    name: "新加坡",
    cover: "thailand",
    date: "2026.02.01 — 02.03",
    defaultDays: 3,
    aliases: ["新加坡", "singapore", "圣淘沙", "狮城"],
    days: [
      {
        label: "Day 1",
        route: "滨海湾",
        spots: [
          { id: "", time: "10:00", title: "滨海湾花园", desc: "游览 2h", lat: 1.2816, lng: 103.8636, category: "景点", intro: "超级树与冷室云雾林", rating: 4.8, tags: ["花园"] },
          { id: "", time: "15:00", title: "鱼尾狮公园", desc: "拍照 45min", lat: 1.2868, lng: 103.8545, category: "景点", intro: "新加坡国家象征喷泉", rating: 4.5, tags: ["地标"] }
        ]
      },
      {
        label: "Day 2",
        route: "多元文化区",
        spots: [
          { id: "", time: "09:00", title: "牛车水", desc: "美食逛街 2h", lat: 1.2839, lng: 103.844, category: "景点", intro: "百年店屋与海南鸡饭集散地", rating: 4.5, tags: ["美食"] },
          { id: "", time: "14:00", title: "小印度", desc: "游览 1.5h", lat: 1.3066, lng: 103.8517, category: "景点", intro: "维拉玛卡里曼庙与飘香咖喱", rating: 4.4, tags: ["文化"] }
        ]
      },
      {
        label: "Day 3",
        route: "圣淘沙",
        spots: [
          { id: "", time: "10:00", title: "环球影城新加坡", desc: "园区 5h", lat: 1.254, lng: 103.8239, category: "景点", intro: "东南亚唯一环球影城", rating: 4.7, tags: ["主题公园"] }
        ]
      }
    ]
  },
  {
    key: "myKl",
    name: "马来西亚",
    cover: "thailand",
    date: "2026.03.01 — 03.04",
    defaultDays: 4,
    aliases: ["吉隆坡", "马来西亚", "槟城", "沙巴", "兰卡威"],
    days: [
      {
        label: "Day 1",
        route: "吉隆坡",
        spots: [
          { id: "", time: "10:00", title: "双子塔", desc: "登塔 2h", lat: 3.1579, lng: 101.7118, category: "景点", intro: "452米钢结构双塔与空中桥", rating: 4.7, tags: ["地标"] },
          { id: "", time: "15:00", title: "独立广场", desc: "游览 1h", lat: 3.1489, lng: 101.694, category: "景点", intro: "殖民建筑与苏丹阿都沙末大厦", rating: 4.4, tags: ["历史"] }
        ]
      },
      {
        label: "Day 2",
        route: "黑风洞 · 云顶",
        spots: [
          { id: "", time: "09:00", title: "黑风洞阶梯", desc: "参观 2h", lat: 3.2385, lng: 101.6839, category: "景点", intro: "彩虹梯与石灰岩印度庙洞", rating: 4.6, tags: ["寺庙"] }
        ]
      },
      {
        label: "Day 3",
        route: "槟城乔治市",
        spots: [
          { id: "", time: "10:00", title: "乔治市壁画街", desc: "散步 2h", lat: 5.4141, lng: 100.3297, category: "景点", intro: "街头艺术与传统店屋", rating: 4.7, tags: ["街区"] }
        ]
      },
      {
        label: "Day 4",
        route: "沙巴亚庇",
        spots: [
          { id: "", time: "16:00", title: "丹绒亚路海滩日落", desc: "1.5h", lat: 5.9373, lng: 116.0476, category: "景点", intro: "全球前列的火烧云海滩", rating: 4.8, tags: ["日落"] }
        ]
      }
    ]
  },
  {
    key: "vnHanoi",
    name: "越南",
    cover: "thailand",
    date: "2026.01.10 — 01.12",
    defaultDays: 3,
    aliases: ["越南", "河内", "下龙湾", "会安", "胡志明"],
    days: [
      {
        label: "Day 1",
        route: "河内老城",
        spots: [
          { id: "", time: "09:00", title: "还剑湖 · 三十六行街", desc: "漫步 2h", lat: 21.0287, lng: 105.852, category: "景点", intro: "摩托与咖啡共存的千年商街", rating: 4.5, tags: ["老城"] },
          { id: "", time: "14:00", title: "胡志明纪念堂区域", desc: "参观 2h", lat: 21.0369, lng: 105.8347, category: "景点", intro: "巴亭广场与一柱寺", rating: 4.4, tags: ["历史"] }
        ]
      },
      {
        label: "Day 2",
        route: "下龙湾",
        spots: [
          { id: "", time: "08:00", title: "下龙湾一日游船", desc: "6h", lat: 20.9101, lng: 107.1839, category: "景点", intro: "千座石灰岩岛峰与溶洞", rating: 4.8, tags: ["游船"] }
        ]
      },
      {
        label: "Day 3",
        route: "会安 · 古城",
        spots: [
          { id: "", time: "10:00", title: "会安古镇", desc: "灯笼夜景 3h", lat: 15.8801, lng: 108.338, category: "景点", intro: "中日葡混血世界遗产老街", rating: 4.8, tags: ["古镇"] }
        ]
      }
    ]
  },
  {
    key: "idBali",
    name: "印度尼西亚",
    cover: "thailand",
    date: "2026.04.10 — 04.14",
    defaultDays: 5,
    aliases: ["巴厘岛", "印尼", "乌布", "日惹", "科莫多"],
    days: [
      {
        label: "Day 1",
        route: "乌布",
        spots: [
          { id: "", time: "09:00", title: "圣猴森林公园", desc: "漫步 2h", lat: -8.5193, lng: 115.2592, category: "景点", intro: "长尾猕猴与热带雨林", rating: 4.6, tags: ["自然"] },
          { id: "", time: "14:00", title: "乌布皇宫与市集", desc: "2h", lat: -8.5066, lng: 115.2625, category: "景点", intro: "巴厘传统舞蹈夜场起点", rating: 4.4, tags: ["文化"] }
        ]
      },
      {
        label: "Day 2",
        route: "梯田 · 圣泉寺",
        spots: [
          { id: "", time: "08:00", title: "德格拉朗梯田", desc: "观景 2h", lat: -8.4354, lng: 115.28, category: "景点", intro: "椰林与曲线稻田", rating: 4.7, tags: ["梯田"] },
          { id: "", time: "12:00", title: "圣泉寺", desc: "参观 1.5h", lat: -8.4152, lng: 115.3166, category: "景点", intro: "沐浴圣水的印度教寺庙", rating: 4.6, tags: ["寺庙"] }
        ]
      },
      {
        label: "Day 3",
        route: "水神庙 · 北部",
        spots: [
          { id: "", time: "10:00", title: "布拉坦湖水神庙", desc: "参观 1.5h", lat: -8.2752, lng: 115.1663, category: "景点", intro: "倒影在火山湖中的 iconic 门塔", rating: 4.8, tags: ["寺庙"] }
        ]
      },
      {
        label: "Day 4",
        route: "南部海岸",
        spots: [
          { id: "", time: "09:00", title: "乌鲁瓦图断崖神庙", desc: "游览 2h", lat: -8.8151, lng: 115.0884, category: "景点", intro: "印度洋绝壁与克差火舞", rating: 4.8, tags: ["海岸"] },
          { id: "", time: "15:00", title: "水明漾海滩", desc: "日落 2h", lat: -8.6844, lng: 115.1389, category: "景点", intro: "冲浪与精品店海滩区", rating: 4.6, tags: ["海滩"] }
        ]
      },
      {
        label: "Day 5",
        route: "日惹",
        spots: [
          { id: "", time: "06:00", title: "婆罗浮屠日出", desc: "参观 3h", lat: -7.6079, lng: 110.2038, category: "景点", intro: "世界最大佛教遗址之一", rating: 4.9, tags: ["世界遗产"] }
        ]
      }
    ]
  },
  {
    key: "caCanada",
    name: "加拿大",
    cover: "map",
    date: "2026.07.10 — 07.14",
    defaultDays: 5,
    aliases: ["加拿大", "温哥华", "班夫", "多伦多", "魁北克"],
    days: [
      {
        label: "Day 1",
        route: "温哥华",
        spots: [
          { id: "", time: "09:00", title: "史丹利公园", desc: "环岛骑行 3h", lat: 49.3043, lng: -123.1443, category: "景点", intro: "北美最大城市公园与海堤步道", rating: 4.8, tags: ["公园"] }
        ]
      },
      {
        label: "Day 2",
        route: "温哥华 · 吊桥",
        spots: [
          { id: "", time: "10:00", title: "卡皮拉诺吊桥公园", desc: "游览 3h", lat: 49.3429, lng: -123.1149, category: "景点", intro: "雨林树梢步道与峡谷悬桥", rating: 4.6, price: "CAD65", tags: ["自然"] }
        ]
      },
      {
        label: "Day 3",
        route: "班夫镇",
        spots: [
          { id: "", time: "09:00", title: "班夫小镇与弓河瀑布", desc: "游览 2h", lat: 51.1784, lng: -115.566, category: "景点", intro: "落基山脉门户与温泉", rating: 4.7, tags: ["小镇"] },
          { id: "", time: "14:00", title: "硫磺山缆车", desc: "观景 2h", lat: 51.1447, lng: -115.5583, category: "景点", intro: "360度班夫与加拿大落基", rating: 4.8, tags: ["观景"] }
        ]
      },
      {
        label: "Day 4",
        route: "露易丝湖",
        spots: [
          { id: "", time: "09:00", title: "露易丝湖环湖", desc: "徒步 3h", lat: 51.4254, lng: -116.1773, category: "景点", intro: "维多利亚冰川碧湖水色", rating: 4.9, tags: ["湖泊"] }
        ]
      },
      {
        label: "Day 5",
        route: "多伦多 · 尼亚加拉",
        spots: [
          { id: "", time: "10:00", title: "尼亚加拉大瀑布", desc: "游船 3h", lat: 43.0828, lng: -79.0742, category: "景点", intro: "美加边界雷鸣瀑布", rating: 4.9, tags: ["瀑布"] },
          { id: "", time: "16:00", title: "加拿大国家电视塔", desc: "观景 1h", lat: 43.6426, lng: -79.3871, category: "景点", intro: "多伦多天际线玻璃地板", rating: 4.6, tags: ["观景"] }
        ]
      }
    ]
  },
  {
    key: "nzSouth",
    name: "新西兰",
    cover: "map",
    date: "2026.12.01 — 12.07",
    defaultDays: 7,
    aliases: ["新西兰", "皇后镇", "南岛", "奥克兰", "米尔福德"],
    days: [
      {
        label: "Day 1",
        route: "奥克兰",
        spots: [
          { id: "", time: "10:00", title: "天空塔", desc: "观景 1.5h", lat: -36.8485, lng: 174.7633, category: "景点", intro: "北岛最大城与怀特玛塔港景", rating: 4.5, tags: ["地标"] }
        ]
      },
      {
        label: "Day 2",
        route: "罗托鲁瓦",
        spots: [
          { id: "", time: "09:00", title: "怀奥塔普地热公园", desc: "游览 2h", lat: -38.3093, lng: 176.33, category: "景点", intro: "香槟池与五彩地热奇观", rating: 4.7, tags: ["地热"] }
        ]
      },
      {
        label: "Day 3",
        route: "惠灵顿",
        spots: [
          { id: "", time: "11:00", title: "蒂帕帕国家博物馆", desc: "2.5h", lat: -41.2841, lng: 174.7787, category: "景点", intro: "新西兰故事互动展厅", rating: 4.8, tags: ["博物馆"] }
        ]
      },
      {
        label: "Day 4",
        route: "基督城 · 特卡波",
        spots: [
          { id: "", time: "15:00", title: "好牧羊人教堂", desc: "星空 2h", lat: -44.0035, lng: 170.48, category: "景点", intro: "特卡波湖与南阿尔卑斯金门框景", rating: 4.9, tags: ["星空"] }
        ]
      },
      {
        label: "Day 5",
        route: "皇后镇",
        spots: [
          { id: "", time: "09:00", title: "天际缆车", desc: "2h", lat: -45.0108, lng: 168.6478, category: "景点", intro: "俯瞰瓦卡蒂普湖与卓越山", rating: 4.8, tags: ["观景"] },
          { id: "", time: "14:00", title: "蒸汽船厄恩斯劳", desc: "湖区巡航 3h", lat: -45.04, lng: 168.65, category: "景点", intro: "百年燃煤船与高山牧场", rating: 4.6, tags: ["游船"] }
        ]
      },
      {
        label: "Day 6",
        route: "米尔福德峡湾",
        spots: [
          { id: "", time: "08:00", title: "米尔福德峡湾游船", desc: "一日 8h", lat: -44.6414, lng: 167.8974, category: "景点", intro: "峡湾瀑布与海狮", rating: 4.9, tags: ["峡湾"] }
        ]
      },
      {
        label: "Day 7",
        route: "玛塔玛塔",
        spots: [
          { id: "", time: "10:00", title: "霍比特人村", desc: "导览 2h", lat: -37.8721, lng: 175.6819, category: "景点", intro: "电影布景袋底洞与绿龙酒馆", rating: 4.8, tags: ["影视"] }
        ]
      }
    ]
  },
  {
    key: "egCairo",
    name: "埃及",
    cover: "map",
    date: "2026.10.01 — 10.04",
    defaultDays: 4,
    aliases: ["埃及", "开罗", "卢克索", "金字塔", "尼罗河"],
    days: [
      {
        label: "Day 1",
        route: "吉萨",
        spots: [
          { id: "", time: "08:00", title: "吉萨金字塔群", desc: "参观 3h", lat: 29.9792, lng: 31.1342, category: "景点", intro: "胡夫金字塔与狮身人面像", rating: 4.9, tags: ["世界遗产"] }
        ]
      },
      {
        label: "Day 2",
        route: "开罗博物馆",
        spots: [
          { id: "", time: "10:00", title: "埃及博物馆", desc: "参观 3h", lat: 30.0478, lng: 31.2336, category: "景点", intro: "图坦卡蒙黄金面具", rating: 4.8, tags: ["博物馆"] },
          { id: "", time: "15:00", title: "哈利利集市", desc: "逛街 2h", lat: 30.0474, lng: 31.2624, category: "购物", intro: "中世纪商队驿站与香料铺", rating: 4.5, tags: ["集市"] }
        ]
      },
      {
        label: "Day 3",
        route: "卢克索",
        spots: [
          { id: "", time: "06:00", title: "热气球帝王谷", desc: "日出 3h", lat: 25.7402, lng: 32.6014, category: "景点", intro: "尼罗河东岸俯瞰神庙与沙漠", rating: 4.9, tags: ["热气球"] },
          { id: "", time: "11:00", title: "卢克索神庙", desc: "参观 2h", lat: 25.6995, lng: 32.6391, category: "景点", intro: "拉美西斯巨像与方尖碑", rating: 4.7, tags: ["神庙"] }
        ]
      },
      {
        label: "Day 4",
        route: "尼罗河 · 阿斯旺",
        spots: [
          { id: "", time: "09:00", title: "菲莱神庙", desc: "乘船参观 2h", lat: 24.0253, lng: 32.8884, category: "景点", intro: "托勒密时期伊西斯神庙与搬迁史诗", rating: 4.8, tags: ["神庙"] }
        ]
      }
    ]
  },
  {
    key: "trTurkey",
    name: "土耳其",
    cover: "map",
    date: "2026.05.20 — 05.25",
    defaultDays: 6,
    aliases: ["土耳其", "伊斯坦布尔", "卡帕多西亚", "棉花堡"],
    days: [
      {
        label: "Day 1",
        route: "伊斯坦布尔旧城区",
        spots: [
          { id: "", time: "09:00", title: "圣索菲亚大教堂", desc: "参观 1.5h", lat: 41.0086, lng: 28.9802, category: "景点", intro: "拜占庭穹顶与奥斯曼书法共存", rating: 4.9, tags: ["世界遗产"] },
          { id: "", time: "11:30", title: "蓝色清真寺", desc: "参观 1h", lat: 41.0054, lng: 28.9768, category: "景点", intro: "六座宣礼塔与伊兹尼蓝瓷砖", rating: 4.8, tags: ["清真寺"] }
        ]
      },
      {
        label: "Day 2",
        route: "博斯普鲁斯",
        spots: [
          { id: "", time: "10:00", title: "大巴扎", desc: "购物 2h", lat: 41.0107, lng: 28.968, category: "购物", intro: "四千店铺穹顶集市", rating: 4.5, tags: ["集市"] },
          { id: "", time: "14:00", title: "多尔玛巴赫切宫", desc: "参观 2h", lat: 41.0392, lng: 29, category: "景点", intro: "海峡边巴洛克皇宫", rating: 4.7, tags: ["宫殿"] }
        ]
      },
      {
        label: "Day 3",
        route: "王子岛 / 新城区",
        spots: [
          { id: "", time: "10:00", title: "独立大街", desc: "逛街 2h", lat: 41.0351, lng: 28.9833, category: "购物", intro: "红色缆车与欧式拱廊", rating: 4.5, tags: ["街区"] }
        ]
      },
      {
        label: "Day 4",
        route: "卡帕多西亚",
        spots: [
          { id: "", time: "05:30", title: "格雷梅热气球", desc: "日出 3h", lat: 38.6431, lng: 34.8286, category: "景点", intro: "奇石烟囱与玫瑰谷日出", rating: 4.9, tags: ["热气球"] },
          { id: "", time: "11:00", title: "格雷梅露天博物馆", desc: "参观 2h", lat: 38.6388, lng: 34.834, category: "景点", intro: "岩凿教堂拜占庭湿壁画", rating: 4.7, tags: ["古迹"] }
        ]
      },
      {
        label: "Day 5",
        route: "棉花堡 · 希拉波利斯",
        spots: [
          { id: "", time: "09:00", title: "棉花堡钙华梯田", desc: "游览 3h", lat: 37.925, lng: 29.1209, category: "景点", intro: "温泉沉积白色梯田", rating: 4.7, tags: ["自然"] }
        ]
      },
      {
        label: "Day 6",
        route: "以弗所",
        spots: [
          { id: "", time: "09:00", title: "以弗所古城", desc: "参观 3h", lat: 37.9398, lng: 27.3412, category: "景点", intro: "塞尔苏斯图书馆与罗马大道", rating: 4.9, tags: ["古迹"] }
        ]
      }
    ]
  }
];
const unsplash$1 = (id) => `https://images.unsplash.com/${id}?w=600&h=300&q=80&auto=format&fit=crop`;
const extraExploreDB = {
  "日本": [
    { id: "ex-jp-101", title: "东京大阪7日双城深度游", days: 7, spots: 30, source: "小红书 @日本深度玩", likes: 14200, cover: unsplash$1("photo-1536098561742-ca998e48cbcc"), tags: ["都市", "美食", "购物"], profileKey: "tokyo" },
    { id: "ex-jp-105", title: "日本10日南北纵贯全景游", days: 10, spots: 42, source: "穷游 @日本全景", likes: 11200, cover: unsplash$1("photo-1549880338-65ddcdfd017b"), tags: ["经典", "深度", "文化"], profileKey: "tokyo" },
    { id: "ex-jp-102", title: "关西6日文化巡礼", days: 6, spots: 28, source: "马蜂窝 @关西达人", likes: 9800, cover: unsplash$1("photo-1545569341-9eb8b30979d9"), tags: ["寺庙", "古迹", "美食"], profileKey: "kyoto" },
    { id: "ex-jp-103", title: "北海道8日自驾环岛", days: 8, spots: 34, source: "知乎 @北海道自驾", likes: 7600, cover: unsplash$1("photo-1551641506-ee5bf4cb45f1"), tags: ["自驾", "自然", "温泉"], profileKey: "tokyo" },
    { id: "ex-jp-108", title: "东北地区9日秋叶温泉", days: 9, spots: 36, source: "去哪儿 @东北红叶", likes: 5200, cover: unsplash$1("photo-1478436127897-769e1b3f0f36"), tags: ["红叶", "温泉", "自然"], profileKey: "tokyo" }
  ],
  "韩国": [
    { id: "ex-kr-102", title: "首尔5日潮流美食全攻略", days: 5, spots: 22, source: "携程 @首尔全攻略", likes: 10200, cover: unsplash$1("photo-1546874177-9e664107314e"), tags: ["购物", "美食", "时尚"], profileKey: "seoul" },
    { id: "ex-kr-101", title: "韩国7日全景深度游", days: 7, spots: 30, source: "小红书 @韩国深度", likes: 8900, cover: unsplash$1("photo-1538485399081-7191377e8241"), tags: ["都市", "文化", "美食"], profileKey: "seoul" },
    { id: "ex-kr-103", title: "济州岛6日深度环岛自驾", days: 6, spots: 26, source: "马蜂窝 @济州自驾", likes: 7100, cover: unsplash$1("photo-1551524559-8af4e6624178"), tags: ["自驾", "海岛", "自然"], profileKey: "seoul" },
    { id: "ex-kr-104", title: "首尔釜山8日铁路之旅", days: 8, spots: 34, source: "知乎 @韩国铁路游", likes: 5400, cover: unsplash$1("photo-1570521462033-3015e76e7432"), tags: ["铁路", "都市", "海鲜"], profileKey: "seoul" },
    { id: "ex-kr-105", title: "韩国9日文化遗产巡礼", days: 9, spots: 36, source: "穷游 @韩国文化", likes: 4200, cover: unsplash$1("photo-1682687982501-1e58ab814714"), tags: ["世界遗产", "古迹", "寺庙"], profileKey: "seoul" }
  ],
  "泰国": [
    { id: "ex-th-101", title: "泰国8日南北全景游", days: 8, spots: 34, source: "小红书 @泰国全景", likes: 9200, cover: unsplash$1("photo-1520250497591-112f2f40a3f4"), tags: ["寺庙", "海岛", "美食"], profileKey: "bangkok" },
    { id: "ex-th-103", title: "泰南7日海岛跳岛游", days: 7, spots: 30, source: "知乎 @泰国海岛", likes: 8400, cover: unsplash$1("photo-1519451241324-20b4ea2c4220"), tags: ["海岛", "潜水", "海滩"], profileKey: "bangkok" },
    { id: "ex-th-102", title: "清迈清莱6日深度慢游", days: 6, spots: 26, source: "马蜂窝 @泰北深度", likes: 7800, cover: unsplash$1("photo-1569949381669-ecf31ae8e613"), tags: ["寺庙", "咖啡", "自然"], profileKey: "bangkok" },
    { id: "ex-th-105", title: "泰国10日蜜月浪漫之旅", days: 10, spots: 42, source: "携程 @泰国蜜月", likes: 5600, cover: unsplash$1("photo-1537956965359-7573183d1f57"), tags: ["蜜月", "海岛", "SPA"], profileKey: "bangkok" }
  ],
  "法国": [
    { id: "ex-fr-101", title: "法国8日全景深度游", days: 8, spots: 34, source: "小红书 @法国全景", likes: 11200, cover: unsplash$1("photo-1431274172761-fca41d930114"), tags: ["巴黎", "城堡", "红酒"], profileKey: "paris" },
    { id: "ex-fr-102", title: "巴黎6日深度艺术之旅", days: 6, spots: 28, source: "携程 @巴黎艺术", likes: 9400, cover: unsplash$1("photo-1550340499-a6c60fc8287c"), tags: ["博物馆", "艺术", "建筑"], profileKey: "paris" },
    { id: "ex-fr-103", title: "法国南部7日自驾普罗旺斯蔚蓝海岸", days: 7, spots: 30, source: "马蜂窝 @南法自驾", likes: 7800, cover: unsplash$1("photo-1522093007474-d86e9bf7ba6f"), tags: ["自驾", "薰衣草", "海岸"], profileKey: "paris" },
    { id: "ex-fr-104", title: "卢瓦尔河谷城堡5日", days: 5, spots: 22, source: "知乎 @法国城堡", likes: 5600, cover: unsplash$1("photo-1549144511-f099e773c147"), tags: ["城堡", "田园", "红酒"], profileKey: "paris" },
    { id: "ex-fr-105", title: "法国10日美食美酒环线", days: 10, spots: 42, source: "穷游 @法国美食", likes: 6800, cover: unsplash$1("photo-1500039436846-25ae2f11882e"), tags: ["美食", "红酒", "奶酪"], profileKey: "paris" }
  ],
  "美国": [
    { id: "ex-us-101", title: "美西8日国家公园自驾", days: 8, spots: 34, source: "小红书 @美西自驾", likes: 9600, cover: unsplash$1("photo-1682695797873-aa4cb6edd613"), tags: ["国家公园", "自驾", "自然"], profileKey: "newyork" },
    { id: "ex-us-102", title: "纽约5日深度都市探索", days: 5, spots: 22, source: "携程 @纽约深度", likes: 8200, cover: unsplash$1("photo-1534430480872-3498386e7856"), tags: ["都市", "博物馆", "美食"], profileKey: "newyork" },
    { id: "ex-us-103", title: "美东6日波士顿华盛顿纽约", days: 6, spots: 26, source: "马蜂窝 @美东环线", likes: 7400, cover: unsplash$1("photo-1501594907352-04cda38ebc29"), tags: ["都市", "历史", "博物馆"], profileKey: "newyork" },
    { id: "ex-us-105", title: "美国10日66号公路自驾", days: 10, spots: 42, source: "穷游 @66号公路", likes: 6200, cover: unsplash$1("photo-1444723121867-7a241cacace9"), tags: ["自驾", "公路", "沙漠"], profileKey: "newyork" },
    { id: "ex-us-104", title: "阿拉斯加7日极地探险", days: 7, spots: 30, source: "知乎 @阿拉斯加探险", likes: 5800, cover: unsplash$1("photo-1518391846015-55a9cc003b25"), tags: ["冰川", "极光", "野生动物"], profileKey: "newyork" }
  ],
  "英国": [
    { id: "ex-uk-101", title: "英国7日经典环线", days: 7, spots: 30, source: "小红书 @英国环线", likes: 8200, cover: unsplash$1("photo-1460472178825-e5240623afd5"), tags: ["城堡", "博物馆", "田园"], profileKey: "london" },
    { id: "ex-uk-103", title: "伦敦5日博物馆艺术深度", days: 5, spots: 22, source: "知乎 @伦敦艺术", likes: 7100, cover: unsplash$1("photo-1507003211169-0a1dd7228f2d"), tags: ["博物馆", "艺术", "建筑"], profileKey: "london" },
    { id: "ex-uk-102", title: "苏格兰6日高地深度自驾", days: 6, spots: 26, source: "马蜂窝 @苏格兰自驾", likes: 6400, cover: unsplash$1("photo-1506377585622-bedcbb027afc"), tags: ["高地", "威士忌", "自驾"], profileKey: "london" },
    { id: "ex-uk-104", title: "英国9日全境深度游", days: 9, spots: 36, source: "携程 @英国全境", likes: 5800, cover: unsplash$1("photo-1528795259021-d8c86e14354c"), tags: ["城堡", "自然", "历史"], profileKey: "london" }
  ],
  "意大利": [
    { id: "ex-it-101", title: "意大利8日经典三城游", days: 8, spots: 34, source: "小红书 @意大利经典", likes: 10500, cover: unsplash$1("photo-1529260830199-42c24126f198"), tags: ["文艺复兴", "美食", "古迹"], profileKey: "rome" },
    { id: "ex-it-104", title: "意大利10日全境美食之旅", days: 10, spots: 42, source: "穷游 @意大利美食", likes: 8100, cover: unsplash$1("photo-1498307833015-e7b400441eb8"), tags: ["美食", "红酒", "文化"], profileKey: "rome" },
    { id: "ex-it-102", title: "托斯卡纳6日田园自驾", days: 6, spots: 26, source: "马蜂窝 @托斯卡纳", likes: 7200, cover: unsplash$1("photo-1516483638261-f4dbaf036963"), tags: ["田园", "酒庄", "自驾"], profileKey: "rome" },
    { id: "ex-it-103", title: "南意大利7日阿马尔菲西西里", days: 7, spots: 30, source: "知乎 @南意深度", likes: 6800, cover: unsplash$1("photo-1533929736458-ca588d08c8be"), tags: ["海岸", "古迹", "美食"], profileKey: "rome" },
    { id: "ex-it-105", title: "五渔村cinque terre 5日", days: 5, spots: 22, source: "小红书 @五渔村控", likes: 5900, cover: unsplash$1("photo-1523531294919-4bcd7c65e216"), tags: ["海岸", "徒步", "彩色小镇"], profileKey: "rome" }
  ],
  "西班牙": [
    { id: "ex-es-102", title: "巴塞罗那5日深度高迪建筑游", days: 5, spots: 22, source: "携程 @巴塞罗那", likes: 9200, cover: unsplash$1("photo-1433086966358-54859d0ed716"), tags: ["高迪", "建筑", "艺术"], profileKey: "barcelona" },
    { id: "ex-es-101", title: "西班牙8日南北纵贯", days: 8, spots: 34, source: "小红书 @西班牙全景", likes: 7600, cover: unsplash$1("photo-1543783207-ec64e4d95325"), tags: ["建筑", "美食", "弗拉门戈"], profileKey: "barcelona" },
    { id: "ex-es-103", title: "安达卢西亚7日白色小镇自驾", days: 7, spots: 30, source: "马蜂窝 @安达卢西亚", likes: 6100, cover: unsplash$1("photo-1509840841025-9088ba78a826"), tags: ["白色小镇", "自驾", "弗拉门戈"], profileKey: "barcelona" },
    { id: "ex-es-104", title: "西班牙6日美食葡萄酒之旅", days: 6, spots: 26, source: "知乎 @西班牙美食", likes: 5400, cover: unsplash$1("photo-1515443961218-a51367888e4b"), tags: ["美食", "红酒", "海鲜"], profileKey: "barcelona" }
  ],
  "德国": [
    { id: "ex-de-104", title: "德国5日圣诞市场巡礼", days: 5, spots: 22, source: "小红书 @德国圣诞", likes: 8400, cover: unsplash$1("photo-1545048702-79362596cdc9"), tags: ["圣诞", "市场", "冬季"], profileKey: "paris" },
    { id: "ex-de-103", title: "德国8日啤酒节文化之旅", days: 8, spots: 34, source: "马蜂窝 @德国啤酒节", likes: 7200, cover: unsplash$1("photo-1499346030926-9a72daac6c63"), tags: ["啤酒", "节庆", "文化"], profileKey: "paris" },
    { id: "ex-de-101", title: "德国7日浪漫之路自驾", days: 7, spots: 30, source: "小红书 @德国自驾", likes: 6800, cover: unsplash$1("photo-1500530855697-b586d89ba3ee"), tags: ["城堡", "自驾", "小镇"], profileKey: "paris" },
    { id: "ex-de-102", title: "柏林慕尼黑6日双城记", days: 6, spots: 26, source: "携程 @德国双城", likes: 5600, cover: unsplash$1("photo-1467269204594-9661b134dd2b"), tags: ["都市", "啤酒", "博物馆"], profileKey: "paris" }
  ],
  "瑞士": [
    { id: "ex-ch-101", title: "瑞士7日火车全景之旅", days: 7, spots: 30, source: "小红书 @瑞士火车", likes: 10200, cover: unsplash$1("photo-1491555103944-7c647fd857e6"), tags: ["火车", "雪山", "湖泊"], profileKey: "paris" },
    { id: "ex-ch-104", title: "瑞士8日全景深度游", days: 8, spots: 34, source: "携程 @瑞士全景", likes: 8800, cover: unsplash$1("photo-1515488764276-beab7607c1e6"), tags: ["雪山", "湖泊", "火车"], profileKey: "paris" },
    { id: "ex-ch-102", title: "瑞士5日徒步天堂", days: 5, spots: 22, source: "马蜂窝 @瑞士徒步", likes: 7600, cover: unsplash$1("photo-1482938289607-e9573fc25ebb"), tags: ["徒步", "高山", "自然"], profileKey: "paris" },
    { id: "ex-ch-103", title: "瑞士6日滑雪温泉之旅", days: 6, spots: 26, source: "知乎 @瑞士滑雪", likes: 6400, cover: unsplash$1("photo-1517760444937-f6397edcbbcd"), tags: ["滑雪", "温泉", "雪山"], profileKey: "paris" }
  ],
  "冰岛": [
    { id: "ex-is-101", title: "冰岛9日深度环岛自驾", days: 9, spots: 36, source: "小红书 @冰岛深度", likes: 10800, cover: unsplash$1("photo-1488085061387-422e29b40080"), tags: ["冰川", "极光", "火山"], profileKey: "paris" },
    { id: "ex-is-103", title: "冰岛6日冬季极光之旅", days: 6, spots: 26, source: "知乎 @冰岛极光", likes: 8600, cover: unsplash$1("photo-1531366936337-7c912a4589a7"), tags: ["极光", "冰洞", "温泉"], profileKey: "paris" },
    { id: "ex-is-102", title: "冰岛5日南岸精华游", days: 5, spots: 22, source: "马蜂窝 @冰岛南岸", likes: 7400, cover: unsplash$1("photo-1476900966873-ab290e38e3f7"), tags: ["瀑布", "冰川", "黑沙滩"], profileKey: "paris" }
  ],
  "新加坡": [
    { id: "ex-sg-101", title: "新加坡5日深度全景游", days: 5, spots: 22, source: "小红书 @新加坡深度", likes: 7800, cover: unsplash$1("photo-1496568816309-51d7c20e3b21"), tags: ["都市", "美食", "花园"], profileKey: "singapore" },
    { id: "ex-sg-102", title: "新加坡6日亲子乐园全攻略", days: 6, spots: 28, source: "携程 @新加坡亲子", likes: 6400, cover: unsplash$1("photo-1565538810643-b5bdb714032a"), tags: ["亲子", "动物园", "水族馆"], profileKey: "singapore" }
  ],
  "马来西亚": [
    { id: "ex-my-102", title: "沙巴仙本那6日潜水游", days: 6, spots: 26, source: "马蜂窝 @仙本那潜水", likes: 8100, cover: unsplash$1("photo-1559592413-7cec4d0cae2b"), tags: ["潜水", "海岛", "海鲜"], profileKey: "bangkok" },
    { id: "ex-my-101", title: "马来西亚7日多元文化游", days: 7, spots: 30, source: "小红书 @大马全景", likes: 6200, cover: unsplash$1("photo-1473116763249-2faaef81ccda"), tags: ["多元文化", "美食", "海岛"], profileKey: "bangkok" },
    { id: "ex-my-103", title: "槟城怡保5日美食之旅", days: 5, spots: 22, source: "知乎 @大马美食", likes: 5400, cover: unsplash$1("photo-1504674900247-0877df9cc836"), tags: ["美食", "街头美食", "古迹"], profileKey: "bangkok" }
  ],
  "越南": [
    { id: "ex-vn-101", title: "越南8日南北纵贯深度游", days: 8, spots: 34, source: "小红书 @越南全景", likes: 8600, cover: unsplash$1("photo-1512100356356-de1b84283e18"), tags: ["文化", "美食", "自然"], profileKey: "bangkok" },
    { id: "ex-vn-104", title: "越南美食7日全境吃遍", days: 7, spots: 30, source: "小红书 @越南美食控", likes: 7200, cover: unsplash$1("photo-1555396273-367ea4eb4db5"), tags: ["美食", "街头美食", "咖啡"], profileKey: "bangkok" },
    { id: "ex-vn-103", title: "越南中部5日海滩古镇", days: 5, spots: 22, source: "知乎 @越南中部", likes: 6400, cover: unsplash$1("photo-1551918120-9739cb430c6d"), tags: ["海滩", "古镇", "美食"], profileKey: "bangkok" }
  ],
  "印度尼西亚": [
    { id: "ex-id-101", title: "巴厘岛7日深度文化海岛", days: 7, spots: 30, source: "小红书 @巴厘深度", likes: 8800, cover: unsplash$1("photo-1573790387438-4da905039392"), tags: ["寺庙", "海滩", "梯田"], profileKey: "bangkok" },
    { id: "ex-id-103", title: "印尼10日多岛深度游", days: 10, spots: 42, source: "穷游 @印尼全景", likes: 6200, cover: unsplash$1("photo-1518548419970-58e3b4079ab2"), tags: ["海岛", "潜水", "文化"], profileKey: "bangkok" },
    { id: "ex-id-102", title: "爪哇岛6日火山文化之旅", days: 6, spots: 26, source: "马蜂窝 @爪哇探险", likes: 5400, cover: unsplash$1("photo-1588668214407-6ea9a6d8c272"), tags: ["火山", "古迹", "文化"], profileKey: "bangkok" }
  ],
  "菲律宾": [
    { id: "ex-ph-101", title: "菲律宾8日跳岛全攻略", days: 8, spots: 34, source: "小红书 @菲律宾跳岛", likes: 7500, cover: unsplash$1("photo-1505228395891-9a51e7e86bf6"), tags: ["跳岛", "海滩", "潜水"], profileKey: "bangkok" },
    { id: "ex-ph-102", title: "巴拉望科隆7日秘境探索", days: 7, spots: 30, source: "马蜂窝 @巴拉望秘境", likes: 6300, cover: unsplash$1("photo-1540202403-b7abd6747a18"), tags: ["泻湖", "潜水", "海岛"], profileKey: "bangkok" },
    { id: "ex-ph-103", title: "宿务薄荷5日亲子游", days: 5, spots: 22, source: "携程 @菲律宾亲子", likes: 5100, cover: unsplash$1("photo-1519046904884-53103b34b206"), tags: ["鲸鲨", "亲子", "海滩"], profileKey: "bangkok" }
  ],
  "柬埔寨": [
    { id: "ex-kh-101", title: "柬埔寨5日吴哥深度游", days: 5, spots: 22, source: "小红书 @吴哥深度", likes: 7200, cover: unsplash$1("photo-1569242840510-9fe6f0112cee"), tags: ["吴哥窟", "古迹", "世界遗产"], profileKey: "bangkok" },
    { id: "ex-kh-102", title: "柬埔寨7日全境探索", days: 7, spots: 30, source: "马蜂窝 @柬埔寨全景", likes: 4800, cover: unsplash$1("photo-1540541338287-41700207dee6"), tags: ["古迹", "海滩", "文化"], profileKey: "bangkok" },
    { id: "ex-kh-103", title: "暹粒6日深度摄影之旅", days: 6, spots: 26, source: "知乎 @吴哥摄影", likes: 3900, cover: unsplash$1("photo-1558431382-27e303142255"), tags: ["摄影", "古迹", "日出"], profileKey: "bangkok" }
  ],
  "斯里兰卡": [
    { id: "ex-lk-101", title: "斯里兰卡9日深度环岛", days: 9, spots: 36, source: "小红书 @锡兰深度", likes: 6400, cover: unsplash$1("photo-1546587348-d12660c30c50"), tags: ["茶园", "海滩", "古迹"], profileKey: "bangkok" },
    { id: "ex-lk-102", title: "锡兰5日火车茶园之旅", days: 5, spots: 22, source: "马蜂窝 @锡兰火车", likes: 5200, cover: unsplash$1("photo-1578985545062-69928b1d9587"), tags: ["火车", "茶园", "自然"], profileKey: "bangkok" },
    { id: "ex-lk-103", title: "斯里兰卡6日野生动物探险", days: 6, spots: 26, source: "穷游 @锡兰野生动物", likes: 3800, cover: unsplash$1("photo-1596394516093-501ba68a0ba6"), tags: ["野生动物", "国家公园", "自然"], profileKey: "bangkok" }
  ],
  "加拿大": [
    { id: "ex-ca-101", title: "加拿大西部7日落基山脉深度游", days: 7, spots: 30, source: "小红书 @加西深度", likes: 8400, cover: unsplash$1("photo-1470252649378-9c29740c9fa8"), tags: ["雪山", "湖泊", "国家公园"], profileKey: "tokyo" },
    { id: "ex-ca-102", title: "加拿大东部6日枫叶之旅", days: 6, spots: 26, source: "马蜂窝 @加拿大枫叶", likes: 7200, cover: unsplash$1("photo-1519832979-6fa011b87667"), tags: ["枫叶", "古城", "瀑布"], profileKey: "tokyo" },
    { id: "ex-ca-103", title: "加拿大8日横跨东西全景", days: 8, spots: 34, source: "携程 @加拿大全景", likes: 5600, cover: unsplash$1("photo-1426604966848-d7adac402bff"), tags: ["自然", "都市", "自驾"], profileKey: "tokyo" }
  ],
  "墨西哥": [
    { id: "ex-mx-104", title: "坎昆5日加勒比海深度度假", days: 5, spots: 22, source: "携程 @坎昆深度", likes: 7200, cover: unsplash$1("photo-1510097467424-192d713fd8b2"), tags: ["海滩", "潜水", "度假"], profileKey: "tokyo" },
    { id: "ex-mx-101", title: "墨西哥7日尤卡坦半岛深度游", days: 7, spots: 30, source: "小红书 @墨西哥深度", likes: 6800, cover: unsplash$1("photo-1547995886-6dc09384c6e6"), tags: ["金字塔", "海滩", "古迹"], profileKey: "tokyo" },
    { id: "ex-mx-102", title: "墨西哥城瓦哈卡6日文化美食", days: 6, spots: 26, source: "马蜂窝 @墨西哥美食", likes: 5400, cover: unsplash$1("photo-1518105779142-d975f22f1b0a"), tags: ["美食", "文化", "壁画"], profileKey: "tokyo" }
  ],
  "澳洲": [
    { id: "ex-au-101", title: "澳大利亚10日东海岸自驾", days: 10, spots: 42, source: "小红书 @澳洲自驾", likes: 8600, cover: unsplash$1("photo-1529108190281-9a4f620bc2d8"), tags: ["自驾", "海滩", "自然"], profileKey: "tokyo" },
    { id: "ex-au-102", title: "澳洲7日大堡礁雨林深度", days: 7, spots: 30, source: "马蜂窝 @澳洲大堡礁", likes: 7400, cover: unsplash$1("photo-1505765050516-f72dcac9c60e"), tags: ["潜水", "雨林", "海洋"], profileKey: "tokyo" },
    { id: "ex-au-103", title: "墨尔本大洋路5日", days: 5, spots: 22, source: "携程 @墨尔本深度", likes: 6200, cover: unsplash$1("photo-1512757776214-26d36777b513"), tags: ["自驾", "海岸", "咖啡"], profileKey: "tokyo" }
  ],
  "新西兰": [
    { id: "ex-nz-101", title: "新西兰10日南北岛全景自驾", days: 10, spots: 42, source: "小红书 @新西兰全景", likes: 9600, cover: unsplash$1("photo-1455763916899-e8b50eca9967"), tags: ["自驾", "自然", "极限运动"], profileKey: "tokyo" },
    { id: "ex-nz-103", title: "新西兰8日户外冒险之旅", days: 8, spots: 34, source: "知乎 @新西兰冒险", likes: 6800, cover: unsplash$1("photo-1494783367193-149034c05e8f"), tags: ["蹦极", "跳伞", "徒步"], profileKey: "tokyo" },
    { id: "ex-nz-102", title: "南岛5日冰川峡湾之旅", days: 5, spots: 22, source: "马蜂窝 @南岛精华", likes: 7200, cover: unsplash$1("photo-1504598318550-17eba1008a68"), tags: ["冰川", "峡湾", "徒步"], profileKey: "tokyo" }
  ],
  "摩洛哥": [
    { id: "ex-ma-104", title: "摩洛哥6日沙漠星空之旅", days: 6, spots: 26, source: "知乎 @撒哈拉星空", likes: 5800, cover: unsplash$1("photo-1509316785289-025f5b846b35"), tags: ["沙漠", "星空", "露营"], profileKey: "tokyo" },
    { id: "ex-ma-102", title: "摩洛哥5日四大皇城巡礼", days: 5, spots: 22, source: "马蜂窝 @摩洛哥皇城", likes: 5200, cover: unsplash$1("photo-1682685797769-481b48222adf"), tags: ["古城", "文化", "建筑"], profileKey: "tokyo" },
    { id: "ex-ma-101", title: "摩洛哥7日撒哈拉深度环线", days: 7, spots: 30, source: "小红书 @摩洛哥环线", likes: 6400, cover: unsplash$1("photo-1500259571355-332da5cb07aa"), tags: ["沙漠", "古城", "集市"], profileKey: "tokyo" }
  ],
  "埃及": [
    { id: "ex-eg-101", title: "埃及7日尼罗河全景游", days: 7, spots: 30, source: "小红书 @埃及全景", likes: 8200, cover: unsplash$1("photo-1495567720989-cebdbdd97913"), tags: ["金字塔", "神庙", "游轮"], profileKey: "tokyo" },
    { id: "ex-eg-102", title: "埃及5日古文明深度探索", days: 5, spots: 22, source: "马蜂窝 @埃及古文明", likes: 6800, cover: unsplash$1("photo-1490730141103-6cac27aaab94"), tags: ["古迹", "博物馆", "历史"], profileKey: "tokyo" },
    { id: "ex-eg-103", title: "埃及9日全境深度游", days: 9, spots: 36, source: "穷游 @埃及深度", likes: 5400, cover: unsplash$1("photo-1519922639192-e73293ca430e"), tags: ["金字塔", "红海", "沙漠"], profileKey: "tokyo" }
  ],
  "土耳其": [
    { id: "ex-tr-101", title: "土耳其8日经典环线自驾", days: 8, spots: 34, source: "小红书 @土耳其环线", likes: 9400, cover: unsplash$1("photo-1506929562872-bb421503ef21"), tags: ["自驾", "热气球", "古迹"], profileKey: "tokyo" },
    { id: "ex-tr-102", title: "伊斯坦布尔5日深度文化游", days: 5, spots: 22, source: "携程 @伊斯坦布尔", likes: 7600, cover: unsplash$1("photo-1501785888041-af3ef285b470"), tags: ["清真寺", "集市", "文化"], profileKey: "tokyo" },
    { id: "ex-tr-103", title: "土耳其地中海7日帆船之旅", days: 7, spots: 30, source: "马蜂窝 @土耳其帆船", likes: 6200, cover: unsplash$1("photo-1506197603052-3cc9c3a201bd"), tags: ["帆船", "海岸", "古城"], profileKey: "tokyo" }
  ],
  "中国": [
    { id: "ex-cn-102", title: "西藏7日朝圣之旅", days: 7, spots: 30, source: "马蜂窝 @西藏旅行", likes: 15600, cover: unsplash$1("photo-1461823385004-d7660947a7c0"), tags: ["高原", "寺庙", "圣湖"], profileKey: "tokyo" },
    { id: "ex-cn-106", title: "四川9日川西环线自驾", days: 9, spots: 36, source: "马蜂窝 @川西自驾", likes: 14200, cover: unsplash$1("photo-1507525428034-b723cf961d3e"), tags: ["自驾", "雪山", "高原"], profileKey: "tokyo" },
    { id: "ex-cn-103", title: "云南6日滇西北环线", days: 6, spots: 26, source: "携程 @云南环线", likes: 13200, cover: unsplash$1("photo-1520483601560-389dff434fdf"), tags: ["雪山", "古城", "梯田"], profileKey: "tokyo" },
    { id: "ex-cn-101", title: "丝绸之路8日深度游", days: 8, spots: 34, source: "小红书 @丝路之旅", likes: 12800, cover: unsplash$1("photo-1480497490787-505ec076689f"), tags: ["古迹", "沙漠", "文化"], profileKey: "tokyo" },
    { id: "ex-cn-104", title: "新疆10日天山南北自驾", days: 10, spots: 42, source: "知乎 @新疆自驾", likes: 11800, cover: unsplash$1("photo-1508193638397-1c4234db14d8"), tags: ["自驾", "草原", "沙漠"], profileKey: "tokyo" }
  ],
  "希腊": [
    { id: "ex-gr-1", title: "圣托里尼3日浪漫之旅", days: 3, spots: 15, source: "小红书 @希腊浪漫", likes: 11200, cover: unsplash$1("photo-1570077188670-e3a8d69ac5ff"), tags: ["海岛", "日落", "浪漫"], profileKey: "paris" },
    { id: "ex-gr-3", title: "希腊7日跳岛游", days: 7, spots: 30, source: "马蜂窝 @希腊跳岛", likes: 9800, cover: unsplash$1("photo-1530841377377-3ff06c0ca713"), tags: ["海岛", "海滩", "美食"], profileKey: "paris" },
    { id: "ex-gr-2", title: "雅典5日古文明深度游", days: 5, spots: 22, source: "携程 @雅典古迹", likes: 8400, cover: unsplash$1("photo-1555993539-1732b0258235"), tags: ["古迹", "博物馆", "历史"], profileKey: "paris" },
    { id: "ex-gr-6", title: "希腊10日全景深度游", days: 10, spots: 42, source: "小红书 @希腊全景", likes: 7600, cover: unsplash$1("photo-1504512485720-7d83a16ee930"), tags: ["海岛", "古迹", "美食"], profileKey: "paris" },
    { id: "ex-gr-7", title: "米克诺斯2日派对海岛", days: 2, spots: 12, source: "小红书 @米克诺斯", likes: 6800, cover: unsplash$1("photo-1601581875309-fafbf2d3ed3a"), tags: ["海岛", "派对", "海滩"], profileKey: "paris" }
  ],
  "葡萄牙": [
    { id: "ex-pt-1", title: "里斯本3日怀旧电车之旅", days: 3, spots: 15, source: "小红书 @里斯本漫步", likes: 7800, cover: unsplash$1("photo-1555881400-74d7acaacd8b"), tags: ["电车", "老城", "美食"], profileKey: "paris" },
    { id: "ex-pt-2", title: "葡萄牙7日南北纵贯", days: 7, spots: 30, source: "马蜂窝 @葡萄牙全景", likes: 6400, cover: unsplash$1("photo-1513735492246-483525079686"), tags: ["海岸", "古城", "红酒"], profileKey: "paris" },
    { id: "ex-pt-3", title: "波尔图5日红酒之旅", days: 5, spots: 22, source: "知乎 @波尔图红酒", likes: 5800, cover: unsplash$1("photo-1508739773434-c26b3d09e071"), tags: ["红酒", "古城", "美食"], profileKey: "paris" },
    { id: "ex-pt-4", title: "阿尔加维海岸6日度假", days: 6, spots: 26, source: "携程 @阿尔加维", likes: 4600, cover: unsplash$1("photo-1470770903676-69b98201ea1c"), tags: ["海岸", "海滩", "悬崖"], profileKey: "paris" }
  ],
  "荷兰": [
    { id: "ex-nl-2", title: "荷兰5日郁金香风车之旅", days: 5, spots: 22, source: "携程 @荷兰花季", likes: 9400, cover: unsplash$1("photo-1558551649-e44c8f992010"), tags: ["郁金香", "风车", "田园"], profileKey: "paris" },
    { id: "ex-nl-1", title: "阿姆斯特丹3日运河之旅", days: 3, spots: 15, source: "小红书 @荷兰运河", likes: 8200, cover: unsplash$1("photo-1464278533981-50106e6176b1"), tags: ["运河", "博物馆", "自行车"], profileKey: "paris" },
    { id: "ex-nl-3", title: "荷兰6日艺术设计巡礼", days: 6, spots: 26, source: "马蜂窝 @荷兰艺术", likes: 5600, cover: unsplash$1("photo-1534351590666-13e3e96b5017"), tags: ["艺术", "博物馆", "设计"], profileKey: "paris" }
  ],
  "挪威": [
    { id: "ex-no-1", title: "挪威峡湾7日自驾之旅", days: 7, spots: 30, source: "小红书 @挪威峡湾", likes: 9200, cover: unsplash$1("photo-1520769669658-f07657f5a307"), tags: ["峡湾", "自驾", "自然"], profileKey: "paris" },
    { id: "ex-no-2", title: "挪威5日极光北极之旅", days: 5, spots: 22, source: "马蜂窝 @挪威极光", likes: 8400, cover: unsplash$1("photo-1519681393784-d120267933ba"), tags: ["极光", "北极", "冬季"], profileKey: "paris" },
    { id: "ex-no-3", title: "挪威8日全景峡湾极光", days: 8, spots: 34, source: "知乎 @挪威全景", likes: 7600, cover: unsplash$1("photo-1507272931001-fc06c17e4f43"), tags: ["峡湾", "极光", "徒步"], profileKey: "paris" },
    { id: "ex-no-4", title: "罗弗敦群岛6日摄影之旅", days: 6, spots: 26, source: "穷游 @罗弗敦摄影", likes: 6200, cover: unsplash$1("photo-1516466723877-e4ec1d736c8a"), tags: ["摄影", "渔村", "极光"], profileKey: "paris" },
    { id: "ex-no-6", title: "卑尔根3日峡湾入门游", days: 3, spots: 15, source: "携程 @卑尔根峡湾", likes: 5200, cover: unsplash$1("photo-1513519245088-0e12902e5a38"), tags: ["峡湾", "彩色小屋", "自然"], profileKey: "paris" }
  ],
  "克罗地亚": [
    { id: "ex-hr-1", title: "杜布罗夫尼克3日权游打卡", days: 3, spots: 15, source: "小红书 @权游打卡", likes: 8800, cover: unsplash$1("photo-1506744038136-46273834b3fb"), tags: ["古城", "海岸", "影视"], profileKey: "paris" },
    { id: "ex-hr-2", title: "克罗地亚7日海岸线自驾", days: 7, spots: 30, source: "马蜂窝 @克罗地亚海岸", likes: 6800, cover: unsplash$1("photo-1559734840-f9509ee5677f"), tags: ["自驾", "海岸", "古城"], profileKey: "paris" },
    { id: "ex-hr-3", title: "十六湖国家公园5日自然游", days: 5, spots: 22, source: "知乎 @十六湖", likes: 5400, cover: unsplash$1("photo-1494500764479-0c8f2919a3d8"), tags: ["国家公园", "瀑布", "自然"], profileKey: "paris" },
    { id: "ex-hr-5", title: "斯普利特扎达尔4日古城海岸", days: 4, spots: 18, source: "知乎 @达尔马提亚", likes: 4200, cover: unsplash$1("photo-1512632578888-169bbbc64f33"), tags: ["古城", "海岸", "历史"], profileKey: "paris" }
  ],
  "秘鲁": [
    { id: "ex-pe-1", title: "马丘比丘5日朝圣之旅", days: 5, spots: 22, source: "小红书 @马丘比丘", likes: 8600, cover: unsplash$1("photo-1507041957456-9c397ce39c97"), tags: ["世界遗产", "古迹", "徒步"], profileKey: "newyork" },
    { id: "ex-pe-2", title: "秘鲁7日安第斯高原深度游", days: 7, spots: 30, source: "马蜂窝 @秘鲁深度", likes: 6400, cover: unsplash$1("photo-1580619305218-8423a7ef79b4"), tags: ["高原", "古迹", "文化"], profileKey: "newyork" },
    { id: "ex-pe-5", title: "亚马逊雨林3日探险", days: 3, spots: 15, source: "小红书 @亚马逊探险", likes: 5600, cover: unsplash$1("photo-1516026672322-bc52d61a55d5"), tags: ["雨林", "野生动物", "冒险"], profileKey: "newyork" },
    { id: "ex-pe-3", title: "利马库斯科6日印加文明", days: 6, spots: 26, source: "知乎 @印加文明", likes: 5200, cover: unsplash$1("photo-1526392060635-9d6019884377"), tags: ["古迹", "美食", "文化"], profileKey: "newyork" }
  ],
  "阿根廷": [
    { id: "ex-ar-2", title: "巴塔哥尼亚7日冰川徒步", days: 7, spots: 30, source: "马蜂窝 @巴塔哥尼亚", likes: 8400, cover: unsplash$1("photo-1475924156734-496f6cac6ec1"), tags: ["冰川", "徒步", "自然"], profileKey: "newyork" },
    { id: "ex-ar-1", title: "布宜诺斯艾利斯5日探戈之旅", days: 5, spots: 22, source: "小红书 @探戈之都", likes: 7200, cover: unsplash$1("photo-1589909202802-8f4aadce1849"), tags: ["探戈", "美食", "文化"], profileKey: "newyork" },
    { id: "ex-ar-4", title: "伊瓜苏瀑布3日震撼之旅", days: 3, spots: 15, source: "知乎 @伊瓜苏瀑布", likes: 6800, cover: unsplash$1("photo-1433838552652-f9a46b332c40"), tags: ["瀑布", "自然", "世界遗产"], profileKey: "newyork" },
    { id: "ex-ar-3", title: "阿根廷9日全景深度游", days: 9, spots: 36, source: "穷游 @阿根廷全景", likes: 5600, cover: unsplash$1("photo-1484591974057-265bb767ef71"), tags: ["冰川", "瀑布", "美食"], profileKey: "newyork" }
  ],
  "巴西": [
    { id: "ex-br-1", title: "里约热内卢5日狂欢之旅", days: 5, spots: 22, source: "小红书 @里约狂欢", likes: 8200, cover: unsplash$1("photo-1483729558449-99ef09a8c325"), tags: ["海滩", "狂欢节", "都市"], profileKey: "newyork" },
    { id: "ex-br-2", title: "巴西7日热带全景游", days: 7, spots: 30, source: "马蜂窝 @巴西全景", likes: 6400, cover: unsplash$1("photo-1516306580123-e6e52b1b7b5f"), tags: ["海滩", "雨林", "文化"], profileKey: "newyork" },
    { id: "ex-br-3", title: "亚马逊雨林6日生态探险", days: 6, spots: 26, source: "知乎 @亚马逊生态", likes: 5800, cover: unsplash$1("photo-1518241353330-0f7941c2d9b5"), tags: ["雨林", "野生动物", "自然"], profileKey: "newyork" }
  ],
  "以色列": [
    { id: "ex-il-1", title: "耶路撒冷5日圣地朝圣", days: 5, spots: 22, source: "小红书 @圣地之旅", likes: 7200, cover: unsplash$1("photo-1544735716-392fe2489ffa"), tags: ["圣地", "历史", "文化"], profileKey: "tokyo" },
    { id: "ex-il-4", title: "死海马萨达2日沙漠探险", days: 2, spots: 12, source: "小红书 @死海体验", likes: 6400, cover: unsplash$1("photo-1507209696998-3c532be9b2b5"), tags: ["沙漠", "死海", "古迹"], profileKey: "tokyo" },
    { id: "ex-il-2", title: "以色列7日全景深度游", days: 7, spots: 30, source: "马蜂窝 @以色列全景", likes: 5800, cover: unsplash$1("photo-1552423314-cf29ab68ad73"), tags: ["历史", "沙漠", "海滩"], profileKey: "tokyo" }
  ],
  "约旦": [
    { id: "ex-jo-1", title: "佩特拉3日玫瑰之城探秘", days: 3, spots: 15, source: "小红书 @佩特拉", likes: 7800, cover: unsplash$1("photo-1548013146-72479768bada"), tags: ["古迹", "世界遗产", "沙漠"], profileKey: "tokyo" },
    { id: "ex-jo-2", title: "约旦5日沙漠古迹之旅", days: 5, spots: 22, source: "马蜂窝 @约旦探险", likes: 6400, cover: unsplash$1("photo-1501232060322-aa87215ab531"), tags: ["沙漠", "古迹", "冒险"], profileKey: "tokyo" },
    { id: "ex-jo-3", title: "瓦迪拉姆沙漠2日星空露营", days: 2, spots: 12, source: "知乎 @约旦星空", likes: 5600, cover: unsplash$1("photo-1547234935-80c7145ec969"), tags: ["沙漠", "星空", "露营"], profileKey: "tokyo" }
  ],
  "南非": [
    { id: "ex-za-2", title: "南非7日野生动物猎游", days: 7, spots: 30, source: "马蜂窝 @南非猎游", likes: 8800, cover: unsplash$1("photo-1516426122078-c23e76319801"), tags: ["野生动物", "国家公园", "自然"], profileKey: "tokyo" },
    { id: "ex-za-1", title: "开普敦5日好望角之旅", days: 5, spots: 22, source: "小红书 @开普敦之旅", likes: 7600, cover: unsplash$1("photo-1580060839134-75a5edca2e99"), tags: ["好望角", "葡萄酒", "海岸"], profileKey: "tokyo" },
    { id: "ex-za-3", title: "花园大道6日自驾", days: 6, spots: 26, source: "知乎 @花园大道", likes: 5400, cover: unsplash$1("photo-1547471080-7cc2caa01a7e"), tags: ["自驾", "海岸", "自然"], profileKey: "tokyo" },
    { id: "ex-za-6", title: "开普敦2日桌山酒庄", days: 2, spots: 12, source: "小红书 @开普敦快闪", likes: 4800, cover: unsplash$1("photo-1576485375217-d6a95e34d043"), tags: ["桌山", "葡萄酒", "海岸"], profileKey: "tokyo" }
  ],
  "尼泊尔": [
    { id: "ex-np-1", title: "尼泊尔ABC徒步7日", days: 7, spots: 30, source: "小红书 @尼泊尔徒步", likes: 8200, cover: unsplash$1("photo-1527549993586-dff825b37782"), tags: ["徒步", "高山", "雪山"], profileKey: "bangkok" },
    { id: "ex-np-3", title: "尼泊尔EBC珠峰大本营10日", days: 10, spots: 42, source: "知乎 @EBC徒步", likes: 7600, cover: unsplash$1("photo-1464822759023-fed622ff2c3b"), tags: ["徒步", "珠峰", "冒险"], profileKey: "bangkok" },
    { id: "ex-np-2", title: "加德满都5日文化之旅", days: 5, spots: 22, source: "马蜂窝 @加德满都", likes: 6400, cover: unsplash$1("photo-1558799401-1dcba79834c2"), tags: ["寺庙", "文化", "古城"], profileKey: "bangkok" },
    { id: "ex-np-4", title: "博卡拉3日滑翔冒险", days: 3, spots: 15, source: "小红书 @博卡拉飞翔", likes: 5800, cover: unsplash$1("photo-1534067783941-51c9c23ecefd"), tags: ["滑翔伞", "湖泊", "冒险"], profileKey: "bangkok" }
  ],
  "印度": [
    { id: "ex-in-1", title: "印度金三角5日经典游", days: 5, spots: 22, source: "小红书 @印度金三角", likes: 7800, cover: unsplash$1("photo-1524492412937-b28074a5d7da"), tags: ["泰姬陵", "古迹", "文化"], profileKey: "bangkok" },
    { id: "ex-in-5", title: "瓦拉纳西3日恒河圣城", days: 3, spots: 15, source: "小红书 @恒河之旅", likes: 6800, cover: unsplash$1("photo-1561361513-2d000a50f0dc"), tags: ["圣城", "文化", "宗教"], profileKey: "bangkok" },
    { id: "ex-in-2", title: "拉贾斯坦7日色彩之旅", days: 7, spots: 30, source: "马蜂窝 @拉贾斯坦", likes: 6400, cover: unsplash$1("photo-1585135497273-1a86b09fe70e"), tags: ["城堡", "色彩", "沙漠"], profileKey: "bangkok" },
    { id: "ex-in-4", title: "印度9日北部深度游", days: 9, spots: 36, source: "穷游 @北印深度", likes: 5800, cover: unsplash$1("photo-1515091943-9d5c0ad475af"), tags: ["古迹", "文化", "美食"], profileKey: "bangkok" },
    { id: "ex-in-3", title: "喀拉拉邦6日回水之旅", days: 6, spots: 26, source: "知乎 @喀拉拉", likes: 5200, cover: unsplash$1("photo-1602216056096-3b40cc0c9944"), tags: ["回水", "茶园", "阿育吠陀"], profileKey: "bangkok" }
  ],
  "马尔代夫": [
    { id: "ex-mv-1", title: "马尔代夫5日奢华度假", days: 5, spots: 22, source: "小红书 @马代奢旅", likes: 12200, cover: unsplash$1("photo-1514282401047-d79a71a590e8"), tags: ["度假", "海岛", "潜水"], profileKey: "bangkok" },
    { id: "ex-mv-2", title: "马尔代夫3日蜜月之旅", days: 3, spots: 15, source: "携程 @马代蜜月", likes: 9800, cover: unsplash$1("photo-1573843981267-be1999ff37cd"), tags: ["蜜月", "浪漫", "水屋"], profileKey: "bangkok" },
    { id: "ex-mv-3", title: "马尔代夫7日深度海岛游", days: 7, spots: 30, source: "马蜂窝 @马代深度", likes: 8400, cover: unsplash$1("photo-1540202404-a2f29016b523"), tags: ["潜水", "海钓", "SPA"], profileKey: "bangkok" }
  ],
  "斐济": [
    { id: "ex-fj-1", title: "斐济5日天堂海岛之旅", days: 5, spots: 22, source: "小红书 @斐济天堂", likes: 7200, cover: unsplash$1("photo-1575999502951-4ab25b5ca889"), tags: ["海岛", "潜水", "度假"], profileKey: "tokyo" },
    { id: "ex-fj-3", title: "斐济3日蜜月浪漫之旅", days: 3, spots: 15, source: "携程 @斐济蜜月", likes: 6400, cover: unsplash$1("photo-1530789253388-582c481c54b0"), tags: ["蜜月", "浪漫", "海岛"], profileKey: "tokyo" },
    { id: "ex-fj-2", title: "斐济7日跳岛深度游", days: 7, spots: 30, source: "马蜂窝 @斐济跳岛", likes: 5800, cover: unsplash$1("photo-1468413253725-0d5181091126"), tags: ["跳岛", "海滩", "珊瑚"], profileKey: "tokyo" }
  ]
};
const times = ["09:00", "10:00", "11:30", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"];
const profiles = [
  {
    key: "tokyo",
    name: "东京",
    cover: "tokyo",
    date: "2026.05.18 — 05.22",
    defaultDays: 5,
    aliases: ["东京", "tokyo", "新宿", "涩谷", "浅草", "上野", "原宿"],
    days: [
      {
        label: "Day 1",
        route: "新宿 · 涩谷",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "新宿御苑",
            desc: "游览 1.5h",
            lat: 35.6852,
            lng: 139.71,
            category: "景点",
            intro: "东京最大的庭园之一，春季有1100棵樱花树盛开，融合了日式、英式、法式三种庭园风格",
            rating: 4.7,
            tags: ["赏樱", "散步"]
          },
          {
            id: "",
            time: "11:00",
            title: "一兰拉面 新宿店",
            desc: "午餐 40min",
            lat: 35.6934,
            lng: 139.7037,
            category: "美食",
            intro: "博多豚骨拉面名店，独创味集中系统，可自选面硬度、油量、蒜量",
            rating: 4.5,
            price: "¥980",
            tags: ["拉面", "排队名店"]
          },
          {
            id: "",
            time: "13:00",
            title: "涩谷十字路口",
            desc: "拍照 30min",
            lat: 35.6595,
            lng: 139.7004,
            category: "景点",
            intro: "世界最繁忙的十字路口，每次绿灯有多达3000人同时过马路，是东京的标志性场景",
            rating: 4.6,
            tags: ["地标", "拍照"]
          },
          {
            id: "",
            time: "14:00",
            title: "涩谷 PARCO",
            desc: "购物 2h",
            lat: 35.6618,
            lng: 139.6973,
            category: "购物",
            intro: "涩谷地标性商场，汇集任天堂官方商店、潮牌、设计师品牌和动漫周边",
            rating: 4.3,
            tags: ["潮牌", "任天堂"]
          },
          {
            id: "",
            time: "17:00",
            title: "SHIBUYA SKY",
            desc: "日落观景 1h",
            lat: 35.6584,
            lng: 139.7022,
            category: "景点",
            intro: "涩谷Scramble Square顶层360度全景展望台，海拔229米，天气好可远眺富士山",
            rating: 4.8,
            price: "¥2000",
            tags: ["观景台", "日落"]
          },
          {
            id: "",
            time: "19:00",
            title: "东京柏悦酒店",
            desc: "入住",
            lat: 35.6857,
            lng: 139.6905,
            category: "住宿",
            intro: "位于新宿公园塔41-52层，可俯瞰新宿御苑和富士山，《迷失东京》取景地",
            rating: 4.9,
            price: "¥3500/晚",
            tags: ["五星", "景观房"]
          }
        ]
      },
      {
        label: "Day 2",
        route: "原宿 · 明治神宫",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "明治神宫",
            desc: "散步参拜 1.5h",
            lat: 35.6764,
            lng: 139.6993,
            category: "景点",
            intro: "供奉明治天皇的神社，被70万棵树木的常绿森林环绕，是闹市中的宁静绿洲",
            rating: 4.7,
            tags: ["神社", "森林"]
          },
          {
            id: "",
            time: "11:00",
            title: "原宿竹下通",
            desc: "逛街 1.5h",
            lat: 35.6708,
            lng: 139.7036,
            category: "购物",
            intro: "东京青年潮流文化圣地，350米长的步行街汇集了各种古着店、甜品店和特色小店",
            rating: 4.2,
            tags: ["潮流", "古着"]
          },
          {
            id: "",
            time: "12:30",
            title: "AFURI 阿夫利",
            desc: "午餐 40min",
            lat: 35.6697,
            lng: 139.7048,
            category: "美食",
            intro: "柚子盐拉面专门店，清爽汤底配合特制柚子酱，是拉面界的清新派代表",
            rating: 4.4,
            price: "¥1100",
            tags: ["柚子拉面", "网红店"]
          },
          {
            id: "",
            time: "14:00",
            title: "表参道",
            desc: "散步购物 2h",
            lat: 35.6654,
            lng: 139.7107,
            category: "购物",
            intro: "东京的香榭丽舍大道，两旁是安藤忠雄等大师设计的品牌旗舰店建筑",
            rating: 4.5,
            tags: ["建筑", "奢侈品"]
          },
          {
            id: "",
            time: "17:00",
            title: "bills 表参道",
            desc: "下午茶 1h",
            lat: 35.6651,
            lng: 139.7121,
            category: "美食",
            intro: "来自悉尼的世界第一早餐店，招牌松饼口感绵密如云朵",
            rating: 4.6,
            price: "¥1800",
            tags: ["松饼", "网红"]
          }
        ]
      },
      {
        label: "Day 3",
        route: "浅草 · 上野",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "浅草寺",
            desc: "游览 2h",
            lat: 35.7148,
            lng: 139.7967,
            category: "景点",
            intro: "东京最古老的寺庙（公元628年），雷门大灯笼是东京必拍标志，仲见世通有90多家传统小店",
            rating: 4.8,
            tags: ["寺庙", "必去"]
          },
          {
            id: "",
            time: "11:30",
            title: "大黑家天妇罗",
            desc: "午餐 1h",
            lat: 35.7126,
            lng: 139.7953,
            category: "美食",
            intro: "浅草百年老字号（1887年创业），炸虾天妇罗个头巨大溢出碗边，是浅草名物",
            rating: 4.3,
            price: "¥1700",
            tags: ["天妇罗", "百年老店"]
          },
          {
            id: "",
            time: "13:00",
            title: "上野公园",
            desc: "散步 1.5h",
            lat: 35.7156,
            lng: 139.7745,
            category: "景点",
            intro: "东京最大的公园，内有东京国立博物馆、上野动物园和不忍池，春季1200棵樱花绝景",
            rating: 4.5,
            tags: ["公园", "博物馆"]
          },
          {
            id: "",
            time: "15:00",
            title: "阿美横丁",
            desc: "逛市场 1h",
            lat: 35.7107,
            lng: 139.7747,
            category: "购物",
            intro: "上野站旁的平民市场街，400多家店铺售卖海鲜、干货、药妆和服饰，讨价还价的乐趣",
            rating: 4.1,
            tags: ["市场", "药妆"]
          },
          {
            id: "",
            time: "18:00",
            title: "Dormy Inn 上野",
            desc: "入住",
            lat: 35.7113,
            lng: 139.7752,
            category: "住宿",
            intro: "性价比极高的商务酒店，顶楼有免费天然温泉大浴场，每晚提供免费拉面宵夜",
            rating: 4.4,
            price: "¥800/晚",
            tags: ["温泉", "性价比"]
          }
        ]
      },
      {
        label: "Day 4",
        route: "银座 · 台场",
        spots: [
          {
            id: "",
            time: "10:00",
            title: "筑地场外市场",
            desc: "早午餐 1.5h",
            lat: 35.6654,
            lng: 139.7707,
            category: "美食",
            intro: "虽然场内市场搬至丰洲，场外400多家店依然是海鲜天堂，现烤帝王蟹腿和海鲜丼必试",
            rating: 4.6,
            tags: ["海鲜", "市场"]
          },
          {
            id: "",
            time: "12:00",
            title: "银座",
            desc: "购物 2h",
            lat: 35.6719,
            lng: 139.7648,
            category: "购物",
            intro: "东京最高端的商业区，中央通步行者天国、三越百货、GINZA SIX汇集全球顶级品牌",
            rating: 4.5,
            tags: ["奢侈品", "百货"]
          },
          {
            id: "",
            time: "15:00",
            title: "teamLab Borderless",
            desc: "互动艺术 2h",
            lat: 35.6257,
            lng: 139.7712,
            category: "景点",
            intro: "全球最受欢迎的数字艺术美术馆，沉浸式光影空间随步移动变化，每次体验都不同",
            rating: 4.9,
            price: "¥3800",
            tags: ["艺术", "打卡"]
          },
          {
            id: "",
            time: "18:00",
            title: "鮨さいとう 银座本店",
            desc: "晚餐 1.5h",
            lat: 35.6701,
            lng: 139.7639,
            category: "美食",
            intro: "米其林三星寿司，主厨在食客面前现捏，每一贯都是对新鲜食材的极致呈现",
            rating: 4.8,
            price: "¥15000",
            tags: ["米其林", "寿司"]
          }
        ]
      },
      {
        label: "Day 5",
        route: "秋叶原 · 东京塔",
        spots: [
          {
            id: "",
            time: "10:00",
            title: "秋叶原电器街",
            desc: "逛街 2h",
            lat: 35.7023,
            lng: 139.7745,
            category: "购物",
            intro: "全球最大的动漫和电子产品圣地，从复古游戏到最新手办，宅文化的终极朝圣地",
            rating: 4.3,
            tags: ["动漫", "电子"]
          },
          {
            id: "",
            time: "12:30",
            title: "神田まつや",
            desc: "午餐 40min",
            lat: 35.6975,
            lng: 139.7677,
            category: "美食",
            intro: "明治17年创业的荞麦面老铺，手打荞麦面配合秘传酱汁，是东京人的灵魂美食",
            rating: 4.4,
            price: "¥900",
            tags: ["荞麦面", "老字号"]
          },
          {
            id: "",
            time: "14:00",
            title: "皇居外苑",
            desc: "散步 1h",
            lat: 35.6825,
            lng: 139.7521,
            category: "景点",
            intro: "日本天皇居所的外围庭园，二重桥是经典取景点，护城河和松林构成宁静的都市绿洲",
            rating: 4.3,
            tags: ["皇居", "散步"]
          },
          {
            id: "",
            time: "16:00",
            title: "东京塔",
            desc: "观光 1.5h",
            lat: 35.6586,
            lng: 139.7454,
            category: "景点",
            intro: "333米高的红色铁塔，比埃菲尔铁塔高13米，顶层展望台可360度俯瞰东京全景",
            rating: 4.6,
            price: "¥1200",
            tags: ["地标", "夜景"]
          },
          {
            id: "",
            time: "19:00",
            title: "芝公园烤肉六歌仙",
            desc: "告别晚餐 2h",
            lat: 35.6565,
            lng: 139.7471,
            category: "美食",
            intro: "东京塔脚下的人气和牛烤肉店，A5和牛入口即化，边吃边赏东京塔夜景",
            rating: 4.5,
            price: "¥6000",
            tags: ["和牛", "烤肉"]
          }
        ]
      }
    ]
  },
  {
    key: "kyoto",
    name: "京都",
    cover: "japan",
    date: "2026.04.03 — 04.05",
    defaultDays: 3,
    aliases: ["京都", "kyoto", "清水寺", "祇园", "伏见"],
    days: [
      {
        label: "Day 1",
        route: "东山区",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "清水寺",
            desc: "游览 1.5h",
            lat: 34.9949,
            lng: 135.785,
            category: "景点",
            intro: "世界文化遗产，悬空的清水舞台不用一根钉子建成，春秋季夜间点灯更是绝景",
            rating: 4.8,
            tags: ["世界遗产", "必去"]
          },
          {
            id: "",
            time: "11:00",
            title: "二年坂三年坂",
            desc: "散步 1h",
            lat: 34.998,
            lng: 135.7808,
            category: "购物",
            intro: "保存完好的江户时代石板路，两侧是京都传统町屋商店和手工艺品店",
            rating: 4.5,
            tags: ["古街", "手信"]
          },
          {
            id: "",
            time: "12:30",
            title: "顺正汤豆腐",
            desc: "午餐 1h",
            lat: 34.9962,
            lng: 135.7835,
            category: "美食",
            intro: "百年汤豆腐名店，使用南禅寺水源制作的手工豆腐，口感细嫩如丝",
            rating: 4.3,
            price: "¥3000",
            tags: ["豆腐料理", "百年老店"]
          },
          {
            id: "",
            time: "14:30",
            title: "祇园花见小路",
            desc: "散步 1h",
            lat: 35.0038,
            lng: 135.775,
            category: "景点",
            intro: "京都最著名的花街，傍晚有机会偶遇真正的艺伎匆匆赴宴",
            rating: 4.6,
            tags: ["艺伎", "花街"]
          },
          {
            id: "",
            time: "17:00",
            title: "THE SODOH 东山",
            desc: "晚餐 1.5h",
            lat: 34.9983,
            lng: 135.7803,
            category: "美食",
            intro: "由画家竹内栖凤的旧宅改造，在百年庭园中享用京都法式料理",
            rating: 4.7,
            price: "¥5000",
            tags: ["法餐", "庭园"]
          },
          {
            id: "",
            time: "19:00",
            title: "翠岚豪华精选",
            desc: "入住",
            lat: 35.0156,
            lng: 135.6735,
            category: "住宿",
            intro: "岚山畔的顶级温泉旅馆，每间客房可望保津川溪谷，私汤体验极致",
            rating: 4.9,
            price: "¥5000/晚",
            tags: ["温泉旅馆", "岚山"]
          }
        ]
      },
      {
        label: "Day 2",
        route: "伏见 · 锦市场",
        spots: [
          {
            id: "",
            time: "07:00",
            title: "伏见稻荷大社",
            desc: "千鸟居 2h",
            lat: 34.9671,
            lng: 135.7727,
            category: "景点",
            intro: "万座朱红色鸟居组成绵延4公里的隧道，清晨人少时拍照最佳，是京都人气第一景点",
            rating: 4.9,
            tags: ["鸟居", "清晨"]
          },
          {
            id: "",
            time: "10:00",
            title: "锦市场",
            desc: "逛吃 1.5h",
            lat: 35.005,
            lng: 135.7648,
            category: "美食",
            intro: "京都的厨房，400年历史的食品市场，京渍物、抹茶甜品、烤章鱼丸子边走边吃",
            rating: 4.5,
            tags: ["市场", "小吃"]
          },
          {
            id: "",
            time: "12:00",
            title: "金阁寺",
            desc: "游览 1h",
            lat: 35.0394,
            lng: 135.7292,
            category: "景点",
            intro: "正式名称鹿苑寺，贴满金箔的三层楼阁倒映在镜湖池中，是京都最经典的画面",
            rating: 4.7,
            tags: ["金阁寺", "世界遗产"]
          },
          {
            id: "",
            time: "14:00",
            title: "岚山竹林",
            desc: "散步 1h",
            lat: 35.0173,
            lng: 135.6717,
            category: "景点",
            intro: "高耸的青竹林形成天然隧道，风吹竹叶沙沙作响，被评为日本音风景百选",
            rating: 4.6,
            tags: ["竹林", "散步"]
          },
          {
            id: "",
            time: "16:00",
            title: "% Arabica 岚山",
            desc: "咖啡 30min",
            lat: 35.0148,
            lng: 135.6776,
            category: "美食",
            intro: "全球网红咖啡品牌的发源店，坐在渡月桥畔品一杯拿铁看山水",
            rating: 4.4,
            price: "¥600",
            tags: ["咖啡", "网红"]
          }
        ]
      },
      {
        label: "Day 3",
        route: "南禅寺 · 哲学之道",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "南禅寺",
            desc: "游览 1h",
            lat: 35.0113,
            lng: 135.7937,
            category: "景点",
            intro: "日本禅宗最高寺格，水路阁的红砖拱门是热门取景地，方丈庭园枯山水意境深远",
            rating: 4.6,
            tags: ["禅宗", "水路阁"]
          },
          {
            id: "",
            time: "10:30",
            title: "哲学之道",
            desc: "散步 1h",
            lat: 35.0232,
            lng: 135.7949,
            category: "景点",
            intro: "沿琵琶湖疏水渠的1.5公里石板路，因哲学家西田几多郎每日在此沉思而得名",
            rating: 4.5,
            tags: ["散步", "赏樱"]
          },
          {
            id: "",
            time: "12:00",
            title: "おめん 银阁寺店",
            desc: "午餐 1h",
            lat: 35.0265,
            lng: 135.7937,
            category: "美食",
            intro: "京都乌冬面名店，手打粗面配合七种蔬菜佐料，蘸浓郁味噌汤汁",
            rating: 4.3,
            price: "¥1200",
            tags: ["乌冬面", "京料理"]
          },
          {
            id: "",
            time: "14:00",
            title: "银阁寺",
            desc: "游览 1h",
            lat: 35.027,
            lng: 135.7983,
            category: "景点",
            intro: "与金阁寺并称的世界遗产，银沙滩和向月台的枯山水庭园体现了侘寂之美",
            rating: 4.5,
            tags: ["世界遗产", "侘寂"]
          },
          {
            id: "",
            time: "16:00",
            title: "中村藤吉 本店",
            desc: "抹茶甜品",
            lat: 34.8894,
            lng: 135.8036,
            category: "美食",
            intro: "安政元年创业的宇治抹茶老铺，抹茶冻配白玉团子是京都甜品天花板",
            rating: 4.7,
            price: "¥1500",
            tags: ["抹茶", "甜品"]
          }
        ]
      }
    ]
  },
  {
    key: "seoul",
    name: "首尔",
    cover: "korea",
    date: "2026.06.10 — 06.13",
    defaultDays: 4,
    aliases: ["首尔", "seoul", "明洞", "弘大", "景福宫"],
    days: [
      {
        label: "Day 1",
        route: "景福宫 · 北村",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "景福宫",
            desc: "韩服体验 2h",
            lat: 37.5796,
            lng: 126.977,
            category: "景点",
            intro: "朝鲜王朝正宫，穿韩服可免费入场，勤政殿前的守卫换岗仪式不可错过",
            rating: 4.7,
            tags: ["韩服", "王宫"]
          },
          {
            id: "",
            time: "11:30",
            title: "土俗村参鸡汤",
            desc: "午餐 1h",
            lat: 37.5789,
            lng: 126.9714,
            category: "美食",
            intro: "景福宫旁的排队名店，整只童子鸡塞满糯米人参炖至软烂，是韩国国民补汤",
            rating: 4.5,
            price: "₩16000",
            tags: ["参鸡汤", "排队名店"]
          },
          {
            id: "",
            time: "13:00",
            title: "北村韩屋村",
            desc: "散步 1.5h",
            lat: 37.5826,
            lng: 126.983,
            category: "景点",
            intro: "600年历史的传统韩屋聚落，保留了朝鲜时代的建筑风貌，八景拍照路线是经典",
            rating: 4.4,
            tags: ["韩屋", "拍照"]
          },
          {
            id: "",
            time: "15:00",
            title: "三清洞",
            desc: "逛街咖啡 1.5h",
            lat: 37.5832,
            lng: 126.9818,
            category: "购物",
            intro: "韩屋与现代咖啡馆、画廊混搭的文艺街区，每条小巷都有惊喜",
            rating: 4.3,
            tags: ["文艺", "咖啡"]
          },
          {
            id: "",
            time: "18:00",
            title: "广藏市场",
            desc: "晚餐 1.5h",
            lat: 37.5701,
            lng: 126.9998,
            category: "美食",
            intro: "首尔最古老的传统市场，绿豆煎饼、麻药紫菜包饭和生拌牛肉是三大必吃",
            rating: 4.6,
            tags: ["市场", "小吃"]
          },
          {
            id: "",
            time: "20:00",
            title: "乐天酒店首尔",
            desc: "入住",
            lat: 37.5653,
            lng: 126.981,
            category: "住宿",
            intro: "明洞核心地段，直连乐天百货和免税店，顶层可远眺南山塔",
            rating: 4.5,
            price: "₩200000/晚",
            tags: ["五星", "便利"]
          }
        ]
      },
      {
        label: "Day 2",
        route: "明洞 · 南山塔",
        spots: [
          {
            id: "",
            time: "10:00",
            title: "明洞",
            desc: "购物 2h",
            lat: 37.5638,
            lng: 126.985,
            category: "购物",
            intro: "首尔最热闹的购物街，韩国美妆品牌旗舰店云集，街头小吃摊也是一大看点",
            rating: 4.4,
            tags: ["美妆", "购物"]
          },
          {
            id: "",
            time: "12:30",
            title: "明洞饺子",
            desc: "午餐 40min",
            lat: 37.5636,
            lng: 126.9857,
            category: "美食",
            intro: "米其林必比登推荐，手工刀削面和蒸饺是招牌，性价比极高",
            rating: 4.5,
            price: "₩10000",
            tags: ["刀削面", "米其林"]
          },
          {
            id: "",
            time: "14:00",
            title: "南山塔",
            desc: "观光 2h",
            lat: 37.5512,
            lng: 126.9882,
            category: "景点",
            intro: "首尔地标，海拔480米的观景台可360度俯瞰全城，爱情锁墙是情侣必去",
            rating: 4.6,
            price: "₩16000",
            tags: ["观景台", "地标"]
          },
          {
            id: "",
            time: "17:00",
            title: "梨泰院",
            desc: "逛街 2h",
            lat: 37.5345,
            lng: 126.9946,
            category: "购物",
            intro: "首尔最国际化的街区，独立设计师品牌、古着店和异国餐厅一条街",
            rating: 4.2,
            tags: ["潮流", "古着"]
          },
          {
            id: "",
            time: "19:30",
            title: "姜虎东白丁",
            desc: "烤肉晚餐 1.5h",
            lat: 37.5356,
            lng: 126.993,
            category: "美食",
            intro: "韩国综艺明星姜虎东开的烤肉连锁，厚切五花肉在铁板上滋滋作响",
            rating: 4.4,
            price: "₩18000",
            tags: ["烤肉", "五花肉"]
          }
        ]
      },
      {
        label: "Day 3",
        route: "弘大 · 汉江",
        spots: [
          {
            id: "",
            time: "10:00",
            title: "弘大自由市场",
            desc: "逛街 2h",
            lat: 37.5563,
            lng: 126.9236,
            category: "购物",
            intro: "弘益大学周边的年轻人圣地，独立品牌、街头表演和涂鸦墙构成创意氛围",
            rating: 4.3,
            tags: ["文创", "街头艺术"]
          },
          {
            id: "",
            time: "12:30",
            title: "延南洞",
            desc: "午餐咖啡 1.5h",
            lat: 37.5656,
            lng: 126.9249,
            category: "美食",
            intro: "弘大旁的隐藏美食街区，经理团街沿线遍布韩式brunch店和精品咖啡馆",
            rating: 4.4,
            tags: ["brunch", "咖啡"]
          },
          {
            id: "",
            time: "15:00",
            title: "汝矣岛汉江公园",
            desc: "骑车野餐 2h",
            lat: 37.5283,
            lng: 126.9347,
            category: "景点",
            intro: "首尔人的后花园，租一辆自行车沿江骑行，再点一份炸鸡配啤酒坐在草坪上",
            rating: 4.5,
            tags: ["汉江", "野餐"]
          },
          {
            id: "",
            time: "18:00",
            title: "BHC炸鸡",
            desc: "汉江炸鸡 1h",
            lat: 37.5268,
            lng: 126.932,
            category: "美食",
            intro: "汉江边叫外卖炸鸡是首尔人的仪式感，蜂蜜黄油味是人气第一",
            rating: 4.5,
            price: "₩19000",
            tags: ["炸鸡", "汉江必做"]
          }
        ]
      },
      {
        label: "Day 4",
        route: "江南 · 免税购物",
        spots: [
          {
            id: "",
            time: "10:00",
            title: "COEX MALL",
            desc: "逛街 2h",
            lat: 37.5116,
            lng: 127.0592,
            category: "购物",
            intro: "亚洲最大的地下商场，星空图书馆的巨型书架墙是社交媒体打卡热门",
            rating: 4.4,
            tags: ["商场", "图书馆"]
          },
          {
            id: "",
            time: "12:30",
            title: "松亭排骨",
            desc: "午餐 1h",
            lat: 37.5098,
            lng: 127.0578,
            category: "美食",
            intro: "江南老字号酱牛排骨，腌制48小时的牛肋排入口软嫩，酱香浓郁",
            rating: 4.6,
            price: "₩35000",
            tags: ["牛排骨", "老字号"]
          },
          {
            id: "",
            time: "14:30",
            title: "乐天世界塔",
            desc: "观光 1.5h",
            lat: 37.5126,
            lng: 127.1026,
            category: "景点",
            intro: "555米高的韩国第一高楼，顶层SEOUL SKY观景台有透明玻璃地板，可俯瞰整个首尔",
            rating: 4.7,
            price: "₩29000",
            tags: ["摩天楼", "观景台"]
          },
          {
            id: "",
            time: "17:00",
            title: "新罗免税店",
            desc: "购物 2h",
            lat: 37.5577,
            lng: 127.0052,
            category: "购物",
            intro: "韩国最顶级免税店，韩妆和大牌价格优势明显，离境前最后扫货站",
            rating: 4.3,
            tags: ["免税", "韩妆"]
          }
        ]
      }
    ]
  },
  {
    key: "bangkok",
    name: "曼谷",
    cover: "thailand",
    date: "2026.07.01 — 07.04",
    defaultDays: 4,
    aliases: ["曼谷", "bangkok", "泰国", "大皇宫", "暹罗"],
    days: [
      {
        label: "Day 1",
        route: "大皇宫 · 湄南河",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "大皇宫",
            desc: "游览 2h",
            lat: 13.75,
            lng: 100.4913,
            category: "景点",
            intro: "泰国最神圣的地标，玉佛寺内供奉翡翠佛像，建筑群金碧辉煌令人叹为观止",
            rating: 4.7,
            price: "฿500",
            tags: ["皇宫", "必去"]
          },
          {
            id: "",
            time: "11:30",
            title: "Pad Thai Thip Samai",
            desc: "午餐",
            lat: 13.7527,
            lng: 100.5045,
            category: "美食",
            intro: "曼谷最有名的Pad Thai店，鸡蛋包裹的炒河粉配虾仁，70年不变的味道",
            rating: 4.6,
            price: "฿100",
            tags: ["泰式炒粉", "老字号"]
          },
          {
            id: "",
            time: "13:30",
            title: "郑王庙",
            desc: "拍日落 1.5h",
            lat: 13.7437,
            lng: 100.4889,
            category: "景点",
            intro: "湄南河西岸的陶瓷塔寺，攀登82米主塔可俯瞰河景，日落时分最壮观",
            rating: 4.6,
            tags: ["日落", "寺庙"]
          },
          {
            id: "",
            time: "17:00",
            title: "Sala Rattanakosin",
            desc: "河畔晚餐 1.5h",
            lat: 13.7464,
            lng: 100.4893,
            category: "美食",
            intro: "正对郑王庙的顶楼餐厅，边品创意泰菜边看寺庙在夕阳中渐变为金色",
            rating: 4.5,
            price: "฿800",
            tags: ["河景", "创意泰菜"]
          },
          {
            id: "",
            time: "19:00",
            title: "华昌遗产酒店",
            desc: "入住",
            lat: 13.7411,
            lng: 100.5064,
            category: "住宿",
            intro: "唐人街百年建筑改造的精品酒店，泳池在天台可看寺庙尖塔，设计感满分",
            rating: 4.6,
            price: "฿3000/晚",
            tags: ["精品酒店", "唐人街"]
          }
        ]
      },
      {
        label: "Day 2",
        route: "暹罗商圈 · 恰图恰",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "恰图恰周末市场",
            desc: "逛市集 2.5h",
            lat: 13.7997,
            lng: 100.5502,
            category: "购物",
            intro: "东南亚最大露天市场，15000个摊位分27个区域，从椰壳灯到设计师品牌应有尽有",
            rating: 4.4,
            tags: ["市场", "淘宝"]
          },
          {
            id: "",
            time: "12:00",
            title: "暹罗商圈",
            desc: "购物午餐 3h",
            lat: 13.7467,
            lng: 100.5348,
            category: "购物",
            intro: "Siam Paragon、Central World等大型商场集群，空调购物天堂",
            rating: 4.3,
            tags: ["商场", "空调"]
          },
          {
            id: "",
            time: "16:00",
            title: "Mango Tango",
            desc: "甜品",
            lat: 13.7459,
            lng: 100.5349,
            category: "美食",
            intro: "曼谷芒果糯米饭网红店，新鲜芒果配椰浆糯米饭是泰国甜品之王",
            rating: 4.3,
            price: "฿180",
            tags: ["芒果糯米饭", "甜品"]
          },
          {
            id: "",
            time: "18:00",
            title: "Nana 夜市",
            desc: "夜市小吃 2h",
            lat: 13.7405,
            lng: 100.5064,
            category: "美食",
            intro: "本地人最爱的街头美食聚集地，烤猪颈肉、青木瓜沙拉和泰式奶茶",
            rating: 4.4,
            tags: ["夜市", "街头美食"]
          }
        ]
      }
    ]
  },
  {
    key: "paris",
    name: "巴黎",
    cover: "france",
    date: "2026.09.12 — 09.15",
    defaultDays: 4,
    aliases: ["巴黎", "paris", "埃菲尔", "卢浮宫", "塞纳"],
    days: [
      {
        label: "Day 1",
        route: "卢浮宫 · 塞纳河",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "卢浮宫",
            desc: "重点展厅 3h",
            lat: 48.8606,
            lng: 2.3376,
            category: "景点",
            intro: "世界四大博物馆之首，蒙娜丽莎、胜利女神、断臂维纳斯三大镇馆之宝必看",
            rating: 4.9,
            price: "€17",
            tags: ["博物馆", "必去"]
          },
          {
            id: "",
            time: "12:30",
            title: "Café Marly",
            desc: "午餐 1h",
            lat: 48.8615,
            lng: 2.3361,
            category: "美食",
            intro: "卢浮宫拱廊下的经典咖啡馆，坐在露台上一边用餐一边看贝聿铭的玻璃金字塔",
            rating: 4.4,
            price: "€30",
            tags: ["露台", "景观"]
          },
          {
            id: "",
            time: "14:30",
            title: "塞纳河左岸",
            desc: "散步 1.5h",
            lat: 48.8566,
            lng: 2.3522,
            category: "景点",
            intro: "从卢浮宫沿河漫步至圣日耳曼，沿途经过莎士比亚书店、圣母院和旧书摊",
            rating: 4.6,
            tags: ["散步", "左岸"]
          },
          {
            id: "",
            time: "17:00",
            title: "花神咖啡馆",
            desc: "下午茶 1h",
            lat: 48.8541,
            lng: 2.3325,
            category: "美食",
            intro: "存在主义的摇篮，萨特和波伏瓦的御用咖啡馆，点一杯热巧克力感受文学氛围",
            rating: 4.5,
            price: "€15",
            tags: ["文学", "历史咖啡馆"]
          },
          {
            id: "",
            time: "19:00",
            title: "Le Cinq",
            desc: "法餐晚宴 2h",
            lat: 48.8696,
            lng: 2.3014,
            category: "美食",
            intro: "四季酒店内的米其林三星餐厅，经典法式料理的极致演绎",
            rating: 4.8,
            price: "€200",
            tags: ["米其林三星", "法餐"]
          },
          {
            id: "",
            time: "21:30",
            title: "巴黎四季酒店",
            desc: "入住",
            lat: 48.8696,
            lng: 2.3014,
            category: "住宿",
            intro: "香榭丽舍大道旁的宫殿级酒店，奥斯曼风格建筑内是极致奢华与舒适",
            rating: 4.9,
            price: "€800/晚",
            tags: ["宫殿酒店", "香榭丽舍"]
          }
        ]
      },
      {
        label: "Day 2",
        route: "埃菲尔铁塔 · 蒙马特",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "埃菲尔铁塔",
            desc: "登塔观光 2h",
            lat: 48.8584,
            lng: 2.2945,
            category: "景点",
            intro: "巴黎永恒的象征，324米高的铁塔二层观景台视野最佳，夜间整点闪灯5分钟",
            rating: 4.8,
            price: "€26",
            tags: ["地标", "必去"]
          },
          {
            id: "",
            time: "12:00",
            title: "Café de l'Homme",
            desc: "午餐 1h",
            lat: 48.8622,
            lng: 2.2877,
            category: "美食",
            intro: "夏约宫内正对铁塔的餐厅，露台是拍摄铁塔最佳角度之一",
            rating: 4.4,
            price: "€35",
            tags: ["铁塔景观", "露台"]
          },
          {
            id: "",
            time: "14:00",
            title: "蒙马特高地",
            desc: "散步 2h",
            lat: 48.8867,
            lng: 2.3431,
            category: "景点",
            intro: "巴黎最浪漫的山丘，圣心堂前的台阶可俯瞰全城，小丘广场有画家现场作画",
            rating: 4.7,
            tags: ["浪漫", "艺术"]
          },
          {
            id: "",
            time: "17:00",
            title: "玛黑区",
            desc: "逛街 2h",
            lat: 48.859,
            lng: 2.362,
            category: "购物",
            intro: "巴黎最潮的街区，独立买手店、vintage店和画廊密布在中世纪的窄巷中",
            rating: 4.5,
            tags: ["潮流", "vintage"]
          },
          {
            id: "",
            time: "19:30",
            title: "Breizh Café",
            desc: "晚餐 1h",
            lat: 48.8597,
            lng: 2.3607,
            category: "美食",
            intro: "巴黎最佳可丽饼店，荞麦饼皮配各种精选食材，是法式街头美食的升级版",
            rating: 4.5,
            price: "€18",
            tags: ["可丽饼", "玛黑区"]
          }
        ]
      }
    ]
  },
  {
    key: "usaNyc",
    name: "纽约",
    cover: "map",
    date: "2026.07.01 — 07.03",
    defaultDays: 3,
    aliases: ["纽约", "new york", "nyc", "曼哈顿"],
    days: [
      {
        label: "Day 1",
        route: "曼哈顿中城",
        spots: [
          { id: "", time: "09:00", title: "中央公园", desc: "漫步 2h", lat: 40.7829, lng: -73.9654, category: "景点", intro: "843英亩城市绿肺，可租船游湖或参观动物园", rating: 4.8, tags: ["公园", "必去"] },
          { id: "", time: "11:15", title: "Levain Bakery Upper West Side", desc: "咖啡甜点 45min", lat: 40.7799, lng: -73.9803, category: "美食", intro: "纽约人气曲奇店，适合作为博物馆前的轻补给", rating: 4.6, tags: ["甜点", "咖啡"] },
          { id: "", time: "12:00", title: "大都会艺术博物馆", desc: "参观 2.5h", lat: 40.7794, lng: -73.9632, category: "景点", intro: "世界顶尖艺术博物馆之一，馆藏跨越五千年", rating: 4.9, price: "$30", tags: ["博物馆"] },
          { id: "", time: "14:45", title: "The Shops at Columbus Circle", desc: "购物休息 1h", lat: 40.7686, lng: -73.983, category: "购物", intro: "中央公园南侧的综合商场，餐饮、精品店和室内休息点集中", rating: 4.4, tags: ["购物", "休息"] },
          { id: "", time: "15:30", title: "时报广场", desc: "打卡 45min", lat: 40.758, lng: -73.9855, category: "景点", intro: "霓虹闪烁的世界十字路口，百老汇剧院区核心", rating: 4.5, tags: ["地标"] },
          { id: "", time: "17:30", title: "帝国大厦观景台", desc: "登顶 1h", lat: 40.7484, lng: -73.9857, category: "景点", intro: "经典 Art Deco 摩天楼，86层室外观景台俯瞰曼哈顿", rating: 4.7, price: "$44", tags: ["观景"] },
          { id: "", time: "20:30", title: "The Plaza Hotel", desc: "入住建议", lat: 40.7645, lng: -73.9745, category: "住宿", intro: "中央公园南侧经典酒店，适合高预算或作为同区域住宿参考", rating: 4.6, tags: ["酒店", "中城"] }
        ]
      },
      {
        label: "Day 2",
        route: "下城 · 布鲁克林",
        spots: [
          { id: "", time: "09:00", title: "自由女神环岛游船", desc: "游船 1.5h", lat: 40.6892, lng: -74.0445, category: "景点", intro: "从海上观赏自由女神与曼哈顿天际线", rating: 4.6, price: "$24", tags: ["游船"] },
          { id: "", time: "11:30", title: "9/11 纪念博物馆", desc: "参观 2h", lat: 40.7115, lng: -74.0132, category: "景点", intro: "在原世贸遗址缅怀与了解当代纽约史", rating: 4.8, price: "$33", tags: ["纪念馆"] },
          { id: "", time: "13:45", title: "Katz's Delicatessen", desc: "午餐 1h", lat: 40.7223, lng: -73.9874, category: "美食", intro: "纽约经典熟牛肉三明治老店，适合下城到布鲁克林前补给", rating: 4.5, tags: ["熟食店", "午餐"] },
          { id: "", time: "14:30", title: "布鲁克林大桥", desc: "步行 1h", lat: 40.7061, lng: -73.9969, category: "景点", intro: "百年悬索桥，漫步至布鲁克林看华尔街天际线", rating: 4.7, tags: ["步行"] },
          { id: "", time: "16:00", title: "Brookfield Place", desc: "购物咖啡 1h", lat: 40.7127, lng: -74.0159, category: "购物", intro: "世贸中心旁高品质购物餐饮空间，适合雨天或换乘休息", rating: 4.5, tags: ["购物", "餐饮"] },
          { id: "", time: "19:00", title: "布鲁克林 Dumbo", desc: "夜景 1h", lat: 40.7033, lng: -73.9881, category: "景点", intro: "鹅卵石街巷与曼哈顿大桥经典拍照机位", rating: 4.6, tags: ["夜景"] },
          { id: "", time: "20:30", title: "1 Hotel Brooklyn Bridge", desc: "入住建议", lat: 40.7022, lng: -73.9956, category: "住宿", intro: "布鲁克林桥公园旁酒店，适合想看曼哈顿夜景的住宿区域参考", rating: 4.6, tags: ["酒店", "夜景"] }
        ]
      },
      {
        label: "Day 3",
        route: "西切尔西 · 高线",
        spots: [
          { id: "", time: "09:30", title: "高线公园", desc: "漫步 1.5h", lat: 40.748, lng: -74.0048, category: "景点", intro: "废弃高架铁路改建的空中花园", rating: 4.7, tags: ["城市设计"] },
          { id: "", time: "11:30", title: "切尔西市场", desc: "午餐 1h", lat: 40.7424, lng: -74.0061, category: "美食", intro: "文创工业风美食大厅，龙虾卷与甜点云集", rating: 4.5, tags: ["美食集市"] },
          { id: "", time: "13:00", title: "Little Island", desc: "海滨休闲 1h", lat: 40.742, lng: -74.0101, category: "休闲", intro: "哈德逊河上人工岛公园，适合短休、看河景和拍城市景观", rating: 4.6, tags: ["公园", "休闲"] },
          { id: "", time: "14:00", title: "Vessel 地标区", desc: "拍照 45min", lat: 40.7713, lng: -74.0029, category: "景点", intro: "哈德逊广场一带的现代建筑集群", rating: 4.3, tags: ["建筑"] },
          { id: "", time: "15:00", title: "The Shops & Restaurants at Hudson Yards", desc: "购物 1.5h", lat: 40.7538, lng: -74.001, category: "购物", intro: "高线北端的大型商业综合体，适合安排购物和咖啡休息", rating: 4.4, tags: ["购物", "餐饮"] },
          { id: "", time: "16:00", title: "无畏号海空博物馆", desc: "参观 1.5h", lat: 40.7645, lng: -73.9996, category: "景点", intro: "航母改建博物馆，适家庭与军事迷", rating: 4.5, price: "$33", tags: ["博物馆"] },
          { id: "", time: "20:00", title: "Moxy NYC Chelsea", desc: "入住建议", lat: 40.7462, lng: -73.9899, category: "住宿", intro: "切尔西花区附近的设计酒店，方便连接高线、公园和中城", rating: 4.4, tags: ["酒店", "切尔西"] }
        ]
      }
    ]
  },
  {
    key: "usaLa",
    name: "洛杉矶",
    cover: "map",
    date: "2026.08.05 — 08.07",
    defaultDays: 3,
    aliases: ["洛杉矶", "la", "好莱坞", "圣塔莫尼卡"],
    days: [
      {
        label: "Day 1",
        route: "好莱坞 · 格里菲斯",
        spots: [
          { id: "", time: "09:00", title: "好莱坞星光大道", desc: "游览 1h", lat: 34.1016, lng: -118.3267, category: "景点", intro: "星形奖章镶嵌的人行道，毗邻中国戏院", rating: 4.3, tags: ["地标"] },
          { id: "", time: "10:15", title: "Musso & Frank Grill", desc: "经典早午餐 1h", lat: 34.1019, lng: -118.3352, category: "美食", intro: "好莱坞百年餐厅，适合安排电影黄金年代主题用餐", rating: 4.6, tags: ["经典餐厅"] },
          { id: "", time: "10:30", title: "格里菲斯天文台", desc: "参观 1.5h", lat: 34.1184, lng: -118.3004, category: "景点", intro: "俯瞰洛杉矶与好莱坞标志的经典观景点", rating: 4.8, tags: ["观景", "免费"] },
          { id: "", time: "13:00", title: "中央市场 Grand Central Market", desc: "午餐 1h", lat: 34.0505, lng: -118.2488, category: "美食", intro: "百年市集，墨西哥塔可与精品咖啡", rating: 4.4, tags: ["市集"] },
          { id: "", time: "15:00", title: "华特迪士尼音乐厅", desc: "外观 30min", lat: 34.0553, lng: -118.2496, category: "景点", intro: "弗兰克·盖里设计的银色波浪屋顶", rating: 4.6, tags: ["建筑"] },
          { id: "", time: "17:00", title: "The Last Bookstore", desc: "书店休闲 1h", lat: 34.0478, lng: -118.2497, category: "休闲", intro: "洛杉矶标志性独立书店，二手书拱门和艺术空间适合慢逛", rating: 4.6, tags: ["书店", "休闲"] },
          { id: "", time: "20:30", title: "The Hollywood Roosevelt", desc: "入住建议", lat: 34.1017, lng: -118.3417, category: "住宿", intro: "星光大道旁历史酒店，适合好莱坞主题路线住宿参考", rating: 4.4, tags: ["酒店", "好莱坞"] }
        ]
      },
      {
        label: "Day 2",
        route: "影城 · 海滩",
        spots: [
          { id: "", time: "09:00", title: "好莱坞环球影城", desc: "畅玩 5h", lat: 34.1381, lng: -118.3534, category: "景点", intro: "片场之旅与哈利波特魔法世界", rating: 4.7, price: "$109+", tags: ["主题公园"] },
          { id: "", time: "14:15", title: "Universal CityWalk Hollywood", desc: "购物用餐 1.5h", lat: 34.1369, lng: -118.3534, category: "购物", intro: "环球影城旁餐饮娱乐步行街，适合主题公园后补给", rating: 4.5, tags: ["购物", "餐饮"] },
          { id: "", time: "15:30", title: "威尼斯海滩", desc: "散步 2h", lat: 33.985, lng: -118.4695, category: "景点", intro: "加州波西米亚海滨，滑板公园与街头艺人", rating: 4.5, tags: ["海滩"] },
          { id: "", time: "18:30", title: "Gjelina Venice", desc: "晚餐 1.5h", lat: 33.9906, lng: -118.4647, category: "美食", intro: "Abbot Kinney 附近高人气加州料理餐厅，适合海滩日落后用餐", rating: 4.4, tags: ["晚餐"] },
          { id: "", time: "20:30", title: "Shutters on the Beach", desc: "入住建议", lat: 34.0078, lng: -118.4918, category: "住宿", intro: "圣塔莫尼卡海边酒店，适合西区海滩线住宿参考", rating: 4.5, tags: ["酒店", "海景"] }
        ]
      },
      {
        label: "Day 3",
        route: "圣塔莫尼卡 · 西岸艺术",
        spots: [
          { id: "", time: "09:00", title: "圣塔莫尼卡码头", desc: "游览 1.5h", lat: 34.0101, lng: -118.4963, category: "景点", intro: "66号公路终点、摩天轮与太平洋日落", rating: 4.7, tags: ["海滩", "日落"] },
          { id: "", time: "11:30", title: "第三步行街", desc: "购物午餐 2h", lat: 34.0164, lng: -118.5011, category: "购物", intro: "步行商业街，街头表演与露天咖啡", rating: 4.4, tags: ["购物"] },
          { id: "", time: "13:30", title: "Rodeo Drive", desc: "精品购物 1h", lat: 34.0679, lng: -118.4004, category: "购物", intro: "比弗利山庄奢侈品街区，适合橱窗购物和城市漫步", rating: 4.4, tags: ["购物", "比弗利"] },
          { id: "", time: "14:30", title: "盖蒂中心", desc: "参观 2.5h", lat: 34.078, lng: -118.4741, category: "景点", intro: "山顶美术馆与花园，馆藏从古典到印象派", rating: 4.8, price: "免费", tags: ["美术馆"] },
          { id: "", time: "18:00", title: "The Grove", desc: "休闲晚餐 2h", lat: 34.072, lng: -118.357, category: "休闲", intro: "户外商业街区，喷泉、影院、餐厅和 Farmers Market 相连", rating: 4.6, tags: ["休闲", "晚餐"] }
        ]
      }
    ]
  },
  {
    key: "usaPch",
    name: "加州一号公路",
    cover: "map",
    date: "2026.09.01 — 09.07",
    defaultDays: 7,
    aliases: ["一号公路", "pch", "big sur", "加州自驾", "旧金山", "洛杉矶"],
    days: [
      {
        label: "Day 1",
        route: "旧金山",
        spots: [
          { id: "", time: "09:00", title: "金门大桥观景点", desc: "拍照 1h", lat: 37.8199, lng: -122.4783, category: "景点", intro: "Battery Spencer 经典机位看橙红大桥与海湾", rating: 4.9, tags: ["地标"] },
          { id: "", time: "11:00", title: "渔人码头 Pier 39", desc: "游览 1.5h", lat: 37.8087, lng: -122.4098, category: "景点", intro: "海狮聚集区与海鲜餐厅", rating: 4.4, tags: ["海滨"] },
          { id: "", time: "12:30", title: "Ferry Building Marketplace", desc: "午餐购物 1.5h", lat: 37.7955, lng: -122.3937, category: "美食", intro: "旧金山海湾边美食市场，适合采购公路旅行零食和咖啡", rating: 4.6, tags: ["美食", "市场"] },
          { id: "", time: "13:30", title: "九曲花街", desc: "行车/步行 30min", lat: 37.8021, lng: -122.4187, category: "景点", intro: "伦巴底街急弯与花坛", rating: 4.3, tags: ["拍照"] },
          { id: "", time: "15:00", title: "中国城", desc: "闲逛 1.5h", lat: 37.7941, lng: -122.4078, category: "景点", intro: "北美最古老唐人街之一，点心与中药铺", rating: 4.5, tags: ["街区"] },
          { id: "", time: "20:00", title: "Fairmont San Francisco", desc: "入住建议", lat: 37.7924, lng: -122.4104, category: "住宿", intro: "诺布山经典酒店，适合作为旧金山首晚住宿区域参考", rating: 4.5, tags: ["酒店"] }
        ]
      },
      {
        label: "Day 2",
        route: "半岛海岸",
        spots: [
          { id: "", time: "10:00", title: "半月湾州立海滩", desc: "海岸散步 1h", lat: 37.4636, lng: -122.4459, category: "景点", intro: "崎岖崖岸与常绿的北加海景", rating: 4.6, tags: ["海岸"] },
          { id: "", time: "11:30", title: "Sam's Chowder House", desc: "海鲜午餐 1h", lat: 37.5023, lng: -122.4725, category: "美食", intro: "半月湾海边海鲜餐厅，龙虾卷和海景座位适合公路休息", rating: 4.4, tags: ["海鲜"] },
          { id: "", time: "12:30", title: "圣克鲁兹海滨", desc: "午餐散步 2h", lat: 36.9741, lng: -122.0308, category: "景点", intro: "复古码头与小型游乐场", rating: 4.4, tags: ["小镇"] },
          { id: "", time: "16:00", title: "Santa Cruz Beach Boardwalk", desc: "海边休闲 1.5h", lat: 36.9641, lng: -122.025, category: "休闲", intro: "复古海滨游乐场，适合作为自驾中段轻松停留", rating: 4.5, tags: ["游乐场", "海滨"] }
        ]
      },
      {
        label: "Day 3",
        route: "蒙特雷 · 17英里",
        spots: [
          { id: "", time: "09:00", title: "蒙特雷老渔人码头", desc: "游览 1h", lat: 36.6047, lng: -121.8915, category: "景点", intro: "观鲸出发地与海滨步道起点", rating: 4.5, tags: ["海滨"] },
          { id: "", time: "11:00", title: "17英里风景线", desc: "自驾 2h", lat: 36.5688, lng: -121.9485, category: "景点", intro: "私人收费景观公路，孤柏与高尔夫球场海景", rating: 4.8, price: "$12", tags: ["自驾"] },
          { id: "", time: "15:00", title: "卡梅尔小镇", desc: "逛街 2h", lat: 36.5552, lng: -121.9233, category: "购物", intro: "童话风格滨海艺术村", rating: 4.7, tags: ["小镇"] },
          { id: "", time: "20:00", title: "Monterey Plaza Hotel & Spa", desc: "入住建议", lat: 36.6124, lng: -121.8996, category: "住宿", intro: "蒙特雷海边酒店，方便连接罐头厂街和次日大瑟尔", rating: 4.6, tags: ["酒店", "海景"] }
        ]
      },
      {
        label: "Day 4",
        route: "大瑟尔",
        spots: [
          { id: "", time: "09:00", title: "比克斯比溪拱桥", desc: "观景 30min", lat: 36.3715, lng: -121.9016, category: "景点", intro: "一号公路明信片级海湾拱桥", rating: 4.9, tags: ["必拍"] },
          { id: "", time: "11:00", title: "麦克维瀑布湾", desc: "步道 1h", lat: 36.1598, lng: -121.6721, category: "景点", intro: "岸坠小瀑入沙滩的稀有景观（潮汐时注意）", rating: 4.7, tags: ["自然"] },
          { id: "", time: "12:30", title: "Nepenthe Big Sur", desc: "悬崖午餐 1.5h", lat: 36.2288, lng: -121.761, category: "美食", intro: "大瑟尔经典海景餐厅，适合把午餐和观景合并安排", rating: 4.5, tags: ["海景餐厅"] },
          { id: "", time: "14:00", title: "菲佛大瑟尔州立公园", desc: "徒步 2h", lat: 36.2471, lng: -121.7711, category: "景点", intro: "红杉峡谷与海岸峭壁徒步", rating: 4.8, tags: ["徒步"] },
          { id: "", time: "19:30", title: "Big Sur River Inn", desc: "入住建议", lat: 36.2699, lng: -121.8086, category: "住宿", intro: "大瑟尔区域经典旅宿，适合拆分长途驾驶并保留自然体验", rating: 4.3, tags: ["旅宿"] }
        ]
      },
      {
        label: "Day 5",
        route: "圣西米恩 · 莫罗贝",
        spots: [
          { id: "", time: "10:00", title: "赫氏古堡", desc: "参观 2.5h", lat: 35.6842, lng: -121.1763, category: "景点", intro: "媒体大亨山顶庄园，奢华建筑与典藏", rating: 4.7, price: "$30+", tags: ["建筑"] },
          { id: "", time: "14:00", title: "莫罗湾巨岩", desc: "海滨 1.5h", lat: 35.3658, lng: -120.865, category: "景点", intro: "海湾中孤矗火山栓与海獭观赏", rating: 4.6, tags: ["海岸"] },
          { id: "", time: "18:30", title: "Madonna Inn", desc: "入住建议", lat: 35.2644, lng: -120.675, category: "住宿", intro: "圣路易斯-奥比斯波标志性主题酒店，适合自驾路线中途体验", rating: 4.4, tags: ["酒店", "主题"] }
        ]
      },
      {
        label: "Day 6",
        route: "圣巴巴拉 · 丹麦村",
        spots: [
          { id: "", time: "10:00", title: "圣巴巴拉教会", desc: "参观 1h", lat: 34.4378, lng: -119.7139, category: "景点", intro: "粉白西班牙殖民复兴风格地标", rating: 4.6, tags: ["建筑"] },
          { id: "", time: "12:00", title: "斯特恩斯码头", desc: "午餐 1.5h", lat: 34.4083, lng: -119.6853, category: "景点", intro: "西海岸最长木码头之一", rating: 4.4, tags: ["海滨"] },
          { id: "", time: "13:45", title: "Santa Barbara Funk Zone", desc: "酒庄街区 1.5h", lat: 34.414, lng: -119.6916, category: "休闲", intro: "酒吧、画廊和小店聚集的步行街区，适合下午慢逛", rating: 4.5, tags: ["酒庄", "街区"] },
          { id: "", time: "15:00", title: "索尔万丹麦村", desc: "闲逛 2h", lat: 34.5958, lng: -120.1376, category: "景点", intro: "风车与北欧风小店", rating: 4.5, tags: ["小镇"] }
        ]
      },
      {
        label: "Day 7",
        route: "马利布 · 洛杉矶",
        spots: [
          { id: "", time: "10:00", title: "马利布溪州立公园", desc: "海景公路 1h", lat: 34.0824, lng: -118.7348, category: "景点", intro: "山海交错的西海岸尾声路段", rating: 4.5, tags: ["自驾"] },
          { id: "", time: "11:30", title: "Malibu Country Mart", desc: "购物咖啡 1h", lat: 34.0358, lng: -118.6861, category: "购物", intro: "马利布户外购物街区，适合海岸线收尾前休整", rating: 4.3, tags: ["购物", "咖啡"] },
          { id: "", time: "13:00", title: "盖蒂别墅博物馆", desc: "参观 2h", lat: 34.0459, lng: -118.5648, category: "景点", intro: "仿庞贝别 Villa，古希腊罗马艺术", rating: 4.7, price: "免费需预约", tags: ["博物馆"] },
          { id: "", time: "17:00", title: "圣塔莫尼卡码头", desc: "日落 1.5h", lat: 34.0101, lng: -118.4963, category: "景点", intro: "为一号公路南下画上太平洋落日句号", rating: 4.8, tags: ["日落"] }
        ]
      }
    ]
  },
  {
    key: "usaYellowstone",
    name: "黄石",
    cover: "map",
    date: "2026.06.10 — 06.14",
    defaultDays: 5,
    aliases: ["黄石", "yellowstone", "大提顿"],
    days: [
      {
        label: "Day 1",
        route: "老忠实 · 老忠实区",
        spots: [
          { id: "", time: "09:00", title: "老忠实间歇泉", desc: "喷发观赏 2h", lat: 44.4605, lng: -110.8281, category: "景点", intro: "约90分钟一次的壮观热泉喷发", rating: 4.9, tags: ["必去"] },
          { id: "", time: "11:30", title: "Old Faithful Inn Dining Room", desc: "午餐 1h", lat: 44.4599, lng: -110.8312, category: "美食", intro: "老忠实区经典木屋餐厅，适合把喷泉等待时间和用餐结合", rating: 4.3, tags: ["餐厅"] },
          { id: "", time: "12:00", title: "中途间歇泉盆地", desc: "栈道徒步 1.5h", lat: 44.5268, lng: -110.8361, category: "景点", intro: "色彩缤纷的温泉与喷气孔", rating: 4.8, tags: ["地热"] },
          { id: "", time: "15:00", title: "大棱镜温泉观景台", desc: "徒步观景 2h", lat: 44.5253, lng: -110.8383, category: "景点", intro: "公园最大热泉，蓝心彩色菌毯边缘", rating: 4.9, tags: ["摄影"] },
          { id: "", time: "19:30", title: "Old Faithful Inn", desc: "入住建议", lat: 44.4599, lng: -110.8312, category: "住宿", intro: "国家公园历史木屋旅宿，适合作为老忠实区域住宿参考", rating: 4.5, tags: ["酒店", "公园内"] }
        ]
      },
      {
        label: "Day 2",
        route: "黄石大峡谷",
        spots: [
          { id: "", time: "09:00", title: "Artist Point 观景点", desc: "峡谷观景 1h", lat: 44.8338, lng: -110.4906, category: "景点", intro: "俯瞰黄石下瀑布染色岩壁", rating: 4.9, tags: ["峡谷"] },
          { id: "", time: "11:30", title: "黄石下瀑布观景台", desc: "步道 1.5h", lat: 44.8991, lng: -110.3922, category: "景点", intro: "近距离感受308英尺瀑布雷鸣", rating: 4.8, tags: ["瀑布"] },
          { id: "", time: "13:30", title: "Canyon Village General Store", desc: "午餐补给 1h", lat: 44.7352, lng: -110.487, category: "购物", intro: "峡谷村补给点，适合购买饮水、简餐和公园纪念品", rating: 4.2, tags: ["补给", "购物"] },
          { id: "", time: "19:30", title: "Canyon Lodge & Cabins", desc: "入住建议", lat: 44.735, lng: -110.489, category: "住宿", intro: "峡谷区域大型旅宿，适合连接峡谷、湖区和拉马尔山谷", rating: 4.2, tags: ["住宿"] }
        ]
      },
      {
        label: "Day 3",
        route: "黄石湖 · 钓鱼桥",
        spots: [
          { id: "", time: "09:00", title: "西拇指间歇泉盆地", desc: "栈道 1h", lat: 44.4175, lng: -110.5746, category: "景点", intro: "湖边热泉与清澈湖水相接", rating: 4.7, tags: ["地热"] },
          { id: "", time: "11:00", title: "黄石湖游船出发点", desc: "湖景 1.5h", lat: 44.5439, lng: -110.4014, category: "景点", intro: "北美高海拔大湖之一", rating: 4.6, tags: ["湖泊"] },
          { id: "", time: "13:00", title: "Lake Yellowstone Hotel Dining Room", desc: "湖畔午餐 1h", lat: 44.5499, lng: -110.4003, category: "美食", intro: "黄石湖畔历史酒店餐厅，适合湖区路线中段休息", rating: 4.3, tags: ["餐厅", "湖景"] },
          { id: "", time: "16:00", title: "Lake Lodge Gift Shop", desc: "购物休闲 45min", lat: 44.55, lng: -110.3976, category: "购物", intro: "湖区纪念品和补给点，适合采购明信片和户外小物", rating: 4.2, tags: ["纪念品"] }
        ]
      },
      {
        label: "Day 4",
        route: "拉马尔山谷",
        spots: [
          { id: "", time: "06:30", title: "拉马尔山谷野生动物观测", desc: "清晨 3h", lat: 44.805, lng: -110.1714, category: "景点", intro: "狼群与野牛高频出没的开阔河谷", rating: 4.9, tags: ["野生动物"] },
          { id: "", time: "10:00", title: "Roosevelt Lodge Dining Room", desc: "早午餐 1h", lat: 44.9121, lng: -110.4163, category: "美食", intro: "拉马尔山谷和峡谷之间的公园餐厅，适合作为清晨观兽后补给", rating: 4.3, tags: ["餐厅"] },
          { id: "", time: "11:00", title: "猛犸热阶", desc: "徒步 2h", lat: 44.9765, lng: -110.7015, category: "景点", intro: "奶油色石灰华梯田温泉", rating: 4.7, tags: ["地热"] },
          { id: "", time: "15:00", title: "Mammoth Hot Springs Terrace Grill", desc: "休闲用餐 1h", lat: 44.9769, lng: -110.7019, category: "休闲", intro: "猛犸区域轻食和休息点，适合长距离自驾后的放松", rating: 4.1, tags: ["休闲", "补给"] }
        ]
      },
      {
        label: "Day 5",
        route: "诺里斯 ·  outbound",
        spots: [
          { id: "", time: "09:00", title: "诺里斯间歇泉盆地", desc: "栈道 2h", lat: 44.7282, lng: -110.7053, category: "景点", intro: "公园最热最活跃地热区之一", rating: 4.7, tags: ["地热"] },
          { id: "", time: "13:00", title: "饼干盆地", desc: "短徒步 1h", lat: 44.4754, lng: -110.8274, category: "景点", intro: "蓝宝石池与密集喷泉", rating: 4.6, tags: ["地热"] },
          { id: "", time: "15:00", title: "Old Faithful General Store", desc: "购物补给 45min", lat: 44.4607, lng: -110.826, category: "购物", intro: "老忠实区综合商店，适合购买纪念品、补给和返程零食", rating: 4.2, tags: ["购物", "补给"] }
        ]
      }
    ]
  },
  {
    key: "usaHawaii",
    name: "夏威夷",
    cover: "map",
    date: "2026.03.01 — 03.04",
    defaultDays: 4,
    aliases: ["夏威夷", "欧胡岛", "檀香山", "waikiki", "honolulu"],
    days: [
      {
        label: "Day 1",
        route: "威基基",
        spots: [
          { id: "", time: "09:00", title: "钻石头山步道", desc: "登山 2h", lat: 21.2599, lng: -157.8057, category: "景点", intro: "死火山口徒步，俯瞰威基基与太平洋", rating: 4.8, price: "$5", tags: ["徒步"] },
          { id: "", time: "11:30", title: "Leonard's Bakery", desc: "甜点补给 45min", lat: 21.2846, lng: -157.8133, category: "美食", intro: "欧胡岛经典 malasada 甜甜圈店，适合徒步后补充能量", rating: 4.6, tags: ["甜点"] },
          { id: "", time: "13:00", title: "威基基海滩", desc: "浮潜休息 2h", lat: 21.2793, lng: -157.8295, category: "景点", intro: "世界著名新月形沙滩与冲浪启蒙浪", rating: 4.7, tags: ["海滩"] },
          { id: "", time: "15:30", title: "Royal Hawaiian Center", desc: "购物休闲 1.5h", lat: 21.2787, lng: -157.8293, category: "购物", intro: "威基基核心购物中心，适合安排餐饮、纪念品和冷气休息", rating: 4.4, tags: ["购物"] },
          { id: "", time: "20:00", title: "Outrigger Waikiki Beach Resort", desc: "入住建议", lat: 21.2767, lng: -157.8274, category: "住宿", intro: "威基基海滩边酒店，适合作为欧胡岛首晚住宿区域参考", rating: 4.4, tags: ["酒店", "海滩"] }
        ]
      },
      {
        label: "Day 2",
        route: "珍珠港 · 北岸",
        spots: [
          { id: "", time: "08:00", title: "珍珠港 USS 亚利桑那纪念馆", desc: "参观 3h", lat: 21.3649, lng: -157.9501, category: "景点", intro: "二战历史国家纪念地", rating: 4.8, price: "$1", tags: ["历史"] },
          { id: "", time: "12:30", title: "Giovanni's Shrimp Truck", desc: "虾车午餐 1h", lat: 21.5969, lng: -158.1034, category: "美食", intro: "北岸蒜香虾车代表，适合珍珠港后一路北上用餐", rating: 4.4, tags: ["虾车", "午餐"] },
          { id: "", time: "14:00", title: "哈雷瓦北岸小镇", desc: "冲浪文化 2h", lat: 21.5924, lng: -158.1034, category: "景点", intro: "冬浪观赛与虾车美食集散地", rating: 4.6, tags: ["小镇"] },
          { id: "", time: "16:30", title: "Matsumoto Shave Ice", desc: "刨冰休闲 45min", lat: 21.5927, lng: -158.1027, category: "休闲", intro: "北岸经典彩虹刨冰店，适合下午慢节奏停留", rating: 4.5, tags: ["甜品", "休闲"] }
        ]
      },
      {
        label: "Day 3",
        route: "东岸风谷",
        spots: [
          { id: "", time: "09:00", title: "植物园与平等院", desc: "参观 2h", lat: 21.4337, lng: -157.8057, category: "景点", intro: "日式寺院倒映锦鲤池", rating: 4.7, price: "$5", tags: ["文化"] },
          { id: "", time: "12:00", title: "努阿努帕里大风口", desc: "观景 45min", lat: 21.3668, lng: -157.8051, category: "景点", intro: "战役史诗悬崖观景点", rating: 4.6, tags: ["观景"] },
          { id: "", time: "13:30", title: "Kailua Town", desc: "午餐购物 1.5h", lat: 21.3972, lng: -157.7394, category: "购物", intro: "东岸小镇餐饮、冲浪用品和本地小店集中，适合海滩日前补给", rating: 4.4, tags: ["小镇", "购物"] },
          { id: "", time: "15:30", title: "Lanikai Beach", desc: "海滩休闲 1.5h", lat: 21.3926, lng: -157.7153, category: "休闲", intro: "欧胡岛东岸细白沙滩，适合轻松游泳和看 Mokulua 小岛", rating: 4.8, tags: ["海滩", "休闲"] }
        ]
      },
      {
        label: "Day 4",
        route: "科科岬 · 檀香山",
        spots: [
          { id: "", time: "06:00", title: "科科岬铁道徒步", desc: "徒步 3h", lat: 21.2799, lng: -157.6979, category: "景点", intro: "枕木台阶登顶看东岸海岸线", rating: 4.8, tags: ["徒步"] },
          { id: "", time: "11:00", title: "伊奥拉尼王宫", desc: "参观 1.5h", lat: 21.3069, lng: -157.8588, category: "景点", intro: "美国唯一王宫，夏威夷王国历史", rating: 4.5, price: "$25", tags: ["历史"] },
          { id: "", time: "13:00", title: "Helena's Hawaiian Food", desc: "本地午餐 1h", lat: 21.3267, lng: -157.8767, category: "美食", intro: "檀香山本地夏威夷菜代表，适合补上 poi、kalua pig 等传统风味", rating: 4.5, tags: ["本地菜"] },
          { id: "", time: "15:00", title: "Ala Moana Center", desc: "购物 2h", lat: 21.2915, lng: -157.843, category: "购物", intro: "檀香山大型露天购物中心，适合离岛前采购和休息", rating: 4.5, tags: ["购物"] }
        ]
      }
    ]
  },
  ...exploreRegionProfiles
];
function getSeedTrips() {
  return [
    {
      id: "tokyo-5",
      name: "东京5日游",
      date: "2026.05.18 — 05.22",
      cover: "tokyo",
      status: "进行中",
      favorite: true,
      days: buildDays(profiles[0]),
      source: { kind: "text", title: "Routey 示例行程" }
    },
    {
      id: "kyoto-3",
      name: "京都赏樱3日",
      date: "2026.04.03 — 04.05",
      cover: "japan",
      status: "已完成",
      favorite: true,
      days: buildDays(profiles[1]),
      source: { kind: "link", title: "收藏攻略" }
    },
    {
      id: "seoul-4",
      name: "首尔美食之旅",
      date: "2026.06.10 — 06.13",
      cover: "korea",
      status: "草稿",
      favorite: false,
      days: buildDays(profiles[2]),
      source: { kind: "video", title: "短视频灵感" }
    }
  ];
}
function createTripFromImport(payload) {
  const profile = inferProfile(payload.content);
  const days = inferDayCount(payload.content, profile.defaultDays);
  const tripId = `${profile.key}-${days}-${Date.now().toString(36)}`;
  return {
    id: tripId,
    name: `${profile.name}${days}日游`,
    date: profile.date,
    cover: profile.cover,
    status: "草稿",
    favorite: false,
    days: buildDays(profile, days),
    source: {
      kind: payload.kind,
      title: sourceTitle(payload.kind)
    }
  };
}
function optimizeDay(day) {
  if (day.spots.length < 3) return scheduleDay(day);
  const [first, ...rest] = day.spots;
  const ordered = [first];
  const queue = [...rest];
  while (queue.length) {
    const last = ordered[ordered.length - 1];
    const nextIndex = queue.reduce((best, spot, index) => {
      return dist(last, spot) < dist(last, queue[best]) ? index : best;
    }, 0);
    ordered.push(queue.splice(nextIndex, 1)[0]);
  }
  const totalDist = (path) => path.reduce((sum, s, i) => i === 0 ? 0 : sum + dist(path[i - 1], s), 0);
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 1; i < ordered.length - 1; i++) {
      for (let j = i + 1; j < ordered.length; j++) {
        const before = totalDist(ordered);
        const segment = ordered.slice(i, j + 1);
        segment.reverse();
        ordered.splice(i, j - i + 1, ...segment);
        if (totalDist(ordered) < before) {
          improved = true;
        } else {
          segment.reverse();
          ordered.splice(i, j - i + 1, ...segment);
        }
      }
    }
  }
  return scheduleDay({ ...day, spots: ordered, route: routeName(ordered) });
}
function optimizeTrip(trip, dayId) {
  return {
    ...trip,
    days: trip.days.map((day) => !dayId || day.id === dayId ? optimizeDay(day) : day)
  };
}
function inferProfile(content) {
  const lower = content.toLowerCase();
  return profiles.find((p) => p.aliases.some((a) => lower.includes(a.toLowerCase()))) ?? profiles[0];
}
function inferDayCount(content, fallback) {
  const match = content.match(/(\d+)\s*(?:天|日|day|days)/i);
  if (!match) return fallback;
  return Math.min(7, Math.max(1, Number(match[1])));
}
function buildDays(profile, count) {
  let template = [...profile.days];
  if (count && count > template.length) {
    let n = template.length;
    while (template.length < count) {
      n += 1;
      const last = template[template.length - 1];
      template.push({
        ...last,
        label: `Day ${n}`,
        route: `${last.route} · 延伸`,
        spots: last.spots.map((s) => ({ ...s, id: "" }))
      });
    }
  }
  const src = count ? template.slice(0, count) : template;
  return src.map((day, dayIndex) => {
    const rawDay = {
      ...day,
      id: `d${dayIndex + 1}`,
      spots: day.spots.map((spot, spotIndex) => ({
        ...spot,
        id: spot.id || `${profile.key}-d${dayIndex + 1}-s${spotIndex + 1}`
      }))
    };
    return optimizeDay(rawDay);
  });
}
function scheduleDay(day) {
  return {
    ...day,
    route: routeName(day.spots),
    spots: day.spots.map((spot, index) => ({
      ...spot,
      time: times[index] ?? times[times.length - 1]
    }))
  };
}
function routeName(spots) {
  if (spots.length === 0) return "自由探索";
  if (spots.length === 1) return spots[0].title;
  return `${spots[0].title} → ${spots[spots.length - 1].title}`;
}
function dist(a, b) {
  if (!a.lat || !a.lng || !b.lat || !b.lng) return 1;
  return Math.hypot(a.lat - b.lat, a.lng - b.lng);
}
function sourceTitle(kind) {
  return { link: "链接导入", image: "截图导入", text: "文本导入", video: "视频导入" }[kind];
}
const unsplash = (id) => `https://images.unsplash.com/${id}?w=600&h=300&q=80&auto=format&fit=crop`;
const exploreDB = {
  "日本": [
    { id: "ex-jp-1", title: "东京5日经典路线", days: 5, spots: 22, source: "小红书 @东京吃货日记", likes: 12800, cover: unsplash("photo-1540959733332-eab4deabeeaf"), tags: ["经典", "购物", "美食"], profileKey: "tokyo" },
    { id: "ex-jp-2", title: "京都3日深度和风游", days: 3, spots: 15, source: "小红书 @京都和风散步", likes: 9600, cover: unsplash("photo-1493976040374-85c8e12f0c0e"), tags: ["寺庙", "和服", "抹茶"], profileKey: "kyoto" },
    { id: "ex-jp-3", title: "大阪美食2日暴走", days: 2, spots: 12, source: "携程攻略 @关西美食探店", likes: 7200, cover: unsplash("photo-1480796927426-f609979314bd"), tags: ["美食", "道顿堀", "环球影城"], profileKey: "tokyo" },
    { id: "ex-jp-4", title: "北海道4日自然之旅", days: 4, spots: 18, source: "小红书 @北海道旅拍笔记", likes: 5400, cover: unsplash("photo-1578271887552-5ac3a72752bc"), tags: ["自然", "温泉", "雪景"], profileKey: "tokyo" },
    { id: "ex-jp-5", title: "冲绳3日海岛度假", days: 3, spots: 15, source: "马蜂窝 @冲绳海岛玩家", likes: 4100, cover: unsplash("photo-1528360983277-13d401cdc186"), tags: ["海岛", "潜水", "度假"], profileKey: "tokyo" }
  ],
  "韩国": [
    { id: "ex-kr-1", title: "首尔4日潮流之旅", days: 4, spots: 18, source: "小红书 @首尔韩范穿搭", likes: 11200, cover: unsplash("photo-1534274988757-a28bf1a57c17"), tags: ["购物", "美食", "明洞"], profileKey: "seoul" },
    { id: "ex-kr-4", title: "首尔咖啡厅巡礼2日", days: 2, spots: 12, source: "小红书 @首尔咖啡地图", likes: 8400, cover: unsplash("photo-1559496417-e7f25cb247f3"), tags: ["咖啡", "网红店", "弘大"], profileKey: "seoul" },
    { id: "ex-kr-2", title: "济州岛3日环岛游", days: 3, spots: 15, source: "小红书 @济州橘子味", likes: 6800, cover: unsplash("photo-1548115184-bc6544d06a58"), tags: ["自然", "海岛", "徒步"], profileKey: "seoul" }
  ],
  "泰国": [
    { id: "ex-th-1", title: "曼谷2日寺庙美食之旅", days: 2, spots: 12, source: "小红书 @泰好玩", likes: 8900, cover: unsplash("photo-1528181304800-259b08848526"), tags: ["寺庙", "美食", "夜市"], profileKey: "bangkok" },
    { id: "ex-th-2", title: "清迈3日慢生活", days: 3, spots: 15, source: "马蜂窝 @清迈小城", likes: 7200, cover: unsplash("photo-1552465011-b4e21bf6e79a"), tags: ["寺庙", "咖啡", "夜市"], profileKey: "bangkok" },
    { id: "ex-th-4", title: "曼谷购物美食5日深度", days: 5, spots: 22, source: "小红书 @曼谷买手", likes: 6100, cover: unsplash("photo-1563492065599-3520f775eeed"), tags: ["购物", "街头美食", "按摩"], profileKey: "bangkok" },
    { id: "ex-th-3", title: "普吉岛4日海岛游", days: 4, spots: 18, source: "小红书 @海岛度假", likes: 5600, cover: unsplash("photo-1504214208698-ea1916a2195a"), tags: ["海岛", "潜水", "SPA"], profileKey: "bangkok" }
  ],
  "法国": [
    { id: "ex-fr-1", title: "巴黎2日浪漫之旅", days: 2, spots: 12, source: "小红书 @巴黎漫步", likes: 10500, cover: unsplash("photo-1502602898657-3e91760cbb34"), tags: ["浪漫", "博物馆", "美食"], profileKey: "paris" },
    { id: "ex-fr-3", title: "巴黎博物馆深度4日", days: 4, spots: 18, source: "小红书 @艺术旅人", likes: 7800, cover: unsplash("photo-1541264161754-445bbdd7de52"), tags: ["卢浮宫", "奥赛", "蓬皮杜"], profileKey: "paris" },
    { id: "ex-fr-2", title: "南法普罗旺斯3日", days: 3, spots: 15, source: "知乎 @法国深度游", likes: 6300, cover: unsplash("photo-1499856871958-5b9627545d1a"), tags: ["薰衣草", "小镇", "红酒"], profileKey: "paris" }
  ],
  "美国": [
    { id: "ex-us-1", title: "纽约3日城市探索", days: 3, spots: 15, source: "小红书 @NYC攻略", likes: 9200, cover: unsplash("photo-1496442226666-8d4d0e62e6e9"), tags: ["都市", "博物馆", "百老汇"], profileKey: "usaNyc" },
    { id: "ex-us-2", title: "加州1号公路7日自驾", days: 7, spots: 30, source: "马蜂窝 @公路旅行", likes: 7800, cover: unsplash("photo-1449034446853-66c86144b0ad"), tags: ["自驾", "海岸", "国家公园"], profileKey: "usaPch" },
    { id: "ex-us-3", title: "洛杉矶好莱坞3日游", days: 3, spots: 15, source: "小红书 @LA生活", likes: 6500, cover: unsplash("photo-1580655653885-65763b2597d0"), tags: ["好莱坞", "环球影城", "海滩"], profileKey: "usaLa" },
    { id: "ex-us-4", title: "黄石国家公园5日", days: 5, spots: 22, source: "知乎 @户外探险", likes: 5400, cover: unsplash("photo-1472396961693-142e6e269027"), tags: ["国家公园", "自然", "露营"], profileKey: "usaYellowstone" },
    { id: "ex-us-5", title: "夏威夷4日阳光之旅", days: 4, spots: 18, source: "小红书 @夏威夷玩家", likes: 4700, cover: unsplash("photo-1507876466758-bc54f384809c"), tags: ["海滩", "冲浪", "火山"], profileKey: "usaHawaii" }
  ],
  "英国": [
    { id: "ex-uk-1", title: "伦敦3日经典路线", days: 3, spots: 15, source: "小红书 @伦敦生活", likes: 7600, cover: unsplash("photo-1513635269975-59663e0ac1ad"), tags: ["博物馆", "皇家", "下午茶"], profileKey: "tokyo" },
    { id: "ex-uk-4", title: "伦敦哈利波特主题2日", days: 2, spots: 12, source: "小红书 @HP迷", likes: 6900, cover: unsplash("photo-1486299267070-83823f5448dd"), tags: ["哈利波特", "影视", "打卡"], profileKey: "tokyo" },
    { id: "ex-uk-2", title: "苏格兰高地4日自驾", days: 4, spots: 18, source: "马蜂窝 @英国自驾", likes: 5200, cover: unsplash("photo-1529655683826-aba9b3e77383"), tags: ["高地", "城堡", "威士忌"], profileKey: "tokyo" },
    { id: "ex-uk-3", title: "牛津剑桥2日学术游", days: 2, spots: 12, source: "知乎 @英国留学", likes: 4800, cover: unsplash("photo-1526129318478-62ed807ebdf9"), tags: ["大学", "学术", "古镇"], profileKey: "tokyo" }
  ],
  "意大利": [
    { id: "ex-it-1", title: "罗马佛罗伦萨5日", days: 5, spots: 22, source: "小红书 @意大利行", likes: 8100, cover: unsplash("photo-1515859005217-8a1f08870f59"), tags: ["文艺复兴", "美食", "古迹"], profileKey: "tokyo" },
    { id: "ex-it-2", title: "威尼斯2日水城浪漫游", days: 2, spots: 12, source: "小红书 @威尼斯梦", likes: 6400, cover: unsplash("photo-1523906834658-6e24ef2386f9"), tags: ["贡多拉", "面具", "浪漫"], profileKey: "tokyo" },
    { id: "ex-it-3", title: "阿马尔菲海岸3日", days: 3, spots: 15, source: "马蜂窝 @意大利海岸", likes: 5700, cover: unsplash("photo-1534113414509-0eec2bfb493f"), tags: ["海岸", "柠檬", "悬崖"], profileKey: "tokyo" },
    { id: "ex-it-4", title: "米兰时尚购物2日", days: 2, spots: 12, source: "小红书 @时尚买手", likes: 4900, cover: unsplash("photo-1534445867742-43195f401b6c"), tags: ["时尚", "购物", "大教堂"], profileKey: "tokyo" }
  ],
  "澳洲": [
    { id: "ex-au-2", title: "大堡礁3日潜水之旅", days: 3, spots: 15, source: "马蜂窝 @潜水控", likes: 7100, cover: unsplash("photo-1523428096881-5bd79d043006"), tags: ["潜水", "珊瑚", "海洋"], profileKey: "tokyo" },
    { id: "ex-au-1", title: "悉尼墨尔本5日游", days: 5, spots: 22, source: "小红书 @澳洲玩家", likes: 5900, cover: unsplash("photo-1506973035872-a4ec16b8e8d9"), tags: ["歌剧院", "大洋路", "咖啡"], profileKey: "tokyo" },
    { id: "ex-au-3", title: "塔斯马尼亚4日自驾", days: 4, spots: 18, source: "小红书 @塔岛探索", likes: 4300, cover: unsplash("photo-1494233892892-84542a694e72"), tags: ["自然", "自驾", "野生动物"], profileKey: "tokyo" }
  ],
  "摩洛哥": [
    { id: "ex-ma-3", title: "舍夫沙万蓝色小镇2日", days: 2, spots: 12, source: "小红书 @蓝色梦境", likes: 5600, cover: unsplash("photo-1553102674-af685bb5fe40"), tags: ["蓝城", "拍照", "小镇"], profileKey: "tokyo" },
    { id: "ex-ma-1", title: "摩洛哥4日撒哈拉之旅", days: 4, spots: 18, source: "小红书 @非洲探险", likes: 4200, cover: unsplash("photo-1489749798305-4fea3ae63d43"), tags: ["沙漠", "蓝城", "集市"], profileKey: "tokyo" },
    { id: "ex-ma-2", title: "马拉喀什3日迷宫之旅", days: 3, spots: 15, source: "马蜂窝 @北非玩家", likes: 3800, cover: unsplash("photo-1539020140153-e479b8c22e70"), tags: ["集市", "庭院", "美食"], profileKey: "tokyo" }
  ],
  "西班牙": [
    { id: "ex-es-1", title: "巴塞罗那3日高迪之旅", days: 3, spots: 15, source: "小红书 @西班牙控", likes: 8700, cover: unsplash("photo-1583422409516-2895a77efded"), tags: ["高迪", "建筑", "海滩"], profileKey: "paris" },
    { id: "ex-es-2", title: "马德里2日皇家之旅", days: 2, spots: 12, source: "知乎 @西班牙深度", likes: 5400, cover: unsplash("photo-1539037116277-4db20889f2d4"), tags: ["皇宫", "普拉多", "弗拉门戈"], profileKey: "paris" },
    { id: "ex-es-3", title: "安达卢西亚5日自驾", days: 5, spots: 22, source: "马蜂窝 @南欧自驾", likes: 4600, cover: unsplash("photo-1558642452-9d2a7deb7f62"), tags: ["自驾", "白色小镇", "斗牛"], profileKey: "paris" }
  ],
  "德国": [
    { id: "ex-de-1", title: "慕尼黑3日啤酒之旅", days: 3, spots: 15, source: "小红书 @德国啤酒", likes: 6200, cover: unsplash("photo-1599946347371-68eb71b16afc"), tags: ["啤酒", "城堡", "巴伐利亚"], profileKey: "paris" },
    { id: "ex-de-2", title: "柏林2日历史文化游", days: 2, spots: 12, source: "知乎 @德国历史", likes: 5100, cover: unsplash("photo-1560969184-10fe8719e047"), tags: ["柏林墙", "博物馆", "文化"], profileKey: "paris" },
    { id: "ex-de-3", title: "莱茵河谷4日浪漫之路", days: 4, spots: 18, source: "马蜂窝 @德国自驾", likes: 4300, cover: unsplash("photo-1534313314376-a72289b6181e"), tags: ["城堡", "河谷", "葡萄园"], profileKey: "paris" }
  ],
  "瑞士": [
    { id: "ex-ch-1", title: "瑞士4日雪山湖泊之旅", days: 4, spots: 18, source: "小红书 @瑞士风光", likes: 9300, cover: unsplash("photo-1530122037265-a5f1f91d3b99"), tags: ["雪山", "湖泊", "火车"], profileKey: "paris" },
    { id: "ex-ch-2", title: "少女峰地区2日徒步", days: 2, spots: 12, source: "马蜂窝 @阿尔卑斯", likes: 6700, cover: unsplash("photo-1506905925346-21bda4d32df4"), tags: ["少女峰", "徒步", "高山"], profileKey: "paris" },
    { id: "ex-ch-3", title: "日内瓦洛桑2日湖畔游", days: 2, spots: 12, source: "知乎 @瑞士湖畔", likes: 4500, cover: unsplash("photo-1527668752968-14dc70a27c95"), tags: ["湖泊", "奶酪", "联合国"], profileKey: "paris" }
  ],
  "新加坡": [
    { id: "ex-sg-1", title: "新加坡3日经典路线", days: 3, spots: 15, source: "小红书 @狮城攻略", likes: 8500, cover: unsplash("photo-1525625293386-3f8f99389edd"), tags: ["都市", "美食", "花园"], profileKey: "bangkok" },
    { id: "ex-sg-2", title: "新加坡2日亲子游", days: 2, spots: 12, source: "知乎 @亲子旅行", likes: 6200, cover: unsplash("photo-1496939376851-89342e90adcd"), tags: ["动物园", "环球影城", "亲子"], profileKey: "bangkok" },
    { id: "ex-sg-4", title: "新加坡购物2日扫货", days: 2, spots: 12, source: "马蜂窝 @购物达人", likes: 4800, cover: unsplash("photo-1565967511849-76a60a516170"), tags: ["乌节路", "购物", "免税"], profileKey: "bangkok" }
  ],
  "马来西亚": [
    { id: "ex-my-1", title: "吉隆坡3日都市美食游", days: 3, spots: 15, source: "小红书 @大马攻略", likes: 6800, cover: unsplash("photo-1596422846543-75c6fc197f07"), tags: ["双子塔", "美食", "多元文化"], profileKey: "bangkok" },
    { id: "ex-my-2", title: "沙巴4日潜水之旅", days: 4, spots: 18, source: "马蜂窝 @潜水天堂", likes: 5600, cover: unsplash("photo-1583212292454-1fe6229603b7"), tags: ["潜水", "海岛", "日落"], profileKey: "bangkok" },
    { id: "ex-my-3", title: "槟城2日美食文化游", days: 2, spots: 12, source: "小红书 @槟城美食", likes: 5200, cover: unsplash("photo-1563861826100-9cb868fdbe1c"), tags: ["街头美食", "壁画", "古迹"], profileKey: "bangkok" }
  ],
  "越南": [
    { id: "ex-vn-1", title: "越南3日南北纵贯", days: 3, spots: 15, source: "小红书 @越南旅行", likes: 7400, cover: unsplash("photo-1583417319070-4a69db38a482"), tags: ["河内", "岘港", "胡志明"], profileKey: "bangkok" },
    { id: "ex-vn-3", title: "岘港会安3日海滩古镇", days: 3, spots: 15, source: "小红书 @越南海滩", likes: 6100, cover: unsplash("photo-1557750255-c76072a7aad1"), tags: ["海滩", "古镇", "灯笼"], profileKey: "bangkok" },
    { id: "ex-vn-2", title: "下龙湾2日邮轮之旅", days: 2, spots: 12, source: "马蜂窝 @下龙湾", likes: 5800, cover: unsplash("photo-1506260408121-e353d10b87c7"), tags: ["邮轮", "石灰岩", "海湾"], profileKey: "bangkok" }
  ],
  "印度尼西亚": [
    { id: "ex-id-1", title: "巴厘岛5日浪漫之旅", days: 5, spots: 22, source: "小红书 @巴厘岛游", likes: 9800, cover: unsplash("photo-1537996194471-e657df975ab4"), tags: ["海滩", "寺庙", "梯田"], profileKey: "bangkok" },
    { id: "ex-id-2", title: "巴厘岛乌布3日文化游", days: 3, spots: 15, source: "马蜂窝 @乌布生活", likes: 6400, cover: unsplash("photo-1555400038-63f5ba517a47"), tags: ["梯田", "猴林", "瑜伽"], profileKey: "bangkok" },
    { id: "ex-id-3", title: "科莫多岛3日探险", days: 3, spots: 15, source: "小红书 @印尼探险", likes: 4700, cover: unsplash("photo-1518509562904-e7ef99cdcc86"), tags: ["科莫多龙", "潜水", "粉红海滩"], profileKey: "bangkok" }
  ],
  "加拿大": [
    { id: "ex-ca-2", title: "落基山脉5日自驾", days: 5, spots: 22, source: "马蜂窝 @加拿大自驾", likes: 7200, cover: unsplash("photo-1517935706615-2717063c2225"), tags: ["冰原", "湖泊", "国家公园"], profileKey: "tokyo" },
    { id: "ex-ca-5", title: "极光之旅黄刀镇3日", days: 3, spots: 15, source: "小红书 @极光猎人", likes: 6100, cover: unsplash("photo-1531895861208-8504b98fe814"), tags: ["极光", "冬季", "冰钓"], profileKey: "tokyo" },
    { id: "ex-ca-1", title: "温哥华3日城市自然游", days: 3, spots: 15, source: "小红书 @温哥华生活", likes: 5800, cover: unsplash("photo-1503614472-8c93d56e92ce"), tags: ["都市", "自然", "海鲜"], profileKey: "tokyo" },
    { id: "ex-ca-3", title: "多伦多尼亚加拉2日", days: 2, spots: 12, source: "知乎 @加拿大东部", likes: 4500, cover: unsplash("photo-1507992781348-310259076fe0"), tags: ["瀑布", "CN塔", "都市"], profileKey: "tokyo" }
  ],
  "新西兰": [
    { id: "ex-nz-1", title: "新西兰南岛7日自驾", days: 7, spots: 30, source: "小红书 @新西兰自驾", likes: 8200, cover: unsplash("photo-1469521669194-babb45599def"), tags: ["自驾", "雪山", "湖泊"], profileKey: "tokyo" },
    { id: "ex-nz-2", title: "皇后镇3日极限运动", days: 3, spots: 15, source: "马蜂窝 @极限运动", likes: 6400, cover: unsplash("photo-1507699622108-4be3abd695ad"), tags: ["蹦极", "跳伞", "喷射快艇"], profileKey: "tokyo" },
    { id: "ex-nz-4", title: "米尔福德步道4日徒步", days: 4, spots: 18, source: "知乎 @徒步爱好者", likes: 4100, cover: unsplash("photo-1504233529578-6d46baba6d34"), tags: ["徒步", "峡湾", "瀑布"], profileKey: "tokyo" }
  ],
  "埃及": [
    { id: "ex-eg-1", title: "开罗金字塔3日历史游", days: 3, spots: 15, source: "小红书 @埃及探索", likes: 6900, cover: unsplash("photo-1539768942893-daf53e448371"), tags: ["金字塔", "博物馆", "尼罗河"], profileKey: "tokyo" },
    { id: "ex-eg-2", title: "卢克索阿斯旺4日尼罗河游轮", days: 4, spots: 18, source: "马蜂窝 @埃及游轮", likes: 5300, cover: unsplash("photo-1568322445389-f64ac2515020"), tags: ["游轮", "神庙", "帝王谷"], profileKey: "tokyo" },
    { id: "ex-eg-3", title: "红海2日潜水度假", days: 2, spots: 12, source: "知乎 @红海潜水", likes: 4100, cover: unsplash("photo-1553913861-c0fddf2619ee"), tags: ["潜水", "珊瑚", "度假"], profileKey: "tokyo" }
  ],
  "土耳其": [
    { id: "ex-tr-2", title: "卡帕多西亚2日热气球", days: 2, spots: 12, source: "马蜂窝 @热气球", likes: 11500, cover: unsplash("photo-1570939274717-7eda259b50ed"), tags: ["热气球", "洞穴", "奇石"], profileKey: "tokyo" },
    { id: "ex-tr-1", title: "伊斯坦布尔3日东西交融", days: 3, spots: 15, source: "小红书 @土耳其游", likes: 8400, cover: unsplash("photo-1541432901042-2d8bd64b4a9b"), tags: ["清真寺", "集市", "海峡"], profileKey: "tokyo" },
    { id: "ex-tr-5", title: "土耳其10日环线自驾", days: 10, spots: 42, source: "小红书 @土耳其自驾", likes: 6700, cover: unsplash("photo-1524231757912-21f4fe3a7200"), tags: ["自驾", "环线", "深度"], profileKey: "tokyo" },
    { id: "ex-tr-3", title: "棉花堡以弗所2日", days: 2, spots: 12, source: "知乎 @土耳其古迹", likes: 5200, cover: unsplash("photo-1542224566-6e85f2e6772f"), tags: ["温泉", "古城", "白色梯田"], profileKey: "tokyo" }
  ],
  "中国": [
    { id: "ex-cn-1", title: "北京3日故宫长城经典游", days: 3, spots: 15, source: "小红书 @北京旅行", likes: 15200, cover: unsplash("photo-1508804185872-d7badad00f7d"), tags: ["故宫", "长城", "胡同"], profileKey: "tokyo" },
    { id: "ex-cn-5", title: "云南大理丽江5日", days: 5, spots: 22, source: "小红书 @云南旅行", likes: 14100, cover: unsplash("photo-1547981609-4b6bfe67ca0b"), tags: ["古城", "雪山", "洱海"], profileKey: "tokyo" },
    { id: "ex-cn-3", title: "成都4日美食熊猫游", days: 4, spots: 18, source: "小红书 @成都吃货", likes: 13500, cover: unsplash("photo-1542051841857-5f90071e7989"), tags: ["火锅", "熊猫", "宽窄巷子"], profileKey: "tokyo" },
    { id: "ex-cn-7", title: "重庆3日魔幻城市游", days: 3, spots: 15, source: "小红书 @重庆探索", likes: 12300, cover: unsplash("photo-1480714378408-67cf0d13bc1b"), tags: ["洪崖洞", "火锅", "轻轨"], profileKey: "tokyo" }
  ],
  "菲律宾": [
    { id: "ex-ph-1", title: "长滩岛4日海滩度假", days: 4, spots: 18, source: "小红书 @长滩岛游", likes: 8900, cover: unsplash("photo-1476514525535-07fb3b4ae5f1"), tags: ["白沙滩", "潜水", "日落"], profileKey: "bangkok" },
    { id: "ex-ph-2", title: "宿务薄荷岛3日跳岛", days: 3, spots: 15, source: "马蜂窝 @菲律宾跳岛", likes: 7200, cover: unsplash("photo-1507400492013-162706c8c05e"), tags: ["鲸鲨", "巧克力山", "跳岛"], profileKey: "bangkok" },
    { id: "ex-ph-3", title: "巴拉望5日秘境探索", days: 5, spots: 22, source: "小红书 @巴拉望游", likes: 6800, cover: unsplash("photo-1473496169904-658ba7c44d8a"), tags: ["地下河", "泻湖", "跳岛"], profileKey: "bangkok" }
  ],
  "柬埔寨": [
    { id: "ex-kh-1", title: "暹粒吴哥窟3日", days: 3, spots: 15, source: "小红书 @吴哥窟游", likes: 8200, cover: unsplash("photo-1505832018823-50331d70d237"), tags: ["吴哥窟", "日出", "古迹"], profileKey: "bangkok" },
    { id: "ex-kh-2", title: "金边2日历史文化游", days: 2, spots: 12, source: "马蜂窝 @柬埔寨游", likes: 3400, cover: unsplash("photo-1504567961542-e24d9439a724"), tags: ["皇宫", "博物馆", "美食"], profileKey: "bangkok" },
    { id: "ex-kh-3", title: "西哈努克港2日海滩", days: 2, spots: 12, source: "小红书 @柬埔寨海滩", likes: 2800, cover: unsplash("photo-1414609245224-afa02bfb3fda"), tags: ["海滩", "海鲜", "度假"], profileKey: "bangkok" }
  ],
  "斯里兰卡": [
    { id: "ex-lk-1", title: "斯里兰卡7日环岛游", days: 7, spots: 30, source: "小红书 @锡兰之旅", likes: 5600, cover: unsplash("photo-1470071459604-3b5ec3a7fe05"), tags: ["茶园", "佛牙寺", "海滩"], profileKey: "bangkok" },
    { id: "ex-lk-2", title: "锡兰3日文化三角", days: 3, spots: 15, source: "马蜂窝 @斯里兰卡", likes: 4100, cover: unsplash("photo-1441974231531-c6227db76b6e"), tags: ["古城", "佛教", "文化"], profileKey: "bangkok" },
    { id: "ex-lk-3", title: "美蕊沙观鲸2日", days: 2, spots: 12, source: "小红书 @观鲸之旅", likes: 3500, cover: unsplash("photo-1469474968028-56623f02e42e"), tags: ["观鲸", "海滩", "海鲜"], profileKey: "bangkok" }
  ],
  "冰岛": [
    { id: "ex-is-1", title: "冰岛环岛7日自驾", days: 7, spots: 30, source: "小红书 @冰岛自驾", likes: 9200, cover: unsplash("photo-1483347756197-71ef80e95f73"), tags: ["极光", "冰川", "瀑布"], profileKey: "paris" },
    { id: "ex-is-3", title: "蓝湖温泉+极光2日", days: 2, spots: 12, source: "小红书 @冰岛温泉", likes: 7500, cover: unsplash("photo-1492571350019-22de08371fd3"), tags: ["蓝湖", "极光", "温泉"], profileKey: "paris" }
  ],
  "墨西哥": [
    { id: "ex-mx-1", title: "坎昆4日加勒比度假", days: 4, spots: 18, source: "小红书 @坎昆游", likes: 7600, cover: unsplash("photo-1518684079-3c830dcef090"), tags: ["海滩", "金字塔", "潜水"], profileKey: "tokyo" },
    { id: "ex-mx-2", title: "墨西哥城3日文化美食", days: 3, spots: 15, source: "马蜂窝 @墨西哥城", likes: 5200, cover: unsplash("photo-1519904981063-b0cf448d479e"), tags: ["金字塔", "美食", "壁画"], profileKey: "tokyo" },
    { id: "ex-mx-3", title: "瓜纳华托2日彩色小镇", days: 2, spots: 12, source: "小红书 @墨西哥彩色", likes: 4800, cover: unsplash("photo-1533105079780-92b9be482077"), tags: ["彩色", "小镇", "文化"], profileKey: "tokyo" }
  ]
};
for (const [dest, routes] of Object.entries(extraExploreDB)) {
  if (exploreDB[dest]) {
    exploreDB[dest] = [...exploreDB[dest], ...routes];
  } else {
    exploreDB[dest] = routes;
  }
}
const PREMIUM_MIN_DAYS = 3;
const PREMIUM_MIN_SPOTS = 12;
const PREMIUM_INCLUDES = ["景点", "美食", "住宿", "购物", "休闲"];
const verifiedAt = "2026-05-14";
const destinationSourceReferences = {
  中国: [{ title: "中华人民共和国文化和旅游部", publisher: "文旅部", url: "https://www.mct.gov.cn/", verifiedAt }],
  美国: [
    {
      title: "United States Official Travel Site",
      publisher: "Visit The USA",
      url: "https://www.visittheusa.com/",
      verifiedAt
    }
  ],
  日本: [{ title: "Japan Official Travel Guide", publisher: "JNTO", url: "https://www.japan.travel/", verifiedAt }],
  韩国: [{ title: "Official Korea Tourism Organization", publisher: "Visit Korea", url: "https://english.visitkorea.or.kr/", verifiedAt }],
  泰国: [{ title: "Official Tourism Authority of Thailand", publisher: "Tourism Thailand", url: "https://www.tourismthailand.org/", verifiedAt }],
  新加坡: [{ title: "Official Singapore Travel Guide", publisher: "Visit Singapore", url: "https://www.visitsingapore.com/", verifiedAt }],
  马来西亚: [{ title: "Official Malaysia Travel Guide", publisher: "Malaysia Truly Asia", url: "https://www.malaysia.travel/", verifiedAt }],
  越南: [{ title: "Official Vietnam Tourism Website", publisher: "Vietnam Travel", url: "https://vietnam.travel/", verifiedAt }],
  印度尼西亚: [{ title: "Official Indonesia Travel Guide", publisher: "Wonderful Indonesia", url: "https://www.indonesia.travel/", verifiedAt }],
  菲律宾: [{ title: "Official Philippines Travel Guide", publisher: "Love The Philippines", url: "https://philippines.travel/", verifiedAt }],
  柬埔寨: [{ title: "Official Cambodia Tourism Portal", publisher: "Tourism Cambodia", url: "https://www.tourismcambodia.com/", verifiedAt }],
  斯里兰卡: [{ title: "Official Sri Lanka Travel Guide", publisher: "Sri Lanka Tourism", url: "https://www.srilanka.travel/", verifiedAt }],
  马尔代夫: [{ title: "Official Maldives Travel Guide", publisher: "Visit Maldives", url: "https://visitmaldives.com/", verifiedAt }],
  尼泊尔: [{ title: "Official Nepal Tourism Board", publisher: "Nepal Tourism Board", url: "https://ntb.gov.np/", verifiedAt }],
  印度: [{ title: "Official India Tourism Portal", publisher: "Incredible India", url: "https://www.incredibleindia.gov.in/", verifiedAt }],
  法国: [{ title: "Official France Travel Guide", publisher: "France.fr", url: "https://www.france.fr/", verifiedAt }],
  英国: [{ title: "Official Great Britain Travel Guide", publisher: "VisitBritain", url: "https://www.visitbritain.com/", verifiedAt }],
  意大利: [{ title: "Official Italy Travel Guide", publisher: "Italia.it", url: "https://www.italia.it/", verifiedAt }],
  西班牙: [{ title: "Official Spain Tourism Portal", publisher: "Spain.info", url: "https://www.spain.info/", verifiedAt }],
  德国: [{ title: "Official Germany Travel Guide", publisher: "Germany Travel", url: "https://www.germany.travel/", verifiedAt }],
  瑞士: [{ title: "Official Switzerland Travel Guide", publisher: "My Switzerland", url: "https://www.myswitzerland.com/", verifiedAt }],
  冰岛: [{ title: "Official Iceland Travel Guide", publisher: "Visit Iceland", url: "https://www.visiticeland.com/", verifiedAt }],
  希腊: [{ title: "Official Greece Travel Guide", publisher: "Visit Greece", url: "https://www.visitgreece.gr/", verifiedAt }],
  葡萄牙: [{ title: "Official Portugal Travel Guide", publisher: "Visit Portugal", url: "https://www.visitportugal.com/", verifiedAt }],
  荷兰: [{ title: "Official Netherlands Travel Guide", publisher: "Holland.com", url: "https://www.holland.com/", verifiedAt }],
  挪威: [{ title: "Official Norway Travel Guide", publisher: "Visit Norway", url: "https://www.visitnorway.com/", verifiedAt }],
  克罗地亚: [{ title: "Official Croatia Travel Guide", publisher: "Croatia.hr", url: "https://croatia.hr/", verifiedAt }],
  加拿大: [{ title: "Official Canada Travel Guide", publisher: "Destination Canada", url: "https://travel.destinationcanada.com/", verifiedAt }],
  墨西哥: [{ title: "Official Mexico Tourism Portal", publisher: "Visit Mexico", url: "https://www.visitmexico.com/", verifiedAt }],
  秘鲁: [{ title: "Official Peru Travel Guide", publisher: "Peru Travel", url: "https://www.peru.travel/", verifiedAt }],
  阿根廷: [{ title: "Official Argentina Travel Guide", publisher: "Argentina Travel", url: "https://www.argentina.travel/", verifiedAt }],
  巴西: [{ title: "Official Brazil Travel Guide", publisher: "Visit Brasil", url: "https://visitbrasil.com/", verifiedAt }],
  澳洲: [{ title: "Official Australia Travel Guide", publisher: "Tourism Australia", url: "https://www.australia.com/", verifiedAt }],
  新西兰: [{ title: "Official New Zealand Travel Guide", publisher: "New Zealand Tourism", url: "https://www.newzealand.com/", verifiedAt }],
  斐济: [{ title: "Official Fiji Travel Guide", publisher: "Tourism Fiji", url: "https://www.fiji.travel/", verifiedAt }],
  摩洛哥: [{ title: "Official Morocco Travel Guide", publisher: "Visit Morocco", url: "https://www.visitmorocco.com/", verifiedAt }],
  埃及: [{ title: "Official Egypt Tourism Portal", publisher: "Egypt Travel", url: "https://www.egypt.travel/", verifiedAt }],
  土耳其: [{ title: "Official Turkiye Travel Guide", publisher: "Go Turkiye", url: "https://goturkiye.com/", verifiedAt }],
  以色列: [{ title: "Official Israel Travel Guide", publisher: "Israel Travel", url: "https://israel.travel/", verifiedAt }],
  约旦: [{ title: "Official Jordan Travel Guide", publisher: "Visit Jordan", url: "https://www.visitjordan.com/", verifiedAt }],
  南非: [{ title: "Official South Africa Travel Guide", publisher: "South African Tourism", url: "https://www.southafrica.net/", verifiedAt }]
};
const routeSourceReferences = {
  "ex-us-1": [
    {
      title: "Official New York City Travel Guide",
      publisher: "NYC Tourism",
      url: "https://www.nyctourism.com/",
      verifiedAt
    }
  ],
  "ex-us-2": [
    {
      title: "5 Great Ways to Experience Highway 1",
      publisher: "Visit California",
      url: "https://media.visitcalifornia.com/story-inspiration/discover-story-ideas/5-great-ways-to-experience-highway-1",
      verifiedAt
    },
    {
      title: "Route 1 - Big Sur Coast Highway",
      publisher: "Recreation.gov",
      url: "https://www.recreation.gov/gateways/13824",
      verifiedAt
    }
  ],
  "ex-us-3": [
    {
      title: "Discover LA: Hollywood and Griffith Park",
      publisher: "Discover Los Angeles",
      url: "https://www.discoverlosangeles.com/discover-la-your-way-hollywood-and-griffith-park",
      verifiedAt
    }
  ],
  "ex-us-4": [
    {
      title: "Places To Go - Yellowstone National Park",
      publisher: "U.S. National Park Service",
      url: "https://home.nps.gov/yell/planyourvisit/placestogo.htm",
      verifiedAt
    }
  ],
  "ex-us-5": [
    {
      title: "Oahu Official Travel Site",
      publisher: "Go Hawaii",
      url: "https://www.gohawaii.com/islands/oahu",
      verifiedAt
    }
  ]
};
function sourceReferencesFor(destination, route) {
  return routeSourceReferences[route.id] ?? destinationSourceReferences[destination] ?? [];
}
function isPremiumRoute(route) {
  return route.days >= PREMIUM_MIN_DAYS && route.spots >= PREMIUM_MIN_SPOTS;
}
function enrichExploreRoute(route, destination) {
  const references = sourceReferencesFor(destination, route);
  const sourceVerified = references.length > 0;
  const sourceName = sourceVerified ? `${references[0].publisher} · 已核验` : "Routey 精品路线库 · 待核验";
  const sourceScore = sourceVerified ? 35 : 0;
  const depthScore = Math.min(35, Math.round(route.spots * 1.2));
  const dayScore = Math.min(15, route.days * 3);
  const includesScore = PREMIUM_INCLUDES.length * 3;
  return {
    ...route,
    source: sourceName,
    sourceName,
    sourceUrl: references[0]?.url,
    sourceVerified,
    sourceReferences: references,
    includes: PREMIUM_INCLUDES,
    qualityScore: Math.min(100, sourceScore + depthScore + dayScore + includesScore)
  };
}
function getPremiumExploreRoutes(destination) {
  return (exploreDB[destination] ?? []).filter(isPremiumRoute).map((route) => enrichExploreRoute(route, destination)).filter((route) => route.sourceVerified).sort((a, b) => {
    const bSpecific = routeSourceReferences[b.id] ? 1 : 0;
    const aSpecific = routeSourceReferences[a.id] ? 1 : 0;
    return bSpecific - aSpecific || (b.qualityScore ?? 0) - (a.qualityScore ?? 0) || b.likes - a.likes;
  });
}
function getExploreRoutes(destination) {
  return getPremiumExploreRoutes(destination);
}
const regionMap = [
  { region: "中国", countries: ["中国"] },
  { region: "东亚", countries: ["日本", "韩国"] },
  { region: "东南亚", countries: ["泰国", "新加坡", "马来西亚", "越南", "印度尼西亚", "菲律宾", "柬埔寨", "斯里兰卡", "马尔代夫", "尼泊尔", "印度"] },
  { region: "欧洲", countries: ["法国", "英国", "意大利", "西班牙", "德国", "瑞士", "冰岛", "希腊", "葡萄牙", "荷兰", "挪威", "克罗地亚"] },
  { region: "北美", countries: ["美国", "加拿大", "墨西哥"] },
  { region: "南美", countries: ["秘鲁", "阿根廷", "巴西"] },
  { region: "大洋洲", countries: ["澳洲", "新西兰", "斐济"] },
  { region: "非洲与中东", countries: ["摩洛哥", "埃及", "土耳其", "以色列", "约旦", "南非"] }
];
function getDestinationsByRegion() {
  return regionMap.map(({ region, countries }) => ({
    region,
    destinations: countries.filter((c) => getPremiumExploreRoutes(c).length > 0).map((c) => ({
      name: c,
      routes: getPremiumExploreRoutes(c).length,
      cover: getPremiumExploreRoutes(c)[0]?.cover ?? ""
    }))
  }));
}
const PROFILE_HOME_COUNTRY = {
  tokyo: "日本",
  kyoto: "日本",
  seoul: "韩国",
  bangkok: "泰国",
  paris: "法国",
  usaNyc: "美国",
  usaLa: "美国",
  usaPch: "美国",
  usaYellowstone: "美国",
  usaHawaii: "美国",
  ukLondon: "英国",
  itRome: "意大利",
  ausEast: "澳洲",
  maMarrakech: "摩洛哥",
  esSpain: "西班牙",
  deGermany: "德国",
  chSwiss: "瑞士",
  sgCity: "新加坡",
  myKl: "马来西亚",
  vnHanoi: "越南",
  idBali: "印度尼西亚",
  caCanada: "加拿大",
  nzSouth: "新西兰",
  egCairo: "埃及",
  trTurkey: "土耳其"
};
const DESTINATION_DEFAULT_PROFILE = {
  日本: "tokyo",
  韩国: "seoul",
  泰国: "bangkok",
  法国: "paris",
  美国: "usaNyc",
  英国: "ukLondon",
  意大利: "itRome",
  澳洲: "ausEast",
  摩洛哥: "maMarrakech",
  西班牙: "esSpain",
  德国: "deGermany",
  瑞士: "chSwiss",
  新加坡: "sgCity",
  马来西亚: "myKl",
  越南: "vnHanoi",
  印度尼西亚: "idBali",
  加拿大: "caCanada",
  新西兰: "nzSouth",
  埃及: "egCairo",
  土耳其: "trTurkey",
  中国: "tokyo",
  菲律宾: "bangkok",
  柬埔寨: "bangkok",
  斯里兰卡: "bangkok",
  冰岛: "paris",
  墨西哥: "tokyo"
};
function findExploreEntry(routeId) {
  for (const [destination, routes] of Object.entries(exploreDB)) {
    const route = routes.find((r) => r.id === routeId);
    if (route) return { destination, route };
  }
  return null;
}
function resolveProfileForExploreRoute(route, destination) {
  const byKey = profiles.find((p) => p.key === route.profileKey);
  const home = route.profileKey ? PROFILE_HOME_COUNTRY[route.profileKey] : void 0;
  if (byKey && home === destination) return byKey;
  if (route.profileKey) return void 0;
  const fallbackKey = DESTINATION_DEFAULT_PROFILE[destination];
  const fallback = profiles.find((p) => p.key === fallbackKey);
  const fallbackHome = fallbackKey ? PROFILE_HOME_COUNTRY[fallbackKey] : void 0;
  if (fallback && fallbackHome === destination) return fallback;
  return void 0;
}
function addExploreRouteToTrips(routeId, _existingTrips) {
  const entry = findExploreEntry(routeId);
  if (!entry) return null;
  const { destination } = entry;
  const route = enrichExploreRoute(entry.route, destination);
  const profile = resolveProfileForExploreRoute(route, destination);
  if (!profile) return null;
  const days = buildDays(profile, route.days);
  const trip = {
    id: `explore-${route.id}-${Date.now().toString(36)}`,
    name: route.title,
    date: (/* @__PURE__ */ new Date()).toLocaleDateString("zh-CN").replace(/\//g, "."),
    cover: profile.cover,
    status: "草稿",
    favorite: false,
    days,
    sourceRouteId: route.id,
    qualityScore: route.qualityScore,
    destination: profile.name,
    country: destination,
    tags: route.tags,
    source: {
      kind: "link",
      title: route.sourceName ?? route.source,
      url: route.sourceUrl,
      verified: route.sourceVerified,
      references: route.sourceReferences
    }
  };
  return trip;
}
function getExploreRouteInfo(routeId) {
  const entry = findExploreEntry(routeId);
  if (!entry) return null;
  const route = enrichExploreRoute(entry.route, entry.destination);
  return {
    title: route.title,
    destination: entry.destination,
    days: route.days,
    tags: route.tags,
    source: route.source
  };
}
const styleTagSynonyms = {
  "海滩": ["海滩", "海岛", "海岸", "冲浪", "潜水", "海洋", "蓝城"],
  "森林": ["森林", "自然", "徒步", "高山", "国家公园", "田园"],
  "都市": ["都市", "购物", "时尚", "潮流", "商场"],
  "古迹": ["古迹", "寺庙", "世界遗产", "博物馆", "文艺复兴", "城堡", "皇宫", "神庙", "金字塔"],
  "美食": ["美食", "小吃", "市场", "街头美食", "海鲜", "咖啡", "拉面", "烤肉"],
  "冒险": ["冒险", "蹦极", "跳伞", "自驾", "露营", "极光", "沙漠", "火山", "热气球"],
  "购物": ["购物", "免税", "潮流", "时尚", "古着", "乌节路"],
  "文艺": ["文艺", "艺术", "建筑", "文学", "壁画", "设计", "庭园"]
};
function parseDaysRange(days) {
  if (days === "7+") return [7, Infinity];
  const parts = days.split("-").map(Number);
  return [parts[0], parts[1] ?? parts[0]];
}
function matchQuizToRoutes(answers) {
  const allRoutes = [];
  const isDomestic = answers.scope === "domestic";
  for (const [destination, routes] of Object.entries(exploreDB)) {
    if (isDomestic && destination !== "中国") continue;
    if (!isDomestic && destination === "中国") continue;
    for (const route of routes) {
      if (!isPremiumRoute(route)) continue;
      const enriched = enrichExploreRoute(route, destination);
      if (enriched.sourceVerified) allRoutes.push({ route: enriched, destination });
    }
  }
  const maxLikes = Math.max(...allRoutes.map((r) => r.route.likes), 1);
  const [minDays, maxDays] = parseDaysRange(answers.days);
  const scored = allRoutes.map(({ route, destination }) => {
    let score = 0;
    for (const style of answers.styles) {
      const synonyms = styleTagSynonyms[style] ?? [style];
      const hasMatch = route.tags.some(
        (tag) => synonyms.some((syn) => tag.includes(syn) || syn.includes(tag))
      );
      if (hasMatch) score += 15;
    }
    if (route.days >= minDays && route.days <= maxDays) {
      score += 30;
    } else if (route.days >= minDays - 1 && route.days <= maxDays + 1) {
      score += 15;
    } else {
      const gap = route.days < minDays ? minDays - route.days : route.days - maxDays;
      score -= gap * 8;
    }
    score += route.likes / maxLikes * 10;
    return { ...route, matchScore: Math.max(Math.min(Math.round(score), 100), 0), destination };
  });
  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored.slice(0, 10);
}
const DEFAULT_OWNER_ID = "anonymous_user_id";
const countryByKeyword = [
  ["东京", "日本"],
  ["京都", "日本"],
  ["大阪", "日本"],
  ["富士", "日本"],
  ["首尔", "韩国"],
  ["济州", "韩国"],
  ["曼谷", "泰国"],
  ["清迈", "泰国"],
  ["普吉", "泰国"],
  ["巴黎", "法国"],
  ["尼斯", "法国"],
  ["伦敦", "英国"],
  ["冰岛", "冰岛"],
  ["纽约", "美国"],
  ["洛杉矶", "美国"],
  ["夏威夷", "美国"],
  ["巴厘", "印度尼西亚"],
  ["新加坡", "新加坡"],
  ["悉尼", "澳大利亚"],
  ["墨尔本", "澳大利亚"],
  ["西班牙", "西班牙"],
  ["意大利", "意大利"],
  ["土耳其", "土耳其"],
  ["摩洛哥", "摩洛哥"],
  ["埃及", "埃及"]
];
function createInitialState() {
  const seeds = getSeedTrips();
  return {
    userTrips: seeds.map(
      (trip) => normalizeTrip(trip, {
        ownerId: DEFAULT_OWNER_ID,
        visibility: "private_draft"
      })
    ),
    publicRoutes: seeds.map(
      (trip) => normalizeTrip(
        {
          ...trip,
          id: `seed-${trip.id}`,
          favorite: false,
          status: "已完成",
          sourceRouteId: trip.id,
          publishedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        {
          ownerId: "routey_official",
          visibility: "public"
        }
      )
    ),
    routeSegments: {}
  };
}
function compactText(value) {
  return value.trim().toLowerCase();
}
function unique(values) {
  return [
    ...new Set(
      values.map((value) => value?.trim()).filter((value) => Boolean(value))
    )
  ];
}
function inferDestination(trip) {
  const text = [trip.name, trip.source?.title, trip.days.map((day) => day.route).join(" ")].join(
    " "
  );
  const destination = countryByKeyword.find(([keyword]) => text.includes(keyword))?.[0] ?? trip.name.replace(/\d+日.*$/, "").replace(/之旅|游|攻略|路线/g, "").trim() ?? "精选目的地";
  const country = countryByKeyword.find(([keyword]) => text.includes(keyword))?.[1] ?? destination;
  return { destination, country };
}
function scoreTrip(trip) {
  const spots = trip.days.flatMap((day) => day.spots);
  const geoRatio = spots.length ? spots.filter((spot) => spot.lat != null && spot.lng != null).length / spots.length : 0;
  const imageRatio = spots.length ? spots.filter((spot) => spot.image).length / spots.length : 0;
  const detailRatio = spots.length ? spots.filter((spot) => spot.intro || spot.desc.length > 6).length / spots.length : 0;
  return Math.round(45 + geoRatio * 25 + imageRatio * 15 + detailRatio * 15);
}
function normalizeTrip(trip, options = {}) {
  const inferred = inferDestination(trip);
  const tags = unique([
    trip.destination,
    inferred.destination,
    trip.country,
    inferred.country,
    ...trip.tags ?? [],
    ...trip.days.flatMap(
      (day) => day.spots.flatMap((spot) => [spot.category, ...spot.tags ?? []])
    )
  ]).slice(0, 12);
  return {
    ...trip,
    ownerId: trip.ownerId ?? options.ownerId ?? DEFAULT_OWNER_ID,
    visibility: trip.visibility ?? options.visibility ?? "private_draft",
    destination: trip.destination ?? inferred.destination,
    country: trip.country ?? inferred.country,
    tags,
    qualityScore: trip.qualityScore ?? scoreTrip(trip)
  };
}
function matchesPublicFilters(route, filters = {}) {
  if (filters.days && route.days.length !== filters.days) return false;
  const destination = compactText(filters.destination ?? "");
  if (destination && !compactText([route.destination, route.country, route.name].join(" ")).includes(destination)) {
    return false;
  }
  const tag = compactText(filters.tag ?? filters.budget ?? "");
  if (tag && !(route.tags ?? []).some((routeTag) => compactText(routeTag).includes(tag)))
    return false;
  const q = compactText(filters.q ?? "");
  if (q) {
    const haystack = compactText(
      [
        route.name,
        route.destination,
        route.country,
        route.source?.title,
        ...route.tags ?? []
      ].join(" ")
    );
    if (!haystack.includes(q)) return false;
  }
  return route.visibility === "public";
}
function copyPublicRoute(route, ownerId) {
  return normalizeTrip(
    {
      ...route,
      id: `trip-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      ownerId,
      visibility: "private_draft",
      sourceRouteId: route.id,
      publishedAt: void 0,
      status: "草稿",
      favorite: false,
      source: route.source ?? { kind: "link", title: "公共路线库" }
    },
    { ownerId, visibility: "private_draft" }
  );
}
class MemoryTripRepository {
  state = createInitialState();
  async ensureReady() {
  }
  async persist() {
  }
  async listUserTrips(ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    return this.state.userTrips.filter((trip) => trip.ownerId === ownerId && trip.visibility !== "archived").map((trip) => normalizeTrip(trip, { ownerId })).sort((a, b) => Number(b.favorite) - Number(a.favorite));
  }
  async getTrip(id, ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    const trip = this.state.userTrips.find((item) => item.id === id && item.ownerId === ownerId) ?? this.state.publicRoutes.find((item) => item.id === id && item.visibility === "public");
    return trip ? normalizeTrip(trip, { ownerId: trip.ownerId }) : void 0;
  }
  async saveUserTrip(trip, ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    const next = normalizeTrip(trip, { ownerId, visibility: trip.visibility ?? "private_draft" });
    this.state.userTrips = [next, ...this.state.userTrips.filter((item) => item.id !== next.id)];
    await this.persist();
    return next;
  }
  async updateTrip(id, updater, ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    let nextTrip;
    this.state.userTrips = this.state.userTrips.map((trip) => {
      if (trip.id !== id || trip.ownerId !== ownerId) return trip;
      nextTrip = normalizeTrip(updater(trip), { ownerId });
      return nextTrip;
    });
    if (nextTrip) await this.persist();
    return nextTrip;
  }
  async deleteTrip(id, ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    const before = this.state.userTrips.length;
    this.state.userTrips = this.state.userTrips.filter(
      (trip) => trip.id !== id || trip.ownerId !== ownerId
    );
    const deleted = before !== this.state.userTrips.length;
    if (deleted) await this.persist();
    return deleted;
  }
  async listPublicRoutes(filters = {}) {
    await this.ensureReady();
    return this.state.publicRoutes.map((route) => normalizeTrip(route, { ownerId: route.ownerId, visibility: "public" })).filter((route) => matchesPublicFilters(route, filters)).sort((a, b) => (b.qualityScore ?? 0) - (a.qualityScore ?? 0));
  }
  async publishTrip(id, ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    const source = this.state.userTrips.find((trip) => trip.id === id && trip.ownerId === ownerId);
    if (!source) return void 0;
    const publishedAt = (/* @__PURE__ */ new Date()).toISOString();
    const publicRoute = normalizeTrip(
      {
        ...source,
        id: `route-${source.id}`,
        ownerId,
        visibility: "public",
        sourceRouteId: source.id,
        publishedAt,
        favorite: false
      },
      { ownerId, visibility: "public" }
    );
    const userTrip = normalizeTrip(
      { ...source, visibility: "published_pending", publishedAt },
      { ownerId, visibility: "published_pending" }
    );
    this.state.publicRoutes = [
      publicRoute,
      ...this.state.publicRoutes.filter((route) => route.id !== publicRoute.id)
    ];
    this.state.userTrips = this.state.userTrips.map((trip) => trip.id === id ? userTrip : trip);
    await this.persist();
    return userTrip;
  }
  async savePublicRoute(routeId, ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    const route = this.state.publicRoutes.find(
      (item) => item.id === routeId && item.visibility === "public"
    );
    if (!route) return void 0;
    const trip = copyPublicRoute(route, ownerId);
    this.state.userTrips = [trip, ...this.state.userTrips.filter((item) => item.id !== trip.id)];
    await this.persist();
    return trip;
  }
  async getRouteSegments(tripId, dayId) {
    await this.ensureReady();
    return this.state.routeSegments[`${tripId}:${dayId}`]?.data;
  }
  async saveRouteSegments(tripId, dayId, data) {
    await this.ensureReady();
    this.state.routeSegments[`${tripId}:${dayId}`] = { data, ts: Date.now() };
    await this.persist();
  }
}
function isRepositoryState(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record2 = value;
  return Array.isArray(record2.userTrips) && Array.isArray(record2.publicRoutes) && Boolean(record2.routeSegments) && typeof record2.routeSegments === "object";
}
function isNodeError(error) {
  return Boolean(error && typeof error === "object" && "code" in error);
}
class FileTripRepository extends MemoryTripRepository {
  ready;
  async ensureReady() {
    if (!this.ready) {
      this.ready = this.load();
    }
    await this.ready;
  }
  async dataFile() {
    const path = await import("node:path");
    const cwd2 = typeof process !== "undefined" ? process.cwd() : ".";
    return path.join(cwd2, ".routey-data", "route-database.json");
  }
  async load() {
    const fs = await import("node:fs/promises");
    const file = await this.dataFile();
    try {
      const raw = await fs.readFile(file, "utf8");
      const parsed = JSON.parse(raw);
      if (isRepositoryState(parsed)) {
        this.state = {
          userTrips: parsed.userTrips.map((trip) => normalizeTrip(trip)),
          publicRoutes: parsed.publicRoutes.map(
            (trip) => normalizeTrip(trip, { visibility: "public" })
          ),
          routeSegments: parsed.routeSegments
        };
        return;
      }
    } catch (error) {
      if (!isNodeError(error) || error.code !== "ENOENT") {
        console.warn("[TripRepository] Failed to read local route database, reseeding.", error);
      }
    }
    await this.persist();
  }
  async persist() {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const file = await this.dataFile();
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(this.state, null, 2), "utf8");
  }
}
function tripFromRow(row) {
  return normalizeTrip(row.trip_json);
}
class PostgresTripRepository {
  constructor(connectionString) {
    this.connectionString = connectionString;
  }
  connectionString;
  pool;
  ready;
  async getPool() {
    if (!this.pool) {
      const loadPg = new Function("specifier", "return import(specifier)");
      const pg = await loadPg("pg");
      this.pool = new pg.Pool({
        connectionString: this.connectionString,
        ssl: process.env.PGSSLMODE === "disable" ? void 0 : { rejectUnauthorized: false }
      });
    }
    return this.pool;
  }
  async ensureReady() {
    if (!this.ready) {
      this.ready = this.init();
    }
    await this.ready;
  }
  async init() {
    const pool = await this.getPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_trips (
        id TEXT PRIMARY KEY,
        owner_id TEXT NOT NULL,
        source_route_id TEXT,
        visibility TEXT NOT NULL,
        trip_json JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS routes (
        id TEXT PRIMARY KEY,
        owner_id TEXT,
        source_trip_id TEXT,
        visibility TEXT NOT NULL,
        destination TEXT,
        country TEXT,
        tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
        day_count INTEGER NOT NULL DEFAULT 0,
        quality_score INTEGER NOT NULL DEFAULT 0,
        trip_json JSONB NOT NULL,
        published_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS route_segments (
        id TEXT PRIMARY KEY,
        trip_id TEXT NOT NULL,
        day_id TEXT NOT NULL,
        segment_key TEXT NOT NULL,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_user_trips_owner ON user_trips(owner_id, visibility);
      CREATE INDEX IF NOT EXISTS idx_routes_public ON routes(visibility, destination, country);
      CREATE INDEX IF NOT EXISTS idx_route_segments_trip_day ON route_segments(trip_id, day_id);
    `);
    const userCount = await pool.query(
      "SELECT COUNT(*)::TEXT AS count FROM user_trips"
    );
    if (Number(userCount.rows[0]?.count ?? 0) === 0) {
      for (const trip of createInitialState().userTrips) {
        await this.upsertUserTrip(pool, trip, trip.ownerId);
      }
    }
    const routeCount = await pool.query(
      "SELECT COUNT(*)::TEXT AS count FROM routes"
    );
    if (Number(routeCount.rows[0]?.count ?? 0) === 0) {
      for (const route of createInitialState().publicRoutes) {
        await this.upsertPublicRoute(route);
      }
    }
  }
  async upsertUserTrip(pool, trip, ownerId = DEFAULT_OWNER_ID) {
    const normalized = normalizeTrip(trip, {
      ownerId,
      visibility: trip.visibility ?? "private_draft"
    });
    await pool.query(
      `
        INSERT INTO user_trips (id, owner_id, source_route_id, visibility, trip_json, updated_at)
        VALUES ($1,$2,$3,$4,$5::jsonb,NOW())
        ON CONFLICT (id) DO UPDATE SET
          owner_id = EXCLUDED.owner_id,
          source_route_id = EXCLUDED.source_route_id,
          visibility = EXCLUDED.visibility,
          trip_json = EXCLUDED.trip_json,
          updated_at = NOW()
      `,
      [
        normalized.id,
        normalized.ownerId,
        normalized.sourceRouteId,
        normalized.visibility,
        JSON.stringify(normalized)
      ]
    );
    return normalized;
  }
  async upsertPublicRoute(route) {
    const pool = await this.getPool();
    const normalized = normalizeTrip(route, { ownerId: route.ownerId, visibility: "public" });
    await pool.query(
      `
        INSERT INTO routes (
          id, owner_id, source_trip_id, visibility, destination, country, tags,
          day_count, quality_score, trip_json, published_at, updated_at
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11,NOW())
        ON CONFLICT (id) DO UPDATE SET
          owner_id = EXCLUDED.owner_id,
          source_trip_id = EXCLUDED.source_trip_id,
          visibility = EXCLUDED.visibility,
          destination = EXCLUDED.destination,
          country = EXCLUDED.country,
          tags = EXCLUDED.tags,
          day_count = EXCLUDED.day_count,
          quality_score = EXCLUDED.quality_score,
          trip_json = EXCLUDED.trip_json,
          published_at = EXCLUDED.published_at,
          updated_at = NOW()
      `,
      [
        normalized.id,
        normalized.ownerId,
        normalized.sourceRouteId,
        normalized.visibility,
        normalized.destination,
        normalized.country,
        normalized.tags ?? [],
        normalized.days.length,
        normalized.qualityScore ?? 0,
        JSON.stringify(normalized),
        normalized.publishedAt ?? (/* @__PURE__ */ new Date()).toISOString()
      ]
    );
  }
  async listUserTrips(ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    const pool = await this.getPool();
    const result = await pool.query(
      `
        SELECT trip_json
        FROM user_trips
        WHERE owner_id = $1 AND visibility <> 'archived'
        ORDER BY (trip_json->>'favorite')::BOOLEAN DESC, updated_at DESC
      `,
      [ownerId]
    );
    return result.rows.map(tripFromRow);
  }
  async getTrip(id, ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    const pool = await this.getPool();
    const userTrip = await pool.query(
      "SELECT trip_json FROM user_trips WHERE id = $1 AND owner_id = $2 LIMIT 1",
      [id, ownerId]
    );
    if (userTrip.rows[0]) return tripFromRow(userTrip.rows[0]);
    const publicRoute = await pool.query(
      "SELECT trip_json FROM routes WHERE id = $1 AND visibility = 'public' LIMIT 1",
      [id]
    );
    return publicRoute.rows[0] ? tripFromRow(publicRoute.rows[0]) : void 0;
  }
  async saveUserTrip(trip, ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    const pool = await this.getPool();
    return this.upsertUserTrip(pool, trip, ownerId);
  }
  async updateTrip(id, updater, ownerId = DEFAULT_OWNER_ID) {
    const trip = await this.getTrip(id, ownerId);
    if (!trip || trip.visibility === "public") return void 0;
    return this.saveUserTrip(updater(trip), ownerId);
  }
  async deleteTrip(id, ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    const pool = await this.getPool();
    const result = await pool.query("DELETE FROM user_trips WHERE id = $1 AND owner_id = $2", [
      id,
      ownerId
    ]);
    return (result.rowCount ?? 0) > 0;
  }
  async listPublicRoutes(filters = {}) {
    await this.ensureReady();
    const pool = await this.getPool();
    const result = await pool.query(
      "SELECT trip_json FROM routes WHERE visibility = 'public' ORDER BY quality_score DESC, updated_at DESC"
    );
    return result.rows.map(tripFromRow).filter((route) => matchesPublicFilters(route, filters));
  }
  async publishTrip(id, ownerId = DEFAULT_OWNER_ID) {
    const trip = await this.getTrip(id, ownerId);
    if (!trip || trip.visibility === "public") return void 0;
    const publishedAt = (/* @__PURE__ */ new Date()).toISOString();
    const userTrip = normalizeTrip(
      { ...trip, visibility: "published_pending", publishedAt },
      { ownerId, visibility: "published_pending" }
    );
    const publicRoute = normalizeTrip(
      {
        ...trip,
        id: `route-${trip.id}`,
        ownerId,
        visibility: "public",
        sourceRouteId: trip.id,
        publishedAt,
        favorite: false
      },
      { ownerId, visibility: "public" }
    );
    await this.saveUserTrip(userTrip, ownerId);
    await this.upsertPublicRoute(publicRoute);
    return userTrip;
  }
  async savePublicRoute(routeId, ownerId = DEFAULT_OWNER_ID) {
    await this.ensureReady();
    const pool = await this.getPool();
    const result = await pool.query(
      "SELECT trip_json FROM routes WHERE id = $1 AND visibility = 'public' LIMIT 1",
      [routeId]
    );
    const route = result.rows[0] ? tripFromRow(result.rows[0]) : void 0;
    if (!route) return void 0;
    return this.saveUserTrip(copyPublicRoute(route, ownerId), ownerId);
  }
  async getRouteSegments(tripId, dayId) {
    await this.ensureReady();
    const pool = await this.getPool();
    const result = await pool.query(
      "SELECT data FROM route_segments WHERE id = $1 LIMIT 1",
      [`${tripId}:${dayId}`]
    );
    return result.rows[0]?.data;
  }
  async saveRouteSegments(tripId, dayId, data) {
    await this.ensureReady();
    const pool = await this.getPool();
    await pool.query(
      `
        INSERT INTO route_segments (id, trip_id, day_id, segment_key, data, updated_at)
        VALUES ($1,$2,$3,$4,$5::jsonb,NOW())
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
      `,
      [`${tripId}:${dayId}`, tripId, dayId, `${tripId}:${dayId}`, JSON.stringify(data)]
    );
  }
}
function readEnv(env2, key) {
  if (env2 && typeof env2 === "object" && key in env2) {
    const value = env2[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  const fromProcess = typeof process !== "undefined" ? process.env[key] : void 0;
  return fromProcess?.trim() || void 0;
}
let repositoryPromise;
async function getTripRepository(env2) {
  if (!repositoryPromise) {
    repositoryPromise = Promise.resolve().then(() => {
      const databaseUrl = readEnv(env2, "DATABASE_URL") ?? readEnv(env2, "POSTGRES_URL");
      if (databaseUrl) {
        console.log("[TripRepository] Using PostgreSQL route database.");
        return new PostgresTripRepository(databaseUrl);
      }
      console.log("[TripRepository] Using local JSON route database.");
      return new FileTripRepository();
    });
  }
  return repositoryPromise;
}
let serverEntryPromise;
const importJobs = new TTLCache({ maxSize: 200, ttlMs: 10 * 60 * 1e3 });
const quizAiJobs = new TTLCache({ maxSize: 100, ttlMs: 10 * 60 * 1e3 });
const AI_STEPS = ["读取攻略来源", "AI 智能解析", "地理编码定位", "优化路线排序"];
function makeJobResponse(job) {
  return {
    id: job.id,
    kind: job.kind,
    status: job.status,
    progress: job.progress,
    tripId: job.status === "done" ? job.tripId : void 0,
    error: job.error,
    steps: job.steps
  };
}
function updateJobProgress(job, stepIndex, progress, status = "processing") {
  job.progress = progress;
  job.status = status;
  job.steps = AI_STEPS.map((label, i) => ({
    label,
    state: i < stepIndex ? "done" : i === stepIndex ? "active" : "pending"
  }));
  if (status === "done") {
    job.steps = AI_STEPS.map((label) => ({ label, state: "done" }));
  }
}
async function processImportJob(job, env2, ownerId) {
  try {
    updateJobProgress(job, 0, 10);
    updateJobProgress(job, 1, 30);
    const trip = await parseWithAI(job.kind, job.content);
    updateJobProgress(job, 2, 70);
    updateJobProgress(job, 3, 85);
    const optimized = optimizeTrip(trip);
    const repository = await getTripRepository(env2);
    await repository.saveUserTrip(optimized, ownerId);
    job.tripId = optimized.id;
    updateJobProgress(job, 4, 100, "done");
    console.log(`[Import] Job ${job.id} completed → trip "${optimized.name}"`);
  } catch (err) {
    console.error(`[Import] Job ${job.id} failed:`, err);
    try {
      console.log(`[Import] Falling back to keyword-based matching...`);
      const fallbackTrip = createTripFromImport({ kind: job.kind, content: job.content });
      const repository = await getTripRepository(env2);
      await repository.saveUserTrip(fallbackTrip, ownerId);
      job.tripId = fallbackTrip.id;
      updateJobProgress(job, 4, 100, "done");
      console.log(`[Import] Fallback succeeded → trip "${fallbackTrip.name}"`);
    } catch (fallbackErr) {
      job.status = "error";
      job.error = err instanceof Error ? err.message : "解析失败";
      job.progress = 0;
      job.steps = AI_STEPS.map((label) => ({ label, state: "pending" }));
    }
  }
}
const travelCache = new TTLCache({
  maxSize: 500,
  ttlMs: 30 * 60 * 1e3
});
const spotImageCache = new TTLCache({ maxSize: 1e3, ttlMs: 60 * 60 * 1e3 });
async function fetchBingImage(query) {
  const searchQuery = `${query} 风景 景点`;
  const url = `https://cn.bing.com/images/async?q=${encodeURIComponent(searchQuery)}&first=0&count=8&mmasync=1`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    if (!res.ok) return null;
    const html = await res.text();
    const urlMatches = html.match(/murl&quot;:&quot;(https?:\/\/[^&]+)/g);
    if (!urlMatches || urlMatches.length === 0) return null;
    const urls = urlMatches.map((m) => m.replace("murl&quot;:&quot;", ""));
    const blockedHosts = [
      "gettyimages.com",
      "istockphoto.com",
      "shutterstock.com",
      "alamy.com",
      "dreamstime.com",
      "123rf.com",
      "depositphotos.com",
      "adobe.stock",
      "pinterest.com",
      "pin.it",
      "flickr.com",
      "static.flickr.com",
      "rare-gallery.com",
      "wallpapercave.com",
      "wallpaperflare.com",
      "hdqwalls.com",
      "wallpaperaccess.com",
      "peakpx.com",
      "thehoneycombers.com",
      "shutterbug.com",
      "travelchannel.com"
    ];
    const safeUrls = urls.filter((u) => !blockedHosts.some((h) => u.includes(h)));
    const preferredHosts = [
      "ctrip.com",
      "qunarzz.com",
      "mafengwo.net",
      "duitang.com",
      "bdimg.com",
      "bcebos.com",
      "sinaimg.cn",
      "zhimg.com",
      "youimg1.c-ctrip.com",
      "img1.qunarzz.com",
      "hiphotos.baidu.com",
      "699pic.com",
      "cdn.britannica.com",
      "upload.wikimedia.org",
      "static1.thetravelimages.com",
      "tripsavvy.com",
      "lonelyplanet.com",
      "worldatlas.com",
      "aceadventurer.com"
    ];
    const preferred = safeUrls.find((u) => preferredHosts.some((h) => u.includes(h)));
    if (preferred) {
      console.log(`[Image] Bing CN (preferred): "${query}" → ${preferred.slice(0, 80)}`);
      return preferred;
    }
    const skipUnreliable = ["huaban.com", "best-wallpaper.net", "wallhaven.cc"];
    const reliable = safeUrls.filter((u) => !skipUnreliable.some((h) => u.includes(h)));
    const httpsUrl = reliable.find((u) => u.startsWith("https://")) ?? safeUrls.find((u) => u.startsWith("https://"));
    const finalUrl = httpsUrl ?? safeUrls[0];
    if (finalUrl) {
      console.log(`[Image] Bing CN: "${query}" → ${finalUrl.slice(0, 80)}`);
      return finalUrl;
    }
  } catch (err) {
    console.error(`[Image] Bing fetch failed for "${query}":`, err);
  }
  return null;
}
async function fetchWikipediaImage(query) {
  const wikis = ["zh", "en", "ja", "ko"];
  for (const lang of wikis) {
    try {
      const searchParams = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: query,
        srlimit: "1",
        format: "json",
        origin: "*"
      });
      const searchRes = await fetch(`https://${lang}.wikipedia.org/w/api.php?${searchParams}`);
      const searchData = await searchRes.json();
      const title2 = searchData.query?.search?.[0]?.title;
      if (!title2) continue;
      const imgParams = new URLSearchParams({
        action: "query",
        titles: title2,
        prop: "pageimages",
        format: "json",
        pithumbsize: "1200",
        origin: "*"
      });
      const imgRes = await fetch(`https://${lang}.wikipedia.org/w/api.php?${imgParams}`);
      const imgData = await imgRes.json();
      const pages = imgData.query?.pages;
      if (!pages) continue;
      const page = Object.values(pages)[0];
      if (page?.thumbnail?.source) {
        console.log(`[Image] Wiki ${lang}: "${query}" → "${title2}"`);
        return page.thumbnail.source;
      }
    } catch {
      continue;
    }
  }
  return null;
}
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
];
let fallbackIdx = 0;
function getCategoryFallback(_query) {
  return FALLBACK_IMAGES[fallbackIdx++ % FALLBACK_IMAGES.length];
}
async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("./server-9gm5-Sah.js").then((n) => n.a2).then(
      (m) => m.default ?? m
    );
  }
  return serverEntryPromise;
}
function brandedErrorResponse() {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
function isCatastrophicSsrErrorBody(body, responseStatus) {
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }
  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }
  const fields = payload;
  const expectedKeys = /* @__PURE__ */ new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }
  return fields.unhandled === true && fields.message === "HTTPError" && (fields.status === void 0 || fields.status === responseStatus);
}
async function normalizeCatastrophicSsrResponse(response) {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}
let n8nPool;
async function getN8nPool() {
  if (n8nPool) return n8nPool;
  const dbUrl = process.env.N8N_DATABASE_URL ?? process.env.DATABASE_URL ?? "postgresql://postgres:123456@localhost:5433/tripcanvas";
  try {
    const loadPg = new Function("specifier", "return import(specifier)");
    const pg = await loadPg("pg");
    n8nPool = new pg.Pool({ connectionString: dbUrl });
    return n8nPool;
  } catch (e) {
    console.warn("[n8n] Failed to connect to n8n database:", e);
    return null;
  }
}
function spotImageUrl(imageQuery, placeName, _category, _index) {
  const query = imageQuery || placeName;
  if (!query) return void 0;
  return `/api/spot-image?q=${encodeURIComponent(query)}`;
}
const citySearchTerms = {
  // 中国
  北京: "北京天安门故宫",
  上海: "上海外滩夜景",
  成都: "成都宽窄巷子",
  西安: "西安兵马俑",
  杭州: "杭州西湖断桥",
  重庆: "重庆洪崖洞夜景",
  广州: "广州塔小蛮腰",
  深圳: "深圳市民中心",
  厦门: "厦门鼓浪屿",
  昆明: "昆明滇池",
  大理: "大理洱海",
  丽江: "丽江古城",
  三亚: "三亚亚龙湾",
  苏州: "苏州拙政园",
  南京: "南京夫子庙",
  武汉: "武汉黄鹤楼",
  长沙: "长沙岳麓山",
  青岛: "青岛栈桥",
  哈尔滨: "哈尔滨冰雪大世界",
  拉萨: "拉萨布达拉宫",
  桂林: "桂林山水漓江",
  张家界: "张家界天门山",
  敦煌: "敦煌莫高窟",
  洛阳: "洛阳龙门石窟",
  贵阳: "贵阳黄果树瀑布",
  黄山: "黄山迎客松",
  乌镇: "乌镇水乡古镇",
  泉州: "泉州开元寺",
  福州: "福州三坊七巷",
  九寨沟: "九寨沟五花海",
  香港: "香港维多利亚港夜景",
  // 日本
  东京: "Tokyo Tower night",
  大阪: "Osaka Castle Japan",
  京都: "Kyoto Fushimi Inari",
  北海道: "Hokkaido lavender field",
  冲绳: "Okinawa blue ocean",
  奈良: "Nara deer temple",
  福冈: "Fukuoka canal city",
  // 韩国
  首尔: "Seoul Gyeongbokgung palace",
  釜山: "Busan Haeundae beach",
  济州岛: "Jeju Island sunrise",
  // 东南亚
  曼谷: "Bangkok Grand Palace temple",
  清迈: "Chiang Mai temple",
  普吉岛: "Phuket beach sunset",
  新加坡: "Singapore Marina Bay Sands",
  吉隆坡: "Kuala Lumpur Petronas Towers",
  槟城: "Penang street art Georgetown",
  巴厘岛: "Bali rice terrace Ubud",
  河内: "Hanoi Old Quarter Vietnam",
  胡志明市: "Ho Chi Minh City Vietnam",
  岘港: "Da Nang Golden Bridge",
  马尼拉: "Manila Philippines skyline",
  暹粒: "Angkor Wat sunrise Cambodia",
  科伦坡: "Colombo Sri Lanka",
  加德满都: "Kathmandu Nepal temple",
  马尔代夫: "Maldives overwater bungalow",
  // 欧洲
  巴黎: "Paris Eiffel Tower",
  尼斯: "Nice France Riviera",
  伦敦: "London Big Ben Thames",
  爱丁堡: "Edinburgh Castle Scotland",
  罗马: "Rome Colosseum Italy",
  佛罗伦萨: "Florence Duomo Italy",
  威尼斯: "Venice Grand Canal gondola",
  巴塞罗那: "Barcelona Sagrada Familia",
  马德里: "Madrid Royal Palace",
  柏林: "Berlin Brandenburg Gate",
  慕尼黑: "Munich Marienplatz",
  苏黎世: "Zurich Switzerland lake",
  因特拉肯: "Interlaken Swiss Alps",
  雷克雅未克: "Iceland Northern Lights",
  圣托里尼: "Santorini blue dome Greece",
  雅典: "Athens Acropolis Parthenon",
  里斯本: "Lisbon tram Portugal",
  阿姆斯特丹: "Amsterdam canal houses",
  布拉格: "Prague Charles Bridge",
  维也纳: "Vienna Schonbrunn Palace",
  布达佩斯: "Budapest Parliament night",
  杜布罗夫尼克: "Dubrovnik old town Croatia",
  // 北美
  纽约: "New York City Manhattan skyline",
  洛杉矶: "Los Angeles Hollywood sign",
  旧金山: "San Francisco Golden Gate Bridge",
  拉斯维加斯: "Las Vegas strip night",
  夏威夷: "Hawaii Waikiki beach",
  迈阿密: "Miami Beach sunset",
  芝加哥: "Chicago skyline Lake Michigan",
  温哥华: "Vancouver Stanley Park",
  多伦多: "Toronto CN Tower",
  坎昆: "Cancun Mexico beach",
  // 南美
  利马: "Lima Peru historic center",
  布宜诺斯艾利斯: "Buenos Aires La Boca",
  里约热内卢: "Rio de Janeiro Christ Redeemer",
  // 大洋洲
  悉尼: "Sydney Opera House Harbour",
  墨尔本: "Melbourne Australia laneways",
  奥克兰: "Auckland Sky Tower New Zealand",
  皇后镇: "Queenstown Milford Sound",
  // 中东/非洲
  马拉喀什: "Marrakech Morocco medina",
  开罗: "Egypt Pyramids Giza sphinx",
  伊斯坦布尔: "Istanbul Blue Mosque Turkey",
  卡帕多奇亚: "Cappadocia hot air balloon",
  迪拜: "Dubai Burj Khalifa night skyline",
  开普敦: "Cape Town Table Mountain",
  内罗毕: "Nairobi Kenya safari",
  // 国家级别
  中国: "Great Wall China",
  日本: "Mount Fuji Japan cherry blossom",
  韩国: "Seoul Namsan Tower Korea",
  泰国: "Thailand Bangkok temple",
  马来西亚: "Malaysia Petronas Towers",
  越南: "Ha Long Bay Vietnam",
  印度尼西亚: "Bali Indonesia temple sunset",
  菲律宾: "Philippines Palawan beach",
  柬埔寨: "Angkor Wat Cambodia sunrise",
  斯里兰卡: "Sri Lanka Sigiriya rock",
  尼泊尔: "Nepal Himalayas Everest",
  印度: "Taj Mahal India sunrise",
  法国: "Paris Eiffel Tower sunset",
  英国: "London Tower Bridge",
  意大利: "Rome Colosseum Italy",
  西班牙: "Barcelona Spain Sagrada Familia",
  德国: "Berlin Germany skyline",
  瑞士: "Swiss Alps Matterhorn",
  冰岛: "Iceland Aurora Northern Lights",
  希腊: "Santorini Greece blue dome",
  葡萄牙: "Lisbon Portugal tram",
  荷兰: "Amsterdam Netherlands canal",
  挪威: "Norway fjord landscape",
  克罗地亚: "Dubrovnik Croatia coast",
  美国: "New York Statue of Liberty",
  加拿大: "Banff Canada Lake Louise",
  墨西哥: "Cancun Mexico Caribbean",
  秘鲁: "Machu Picchu Peru",
  阿根廷: "Buenos Aires Argentina",
  巴西: "Rio de Janeiro Christ Redeemer statue",
  澳洲: "Sydney Opera House Australia",
  澳大利亚: "Sydney Opera House Australia",
  新西兰: "New Zealand Milford Sound",
  斐济: "Fiji tropical island beach",
  摩洛哥: "Morocco Marrakech medina",
  埃及: "Egypt Pyramids Giza sunset",
  土耳其: "Istanbul Hagia Sophia Turkey",
  以色列: "Jerusalem Western Wall Israel",
  约旦: "Petra Jordan treasury",
  南非: "Cape Town Table Mountain sunset",
  阿联酋: "Dubai skyline Burj Khalifa",
  捷克: "Prague old town square Czech"
};
function getRouteCoverUrl(city, hint) {
  if (hint) {
    return `/api/spot-image?q=${encodeURIComponent(city + " " + hint)}`;
  }
  const searchTerm = citySearchTerms[city];
  if (searchTerm) {
    return `/api/spot-image?q=${encodeURIComponent(searchTerm)}`;
  }
  return `/api/spot-image?q=${encodeURIComponent(city + " 景点 风景")}`;
}
const themeCoverKeywords = {
  citywalk: ["街景 漫步", "老城区 小巷", "城市夜景"],
  food: ["美食 餐厅", "当地美食 市场", "特色小吃 街头"],
  beach: ["海滩 日落", "海景 度假", "海岸线 风光"],
  luxury: ["奢华酒店 泳池", "高级度假村", "豪华 全景"],
  nature: ["自然风光 山", "湖泊 森林", "日出 山峰"],
  shopping: ["购物 商圈", "商场 夜市", "集市 特产"],
  culture: ["历史 古迹", "博物馆 文化", "寺庙 建筑"]
};
function getRouteSpecificCover(city, title2, theme, tags, index) {
  const candidates = [];
  const themeKw = themeCoverKeywords[theme];
  if (themeKw) candidates.push(...themeKw);
  const tagList = tags ? tags.split(",").map((t) => t.trim()).filter((t) => t.length >= 2 && t !== city) : [];
  for (const tag of tagList) candidates.push(tag);
  const titleWords = title2.replace(/[：:，,。.！!？?""''《》]/g, " ").split(/\s+/).filter((w) => w.length >= 2 && w !== city);
  if (titleWords.length >= 2) candidates.push(titleWords.slice(0, 2).join(" "));
  if (titleWords.length >= 1) candidates.push(titleWords[0]);
  const unique2 = [...new Set(candidates)];
  if (unique2.length > 0) {
    const keyword = unique2[index % unique2.length];
    return getRouteCoverUrl(city, keyword);
  }
  return getRouteCoverUrl(city);
}
const validatedCoverCache = /* @__PURE__ */ new Map();
const COVER_CACHE_TTL = 24 * 60 * 6e4;
async function validateImageUrl(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-1023" },
      // only fetch first 1KB to check
      signal: AbortSignal.timeout(5e3)
    });
    if (res.status !== 200 && res.status !== 206) return false;
    const ct = res.headers.get("content-type") || "";
    return ct.startsWith("image/") || ct.includes("octet-stream") || ct.includes("jpeg") || ct.includes("png");
  } catch {
    return false;
  }
}
async function resolveValidCoverUrl(query) {
  const cached = validatedCoverCache.get(query);
  if (cached && Date.now() - cached.ts < COVER_CACHE_TTL) return cached.url;
  const searchQuery = `${query} 风景 景点`;
  const bingApiUrl = `https://cn.bing.com/images/async?q=${encodeURIComponent(searchQuery)}&first=0&count=12&mmasync=1`;
  try {
    const res = await fetch(bingApiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    if (res.ok) {
      const html = await res.text();
      const urlMatches = html.match(/murl&quot;:&quot;(https?:\/\/[^&]+)/g);
      if (urlMatches) {
        const blockedHosts = [
          "gettyimages.com",
          "istockphoto.com",
          "shutterstock.com",
          "alamy.com",
          "dreamstime.com",
          "123rf.com",
          "depositphotos.com",
          "pinterest.com",
          "flickr.com",
          "rare-gallery.com",
          "wallpapercave.com",
          "wallpaperflare.com",
          "hdqwalls.com",
          "peakpx.com",
          "thehoneycombers.com",
          "shutterbug.com",
          "huaban.com",
          "best-wallpaper.net"
        ];
        const candidates = urlMatches.map((m) => m.replace("murl&quot;:&quot;", "")).filter((u) => u.startsWith("https://") && !blockedHosts.some((h) => u.includes(h)));
        for (const candidate of candidates.slice(0, 4)) {
          if (await validateImageUrl(candidate)) {
            console.log(`[CoverResolve] "${query}" → ${candidate.slice(0, 80)} (validated)`);
            validatedCoverCache.set(query, { url: candidate, ts: Date.now() });
            return candidate;
          }
        }
      }
    }
  } catch {
  }
  const wikiUrl = await fetchWikipediaImage(query);
  if (wikiUrl && await validateImageUrl(wikiUrl)) {
    validatedCoverCache.set(query, { url: wikiUrl, ts: Date.now() });
    return wikiUrl;
  }
  const fallback = `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`;
  validatedCoverCache.set(query, { url: fallback, ts: Date.now() });
  return fallback;
}
function n8nRouteToTrip(route, days) {
  const coverUrl = route.cover_url || "";
  const coverKeyMap = {
    japan: "japan",
    日本: "japan",
    tokyo: "tokyo",
    东京: "tokyo",
    korea: "korea",
    韩国: "korea",
    thailand: "thailand",
    泰国: "thailand",
    france: "france",
    法国: "france"
  };
  const dest = (route.destination || "").toLowerCase();
  const city = (route.city || "").toLowerCase();
  const coverKey = coverKeyMap[dest] ?? coverKeyMap[city] ?? "map";
  return {
    id: `n8n-${route.id}`,
    name: route.route_title || "AI 生成行程",
    date: route.created_at ? String(route.created_at).split("T")[0] : "",
    cover: coverKey,
    status: "已完成",
    favorite: false,
    destination: route.destination || void 0,
    country: route.country || void 0,
    city: route.city || void 0,
    tags: route.tags ? String(route.tags).split(",").map((t) => t.trim()) : void 0,
    qualityScore: route.quality_score != null ? Number(route.quality_score) : void 0,
    coverUrl: coverUrl || getRouteCoverUrl(route.city || ""),
    mood: route.mood || void 0,
    summary: route.summary || void 0,
    routeTheme: route.route_theme || void 0,
    budgetLevel: route.budget_level || void 0,
    travelType: route.travel_type || void 0,
    pace: route.pace || void 0,
    bestTime: route.best_time || void 0,
    likes: route.likes != null ? Number(route.likes) : 0,
    daysCount: route.days_count != null ? Number(route.days_count) : void 0,
    days: days.map((day) => ({
      id: `n8n-d${day.id}`,
      label: day.title || `Day ${day.day_number}`,
      route: day.summary || "",
      spots: (day.places || []).map(
        (p, si) => ({
          id: `n8n-p${p.id}`,
          time: p.visit_time || "09:00",
          title: p.place_name || "",
          desc: p.description || "",
          lat: p.latitude != null ? Number(p.latitude) : void 0,
          lng: p.longitude != null ? Number(p.longitude) : void 0,
          category: p.category || "景点",
          intro: p.intro || void 0,
          rating: p.rating != null ? Number(p.rating) : void 0,
          price: p.price || void 0,
          image: p.image_url || spotImageUrl(
            p.image_query,
            p.place_name || "",
            p.category
          ),
          tags: p.tags ? String(p.tags).split(",").map((t) => t.trim()) : void 0,
          address: p.address || void 0,
          durationMin: p.duration_min != null ? Number(p.duration_min) : void 0
        })
      )
    })),
    source: { kind: "text", title: "n8n AI 自动生成" }
  };
}
function apiJson(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
function apiError(status, message) {
  return apiJson({ message }, status);
}
async function readJson(request) {
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? body : {};
  } catch {
    return {};
  }
}
function getOwnerId(request) {
  return request.headers.get("x-routey-user-id")?.trim() || DEFAULT_OWNER_ID;
}
function touchDay(trip, dayId, updater) {
  return {
    ...trip,
    days: trip.days.map((day) => {
      if (day.id !== dayId) return day;
      return optimizeDay({ ...day, spots: updater(day.spots) });
    })
  };
}
async function handleTripPatch(tripId, request, env2, ownerId) {
  const body = await readJson(request);
  const parsed = tripPatchSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(400, parsed.error.errors[0]?.message ?? "无效的操作");
  }
  const data = parsed.data;
  const repository = await getTripRepository(env2);
  const next = await repository.updateTrip(
    tripId,
    (trip) => {
      if (data.action === "toggleFavorite") {
        return { ...trip, favorite: !trip.favorite };
      }
      if (data.action === "regenerate") {
        return optimizeTrip({
          ...trip,
          status: "草稿",
          days: trip.days.map((day) => ({ ...day, spots: [...day.spots].reverse() }))
        });
      }
      if (data.action === "optimizeDay") {
        return optimizeTrip(trip, data.dayId);
      }
      if (data.action === "addSpot") {
        const spot = {
          id: `s-${Date.now().toString(36)}`,
          time: "19:00",
          title: data.title?.trim() || "新地点",
          desc: data.desc?.trim() || "停留 30分钟",
          category: "景点"
        };
        return touchDay(trip, data.dayId, (spots) => [...spots, spot]);
      }
      if (data.action === "deleteSpot") {
        return touchDay(
          trip,
          data.dayId,
          (spots) => spots.filter((spot) => spot.id !== data.spotId)
        );
      }
      if (data.action === "updateSpot") {
        const patch = data.spot;
        return touchDay(
          trip,
          data.dayId,
          (spots) => spots.map((spot) => spot.id === patch.id ? { ...spot, ...patch, id: spot.id } : spot)
        );
      }
      return trip;
    },
    ownerId
  );
  return next ? apiJson(next) : apiError(404, "行程不存在");
}
async function handleApiRequest(request, env2) {
  const url = new URL(request.url);
  const { pathname } = url;
  if (!pathname.startsWith("/api/")) return void 0;
  const ownerId = getOwnerId(request);
  const repository = await getTripRepository(env2);
  if (request.method === "OPTIONS") return apiJson({ ok: true });
  if (pathname === "/api/health") return apiJson({ ok: true });
  if (pathname === "/api/trips" && request.method === "GET") {
    return apiJson(await repository.listUserTrips(ownerId));
  }
  if (pathname === "/api/routes/public" && request.method === "GET") {
    const filters = {
      destination: url.searchParams.get("destination") ?? void 0,
      tag: url.searchParams.get("tag") ?? void 0,
      budget: url.searchParams.get("budget") ?? void 0,
      q: url.searchParams.get("q") ?? void 0,
      days: url.searchParams.get("days") ? Number(url.searchParams.get("days")) : void 0
    };
    return apiJson(await repository.listPublicRoutes(filters));
  }
  if (pathname === "/api/imports" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = importPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(400, parsed.error.errors[0]?.message ?? "请提供有效的导入类型和内容");
    }
    const { kind, content } = parsed.data;
    const id = `job-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const job = {
      id,
      kind,
      content,
      createdAt: Date.now(),
      status: "processing",
      progress: 5,
      steps: AI_STEPS.map((label, i) => ({
        label,
        state: i === 0 ? "active" : "pending"
      }))
    };
    importJobs.set(id, job);
    processImportJob(job, env2, ownerId).catch((err) => console.error("[Import] Unhandled:", err));
    return apiJson(makeJobResponse(job), 201);
  }
  const importMatch = pathname.match(/^\/api\/imports\/([^/]+)$/);
  if (importMatch && request.method === "GET") {
    const job = importJobs.get(importMatch[1]);
    return job ? apiJson(makeJobResponse(job)) : apiError(404, "解析任务不存在");
  }
  const tripMatch = pathname.match(/^\/api\/trips\/([^/]+)$/);
  if (tripMatch && request.method === "GET") {
    const trip = await repository.getTrip(tripMatch[1], ownerId);
    return trip ? apiJson(trip) : apiError(404, "行程不存在");
  }
  if (tripMatch && request.method === "PATCH") {
    return handleTripPatch(tripMatch[1], request, env2, ownerId);
  }
  if (tripMatch && request.method === "DELETE") {
    const deleted = await repository.deleteTrip(tripMatch[1], ownerId);
    return deleted ? apiJson({ ok: true }) : apiError(404, "行程不存在");
  }
  const publishMatch = pathname.match(/^\/api\/trips\/([^/]+)\/publish$/);
  if (publishMatch && request.method === "POST") {
    const trip = await repository.publishTrip(publishMatch[1], ownerId);
    return trip ? apiJson(trip) : apiError(404, "行程不存在");
  }
  const savePublicMatch = pathname.match(/^\/api\/routes\/([^/]+)\/save$/);
  if (savePublicMatch && request.method === "POST") {
    const trip = await repository.savePublicRoute(savePublicMatch[1], ownerId);
    return trip ? apiJson(trip, 201) : apiError(404, "公共路线不存在");
  }
  if (pathname === "/api/travel-info" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = travelInfoSchema.safeParse(body);
    if (!parsed.success) return apiError(400, "请提供有效的 tripId 和 dayId");
    const { tripId, dayId } = parsed.data;
    const trip = await repository.getTrip(tripId, ownerId);
    if (!trip) return apiError(404, "行程不存在");
    const day = trip.days.find((d) => d.id === dayId);
    if (!day) return apiError(404, "天数不存在");
    const cacheKey = `${tripId}:${dayId}`;
    const cached = travelCache.get(cacheKey);
    if (cached) {
      return apiJson(cached.data);
    }
    const persisted = await repository.getRouteSegments(tripId, dayId);
    if (persisted) {
      travelCache.set(cacheKey, { data: persisted, ts: Date.now() });
      return apiJson(persisted);
    }
    try {
      const infoMap = await getDayTravelInfo(day.spots);
      const result = {};
      infoMap.forEach((val, key) => {
        result[key] = val;
      });
      travelCache.set(cacheKey, { data: result, ts: Date.now() });
      await repository.saveRouteSegments(tripId, dayId, result);
      return apiJson(result);
    } catch (err) {
      console.error("[Travel] Error:", err);
      return apiError(500, "获取路线信息失败");
    }
  }
  if (pathname === "/api/spot-image" && request.method === "GET") {
    const query = url.searchParams.get("q") ?? "";
    if (!query) return apiError(400, "缺少搜索词");
    const cachedUrl = spotImageCache.get(query);
    if (cachedUrl) {
      return Response.redirect(cachedUrl, 302);
    }
    const bingUrl = await fetchBingImage(query);
    if (bingUrl) {
      spotImageCache.set(query, bingUrl);
      return Response.redirect(bingUrl, 302);
    }
    const wikiUrl = await fetchWikipediaImage(query);
    if (wikiUrl) {
      spotImageCache.set(query, wikiUrl);
      return Response.redirect(wikiUrl, 302);
    }
    const fallback = getCategoryFallback();
    spotImageCache.set(query, fallback);
    return Response.redirect(fallback, 302);
  }
  if (pathname === "/api/destinations" && request.method === "GET") {
    const DEST_CACHE_KEY = "__destinations_response__";
    const destCached = validatedCoverCache.get(DEST_CACHE_KEY);
    if (destCached && Date.now() - destCached.ts < 30 * 6e4) {
      return apiJson(JSON.parse(destCached.url));
    }
    try {
      const pool = await getN8nPool();
      if (pool) {
        const { rows } = await pool.query(`
          SELECT country, COUNT(*) AS route_count
          FROM routes WHERE status = 'published'
          GROUP BY country ORDER BY COUNT(*) DESC
        `);
        const countryRouteCount = /* @__PURE__ */ new Map();
        for (const r of rows) {
          const country = r.country || "";
          if (country) countryRouteCount.set(country, Number(r.route_count) || 0);
        }
        const regionMap2 = [
          { region: "中国", countries: ["中国"] },
          { region: "东亚", countries: ["日本", "韩国"] },
          { region: "东南亚", countries: ["泰国", "新加坡", "马来西亚", "越南", "印度尼西亚", "菲律宾", "柬埔寨", "斯里兰卡", "马尔代夫", "尼泊尔", "印度"] },
          { region: "欧洲", countries: ["法国", "英国", "意大利", "西班牙", "德国", "瑞士", "冰岛", "希腊", "葡萄牙", "荷兰", "挪威", "克罗地亚"] },
          { region: "北美", countries: ["美国", "加拿大", "墨西哥"] },
          { region: "南美", countries: ["秘鲁", "阿根廷", "巴西"] },
          { region: "大洋洲", countries: ["澳洲", "澳大利亚", "新西兰", "斐济"] },
          { region: "非洲与中东", countries: ["摩洛哥", "埃及", "土耳其", "以色列", "约旦", "南非", "迪拜", "阿联酋"] }
        ];
        const placedCountries = /* @__PURE__ */ new Set();
        for (const rm of regionMap2) for (const c of rm.countries) placedCountries.add(c);
        const extraCountries = /* @__PURE__ */ new Set();
        for (const r of rows) {
          const country = r.country || "";
          if (country && !placedCountries.has(country)) extraCountries.add(country);
        }
        const allCountries = [];
        for (const { countries } of regionMap2) {
          for (const c of countries) {
            if (countryRouteCount.has(c) || countryRouteCount.has(c === "澳洲" ? "澳大利亚" : c)) {
              allCountries.push(c);
            }
          }
        }
        for (const c of extraCountries) allCountries.push(c);
        const coverPromises = allCountries.map(async (country) => {
          const searchTerm = citySearchTerms[country] || `${country} 著名景点`;
          try {
            const url2 = await resolveValidCoverUrl(searchTerm);
            return [country, url2];
          } catch {
            return [country, getRouteCoverUrl(country)];
          }
        });
        const timeout = new Promise((resolve) => setTimeout(() => resolve("timeout"), 8e3));
        const raceResult = await Promise.race([Promise.all(coverPromises), timeout]);
        const coverMap = /* @__PURE__ */ new Map();
        if (raceResult === "timeout") {
          for (const country of allCountries) {
            const cached = validatedCoverCache.get(citySearchTerms[country] || `${country} 著名景点`);
            coverMap.set(country, cached ? cached.url : getRouteCoverUrl(country));
          }
          Promise.all(coverPromises).catch(() => {
          });
        } else {
          for (const [country, url2] of raceResult) coverMap.set(country, url2);
        }
        const groups = regionMap2.map(({ region, countries }) => {
          const destinations = [];
          for (const country of countries) {
            const displayName = country === "澳大利亚" ? "澳洲" : country;
            const totalRoutes = countryRouteCount.get(country) || 0;
            if (totalRoutes > 0) {
              destinations.push({
                name: displayName,
                routes: totalRoutes,
                cover: coverMap.get(country) || getRouteCoverUrl(country)
              });
            }
          }
          return { region, destinations };
        }).filter((g) => g.destinations.length > 0);
        if (extraCountries.size > 0) {
          const otherDests = [];
          for (const country of extraCountries) {
            const totalRoutes = countryRouteCount.get(country) || 0;
            if (totalRoutes > 0) {
              otherDests.push({
                name: country,
                routes: totalRoutes,
                cover: coverMap.get(country) || getRouteCoverUrl(country)
              });
            }
          }
          if (otherDests.length > 0) {
            groups.push({ region: "其他", destinations: otherDests.sort((a, b) => b.routes - a.routes) });
          }
        }
        if (groups.length > 0) {
          validatedCoverCache.set(DEST_CACHE_KEY, { url: JSON.stringify(groups), ts: Date.now() });
          return apiJson(groups);
        }
      }
    } catch (err) {
      console.error("[destinations] DB query failed, falling back to hardcoded:", err);
    }
    return apiJson(getDestinationsByRegion());
  }
  if (pathname === "/api/explore" && request.method === "GET") {
    const dest = url.searchParams.get("dest") ?? "";
    const hardcoded = getExploreRoutes(dest);
    let n8nExplore = [];
    try {
      const pool = await getN8nPool();
      if (pool) {
        const n8nSql = `
          SELECT r.id, r.route_title, r.city, r.country, r.destination,
                 r.route_theme, r.summary, r.days_count, r.budget_level,
                 r.travel_type, r.tags, r.cover_url, r.likes, r.quality_score,
                 COUNT(ip.id)::int AS total_spots
          FROM routes r
          LEFT JOIN itinerary_days d ON d.route_id = r.id
          LEFT JOIN itinerary_places ip ON ip.day_id = d.id
          WHERE r.status = 'published'
            ${dest ? "AND r.destination = $1" : ""}
          GROUP BY r.id
          ORDER BY r.quality_score DESC, r.created_at DESC
          LIMIT ${dest ? "20" : "60"}
        `;
        const n8nRes = await pool.query(n8nSql, dest ? [dest] : []);
        const cityIndex = /* @__PURE__ */ new Map();
        n8nExplore = n8nRes.rows.map((r) => {
          const city = r.city || "";
          const idx = cityIndex.get(city) ?? 0;
          cityIndex.set(city, idx + 1);
          return {
            id: `n8n-${r.id}`,
            title: r.route_title || "AI 精选路线",
            days: Number(r.days_count) || 5,
            spots: Number(r.total_spots) || 0,
            source: "AI 智能生成",
            sourceName: "Routey AI",
            sourceVerified: true,
            qualityScore: Number(r.quality_score) || 80,
            includes: void 0,
            likes: Number(r.likes) || 0,
            cover: r.cover_url || getRouteSpecificCover(
              city,
              r.route_title || "",
              r.route_theme || "",
              r.tags || "",
              idx
            ),
            tags: r.tags ? String(r.tags).split(",").map((t) => t.trim()) : [],
            profileKey: `n8n-${r.id}`
          };
        });
      }
    } catch (e) {
      console.warn("[n8n explore] Failed to fetch n8n routes:", e);
    }
    return apiJson([...n8nExplore, ...hardcoded]);
  }
  if (pathname === "/api/explore/add" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = exploreAddSchema.safeParse(body);
    if (!parsed.success) return apiError(400, "请提供有效的路线 ID");
    const { routeId } = parsed.data;
    if (routeId.startsWith("n8n-")) {
      const pool = await getN8nPool();
      if (!pool) return apiError(500, "n8n 数据库未连接");
      const dbId = Number(routeId.replace("n8n-", ""));
      const routeRes = await pool.query("SELECT * FROM routes WHERE id = $1", [dbId]);
      if (routeRes.rows.length === 0) return apiError(404, "路线不存在");
      const daysRes = await pool.query(
        "SELECT * FROM itinerary_days WHERE route_id = $1 ORDER BY day_number",
        [dbId]
      );
      const dayIds = daysRes.rows.map((d) => d.id);
      let places = [];
      if (dayIds.length > 0) {
        const pRes = await pool.query(
          `SELECT * FROM itinerary_places WHERE day_id = ANY($1) ORDER BY day_id, place_order`,
          [dayIds]
        );
        places = pRes.rows;
      }
      const assembledDays = daysRes.rows.map((day) => ({
        ...day,
        places: places.filter((p) => p.day_id === day.id)
      }));
      const n8nTrip = n8nRouteToTrip(routeRes.rows[0], assembledDays);
      n8nTrip.id = `trip-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
      return apiJson(await repository.saveUserTrip(n8nTrip, ownerId), 201);
    }
    const trip = addExploreRouteToTrips(routeId, await repository.listUserTrips(ownerId));
    if (trip) {
      return apiJson(await repository.saveUserTrip(trip, ownerId), 201);
    }
    const routeInfo = getExploreRouteInfo(routeId);
    if (!routeInfo) return apiError(404, "路线不存在");
    const jobId = `job-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const aiContent = `${routeInfo.destination} ${routeInfo.title}，${routeInfo.days}天精品行程，关键词：${routeInfo.tags.join("、")}。路线来源：${routeInfo.source}。请生成至少12个真实地点，覆盖景点、餐厅/美食、酒店/住宿、购物、休闲体验，并保留合理每日路线。`;
    const job = {
      id: jobId,
      kind: "text",
      content: aiContent,
      createdAt: Date.now(),
      status: "processing",
      progress: 5,
      steps: AI_STEPS.map((label, i) => ({
        label,
        state: i === 0 ? "active" : "pending"
      }))
    };
    importJobs.set(jobId, job);
    processImportJob(job, env2, ownerId).catch(
      (err) => console.error("[Explore AI] Unhandled:", err)
    );
    return apiJson({ aiJobId: jobId, title: routeInfo.title }, 202);
  }
  if (pathname === "/api/quiz-recommend" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = quizAnswersSchema.safeParse(body);
    if (!parsed.success) return apiError(400, "请填写完整的旅行偏好");
    const answers = parsed.data;
    const dbMatches = matchQuizToRoutes(answers);
    const aiId = `ai-${Date.now().toString(36)}`;
    const aiRoute = { id: aiId, status: "generating" };
    quizAiJobs.set(aiId, { status: "generating" });
    generateQuizTrip(answers).then(async (trip) => {
      const optimized = optimizeTrip(trip);
      await repository.saveUserTrip(optimized, ownerId);
      quizAiJobs.set(aiId, { status: "done", tripId: optimized.id, tripName: optimized.name });
      console.log(`[Quiz AI] Trip "${optimized.name}" generated`);
    }).catch((err) => {
      console.error("[Quiz AI] Failed:", err);
      quizAiJobs.set(aiId, { status: "error" });
    });
    return apiJson({ dbMatches, aiRoutes: [aiRoute] });
  }
  if (pathname === "/api/quiz-ai-status" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = quizAiStatusSchema.safeParse(body);
    if (!parsed.success) return apiError(400, "请提供有效的任务 ID 列表");
    const { ids } = parsed.data;
    const routes = ids.map((id) => {
      const job = quizAiJobs.get(id);
      return job ? { id, ...job } : { id, status: "error" };
    });
    return apiJson({ routes });
  }
  if (pathname === "/api/n8n-routes" && request.method === "GET") {
    const pool = await getN8nPool();
    if (!pool) return apiError(500, "n8n 数据库未连接");
    const dest = url.searchParams.get("destination") || "";
    const limit = Math.min(Number(url.searchParams.get("limit")) || 20, 100);
    let sql = `
      SELECT id, route_title, city, country, destination, route_theme,
             summary, days_count, budget_level, travel_type, tags,
             cover_url, likes, quality_score, created_at
      FROM routes
      WHERE status = 'published'
    `;
    const params = [];
    if (dest) {
      params.push(dest);
      sql += ` AND destination = $${params.length}`;
    }
    sql += ` ORDER BY quality_score DESC, created_at DESC`;
    params.push(limit);
    sql += ` LIMIT $${params.length}`;
    const result = await pool.query(sql, params);
    const featuredCityIdx = /* @__PURE__ */ new Map();
    const rows = result.rows.map((r) => {
      const city = r.city || "";
      const idx = featuredCityIdx.get(city) ?? 0;
      featuredCityIdx.set(city, idx + 1);
      return {
        ...r,
        cover_url: r.cover_url || getRouteSpecificCover(
          city,
          r.route_title || "",
          r.route_theme || "",
          r.tags || "",
          idx
        )
      };
    });
    return apiJson(rows);
  }
  if (pathname === "/api/n8n-route-detail" && request.method === "GET") {
    const pool = await getN8nPool();
    if (!pool) return apiError(500, "n8n 数据库未连接");
    const routeId = Number(url.searchParams.get("id"));
    if (!routeId) return apiError(400, "缺少 id 参数");
    const routeRes = await pool.query("SELECT * FROM routes WHERE id = $1", [routeId]);
    if (routeRes.rows.length === 0) return apiError(404, "路线不存在");
    const route = routeRes.rows[0];
    const daysRes = await pool.query(
      "SELECT * FROM itinerary_days WHERE route_id = $1 ORDER BY day_number",
      [routeId]
    );
    const dayIds = daysRes.rows.map((d) => d.id);
    let places = [];
    if (dayIds.length > 0) {
      const placesRes = await pool.query(
        `SELECT * FROM itinerary_places
         WHERE day_id = ANY($1)
         ORDER BY day_id, place_order`,
        [dayIds]
      );
      places = placesRes.rows;
    }
    const days = daysRes.rows.map((day) => ({
      ...day,
      places: places.filter(
        (p) => p.day_id === day.id
      )
    }));
    const trip = n8nRouteToTrip(route, days);
    return apiJson({ route, trip });
  }
  return apiError(404, "接口不存在");
}
const server = {
  async fetch(request, env2, ctx) {
    try {
      const apiResponse = await handleApiRequest(request, env2);
      if (apiResponse) return apiResponse;
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env2, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  }
};
const workerEntry = server ?? {};
export {
  enumType as e,
  objectType as o,
  renderErrorPage as r,
  stringType as s,
  workerEntry as w
};
