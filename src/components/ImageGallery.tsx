import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set());

  // Track scroll position to update active dot
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIdx(Math.min(idx, images.length - 1));
  }, [images.length]);

  // Mark image as loaded
  const markLoaded = useCallback((i: number) => {
    setLoadedSet((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);

  if (images.length === 0) return null;

  return (
    <>
      {/* Horizontal scroll gallery */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ aspectRatio: "4/3" }}>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="relative h-full w-full shrink-0 snap-center"
              style={{ scrollSnapAlign: "center" }}
            >
              {/* Skeleton placeholder */}
              {!loadedSet.has(i) && (
                <div className="absolute inset-0 animate-pulse bg-white/10 rounded-2xl" />
              )}
              <img
                src={url}
                alt={`${title} ${i + 1}`}
                className="h-full w-full object-cover cursor-pointer"
                loading={i < 2 ? "eager" : "lazy"}
                onLoad={() => markLoaded(i)}
                onClick={() => {
                  setActiveIdx(i);
                  setFullscreen(true);
                }}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block h-[6px] w-[6px] rounded-full transition-all duration-200 ${
                  i === activeIdx
                    ? "bg-white scale-110"
                    : "bg-white/40 ring-1 ring-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen viewer */}
      {fullscreen && (
        <FullscreenViewer
          images={images}
          title={title}
          initialIdx={activeIdx}
          onClose={() => setFullscreen(false)}
        />
      )}
    </>
  );
}

/* ─── Fullscreen image viewer with swipe ─── */
function FullscreenViewer({
  images,
  title,
  initialIdx,
  onClose,
}: {
  images: string[];
  title: string;
  initialIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIdx);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to initial index on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = initialIdx * el.clientWidth;
  }, [initialIdx]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const newIdx = Math.round(el.scrollLeft / el.clientWidth);
    setIdx(Math.min(newIdx, images.length - 1));
  }, [images.length]);

  const goTo = (target: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: target * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm active:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-0 right-0 text-center text-sm text-white/70 font-medium">
        {idx + 1} / {images.length}
      </div>

      {/* Swipe container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onClick={(e) => e.stopPropagation()}
        className="no-scrollbar flex h-full w-full snap-x snap-mandatory items-center overflow-x-auto"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((url, i) => (
          <div key={i} className="flex h-full w-full shrink-0 snap-center items-center justify-center p-4">
            <img
              src={url}
              alt={`${title} ${i + 1}`}
              className="max-h-full max-w-full object-contain rounded-lg"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Prev/Next arrows on desktop */}
      {idx > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); goTo(idx - 1); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm active:bg-white/20"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {idx < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goTo(idx + 1); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm active:bg-white/20"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Bottom dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              className={`block h-2 w-2 rounded-full transition-all ${
                i === idx ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
