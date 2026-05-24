import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RATING_TAGS, addRating, hasUserRated } from "@/lib/ratingStore";
import { StarRating } from "./StarRating";

export function RatingModal({
  routeId,
  routeName,
  onClose,
  onSubmitted,
}: {
  routeId: string;
  routeName?: string;
  onClose: () => void;
  onSubmitted?: () => void;
}) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const alreadyRated = hasUserRated(routeId);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 350);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSubmit = () => {
    if (score === 0 || submitting) return;
    setSubmitting(true);
    // Simulate brief delay for UX
    setTimeout(() => {
      addRating(routeId, score, selectedTags, comment);
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        onSubmitted?.();
        handleClose();
      }, 1200);
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        background: entered && !closing ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
        transition: "background 300ms ease",
      }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-t-[28px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: "85vh",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transform: entered && !closing ? "translateY(0)" : "translateY(100%)",
          opacity: entered && !closing ? 1 : 0,
          transition:
            "transform 400ms cubic-bezier(.32,.72,0,1), opacity 300ms ease",
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 active:bg-gray-200"
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </button>

        {success ? (
          <SuccessView />
        ) : (
          <div className="overflow-y-auto px-6 pb-8" style={{ maxHeight: "calc(85vh - 48px)" }}>
            {/* Title */}
            <h2 className="mt-2 text-center text-[18px] font-bold text-gray-900">
              为路线评分
            </h2>
            {routeName && (
              <p className="mt-1 text-center text-[12px] text-gray-400 line-clamp-1">
                {routeName}
              </p>
            )}

            {alreadyRated && (
              <p className="mt-2 text-center text-[11px] text-amber-600">
                你已评过此路线，再次提交将追加新评分
              </p>
            )}

            {/* Star selector */}
            <div className="mt-5 flex flex-col items-center">
              <StarRating value={score} onChange={setScore} size={36} gap={8} />
              <p className="mt-2 text-[13px] font-medium text-gray-500">
                {score === 0
                  ? "点击星星评分"
                  : score <= 1
                    ? "不太满意"
                    : score <= 2
                      ? "一般般"
                      : score <= 3
                        ? "还不错"
                        : score <= 4
                          ? "很满意"
                          : "非常棒!"}
              </p>
            </div>

            {/* Tag cloud */}
            <div className="mt-6">
              <p className="mb-2.5 text-[13px] font-semibold text-gray-700">
                选择标签
              </p>
              <div className="flex flex-wrap gap-2">
                {RATING_TAGS.map((tag, i) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className="flex items-center gap-1 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all duration-200"
                      style={{
                        animationDelay: `${i * 40}ms`,
                        animation: entered ? `tagEnter 300ms ${i * 40}ms both` : undefined,
                        borderColor: isSelected ? "transparent" : "#e5e7eb",
                        background: isSelected
                          ? "linear-gradient(135deg, #8b5cf6, #6366f1)"
                          : "white",
                        color: isSelected ? "white" : "#4b5563",
                        transform: isSelected ? "scale(1.02)" : "scale(1)",
                      }}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment */}
            <div className="mt-5">
              <p className="mb-2 text-[13px] font-semibold text-gray-700">
                说点什么 <span className="font-normal text-gray-400">(可选)</span>
              </p>
              <textarea
                ref={commentRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="分享你的旅行体验..."
                maxLength={300}
                rows={3}
                className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] text-gray-700 placeholder-gray-400 outline-none transition-colors focus:border-violet-300 focus:bg-white"
              />
              <p className="mt-1 text-right text-[10px] text-gray-400">
                {comment.length}/300
              </p>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={score === 0 || submitting}
              className="mt-4 flex h-[48px] w-full items-center justify-center rounded-2xl text-[15px] font-bold text-white shadow-lg transition-all duration-200 disabled:opacity-50"
              style={{
                background: score > 0
                  ? "linear-gradient(135deg, #8b5cf6, #4f46e5)"
                  : "#d1d5db",
                boxShadow: score > 0
                  ? "0 8px 24px rgba(79,70,229,0.3)"
                  : "none",
              }}
            >
              {submitting ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "提交评分"
              )}
            </button>
          </div>
        )}

        <style>{`
          @keyframes tagEnter {
            from { opacity: 0; transform: translateY(8px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}

/** Sparkle success animation */
function SuccessView() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      <div className="relative flex h-20 w-20 items-center justify-center">
        {/* Sparkles */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <span
            key={deg}
            className="absolute h-2 w-2 rounded-full"
            style={{
              background: i % 2 === 0 ? "#F59E0B" : "#8b5cf6",
              transform: `rotate(${deg}deg) translateY(-32px)`,
              animation: `sparkle 600ms ${i * 60}ms ease-out both`,
            }}
          />
        ))}
        <Check className="h-10 w-10 text-green-500" style={{ animation: "scaleIn 400ms ease-out" }} />
      </div>
      <p className="mt-4 text-[16px] font-bold text-gray-900">评分成功</p>
      <p className="mt-1 text-[12px] text-gray-400">感谢你的评价!</p>
      <style>{`
        @keyframes sparkle {
          0% { opacity: 0; transform: rotate(var(--r, 0deg)) translateY(-16px) scale(0); }
          50% { opacity: 1; transform: rotate(var(--r, 0deg)) translateY(-36px) scale(1.2); }
          100% { opacity: 0; transform: rotate(var(--r, 0deg)) translateY(-48px) scale(0); }
        }
        @keyframes scaleIn {
          0% { transform: scale(0); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
