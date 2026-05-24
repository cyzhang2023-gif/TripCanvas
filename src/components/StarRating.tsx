import { useState } from "react";

/**
 * Custom SVG star with rounded points — luxury editorial feel.
 * Supports full, half, and empty states via gradient clipping.
 */
function StarIcon({
  fill,
  size = 24,
  className = "",
}: {
  /** 0 = empty, 0.5 = half, 1 = full */
  fill: number;
  size?: number;
  className?: string;
}) {
  const uid = `star-grad-${Math.random().toString(36).slice(2, 6)}`;
  // Rounded 5-point star path (viewBox 0 0 24 24)
  const starPath =
    "M12 2.5c.3 0 .6.18.74.46l2.46 5.04 5.52.8a.83.83 0 0 1 .46 1.42L17.2 14.1l.94 5.48a.83.83 0 0 1-1.2.87L12 17.77l-4.94 2.68a.83.83 0 0 1-1.2-.87l.94-5.48L2.82 10.22a.83.83 0 0 1 .46-1.42l5.52-.8 2.46-5.04A.83.83 0 0 1 12 2.5Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <defs>
        {/* Amber gradient for filled portion */}
        <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        {/* Clip for half-star */}
        <clipPath id={`${uid}-clip`}>
          <rect x="0" y="0" width={fill >= 1 ? 24 : fill > 0 ? 12 : 0} height="24" />
        </clipPath>
      </defs>
      {/* Empty star background: subtle gray with dotted feel */}
      <path
        d={starPath}
        fill="none"
        stroke="#d1d5db"
        strokeWidth="1"
        strokeDasharray="2 1"
      />
      {/* Filled portion */}
      {fill > 0 && (
        <path
          d={starPath}
          fill={`url(#${uid}-fill)`}
          clipPath={`url(#${uid}-clip)`}
        />
      )}
    </svg>
  );
}

export function StarRating({
  value = 0,
  onChange,
  size = 28,
  gap = 4,
  readonly = false,
}: {
  value?: number;
  onChange?: (score: number) => void;
  size?: number;
  gap?: number;
  readonly?: boolean;
}) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [justSelected, setJustSelected] = useState(false);

  const displayValue = hoverValue ?? value;

  const handleClick = (star: number) => {
    if (readonly) return;
    onChange?.(star);
    setJustSelected(true);
    setTimeout(() => setJustSelected(false), 400);
  };

  const handleMouseMove = (e: React.MouseEvent, star: number) => {
    if (readonly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = x < rect.width / 2;
    setHoverValue(half ? star - 0.5 : star);
  };

  return (
    <div
      className="inline-flex items-center"
      style={{ gap }}
      onMouseLeave={() => setHoverValue(null)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fillLevel =
          displayValue >= star ? 1 : displayValue >= star - 0.5 ? 0.5 : 0;
        const isHovered = hoverValue !== null && star <= Math.ceil(hoverValue);
        const isPulse = justSelected && star <= Math.ceil(value);

        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(hoverValue !== null ? (hoverValue >= star - 0.5 && hoverValue < star ? star - 0.5 : star) : star)}
            onMouseMove={(e) => handleMouseMove(e, star)}
            disabled={readonly}
            className="relative transition-transform duration-200 ease-out disabled:cursor-default"
            style={{
              transform: isHovered && !readonly ? "scale(1.2) rotate(-6deg)" : "scale(1)",
              animation: isPulse ? "starPulse 400ms ease-out" : undefined,
            }}
            aria-label={`${star} 星`}
          >
            <StarIcon fill={fillLevel} size={size} />
          </button>
        );
      })}
      <style>{`
        @keyframes starPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
