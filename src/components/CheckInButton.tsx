import { Check, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { addCheckin, getSpotCheckin, type CheckIn } from "@/lib/checkinStore";

interface CheckInButtonProps {
  tripId: string;
  dayId: string;
  spotId: string;
  spotTitle: string;
  onCheckedIn?: () => void;
}

export function CheckInButton({ tripId, dayId, spotId, spotTitle, onCheckedIn }: CheckInButtonProps) {
  const [checkin, setCheckin] = useState<CheckIn | undefined>(() =>
    getSpotCheckin(tripId, spotId),
  );
  const [showSheet, setShowSheet] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [note, setNote] = useState("");
  const burstRef = useRef<HTMLDivElement>(null);

  const isChecked = !!checkin;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isChecked) {
        setShowDetail((v) => !v);
      } else {
        setShowSheet(true);
      }
    },
    [isChecked],
  );

  const handleCheckin = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const ci = addCheckin(tripId, dayId, spotId, spotTitle, note || undefined);
      setCheckin(ci);
      setShowSheet(false);
      setNote("");

      // Trigger animation
      setAnimating(true);
      setTimeout(() => setAnimating(false), 800);
      onCheckedIn?.();
    },
    [tripId, dayId, spotId, spotTitle, note, onCheckedIn],
  );

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative inline-flex" onClick={(e) => e.stopPropagation()}>
      {/* Main button */}
      <button
        onClick={handleClick}
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
          isChecked
            ? "h-7 w-7 bg-emerald-500 text-white shadow-md shadow-emerald-200"
            : "h-7 w-7 border-2 border-dashed border-gray-300 text-gray-400 hover:border-emerald-400 hover:text-emerald-500"
        }`}
        style={
          animating
            ? {
                animation: "checkinPop 600ms cubic-bezier(.34,1.56,.64,1) forwards",
              }
            : isChecked
              ? { animation: "checkinPulse 2s ease-in-out infinite" }
              : undefined
        }
        aria-label={isChecked ? "查看打卡" : "打卡"}
      >
        {isChecked ? (
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        ) : (
          <MapPin className="h-3.5 w-3.5" />
        )}

        {/* Burst particles */}
        {animating && (
          <div ref={burstRef} className="pointer-events-none absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-emerald-400"
                style={{
                  animation: `checkinBurst 600ms cubic-bezier(.25,.46,.45,.94) forwards`,
                  animationDelay: `${i * 30}ms`,
                  // Spread in 6 directions
                  "--burst-x": `${Math.cos((i * 60 * Math.PI) / 180) * 18}px`,
                  "--burst-y": `${Math.sin((i * 60 * Math.PI) / 180) * 18}px`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}
      </button>

      {/* Check-in detail tooltip */}
      {showDetail && checkin && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowDetail(false)} />
          <div className="absolute right-0 top-9 z-50 w-44 rounded-xl bg-white p-2.5 shadow-lg ring-1 ring-black/5">
            <p className="text-[10px] font-medium text-emerald-600">
              {formatTime(checkin.checkedAt)} 已打卡
            </p>
            {checkin.note && (
              <p className="mt-1 text-[11px] text-gray-600">{checkin.note}</p>
            )}
          </div>
        </>
      )}

      {/* Mini bottom sheet for check-in */}
      {showSheet && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={(e) => {
              e.stopPropagation();
              setShowSheet(false);
            }}
          />
          <div
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-2xl bg-white px-5 pb-8 pt-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "checkinSheetUp 300ms cubic-bezier(.32,.72,0,1) forwards",
            }}
          >
            <div className="mb-3 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-gray-200" />
            </div>
            <p className="text-[14px] font-bold text-gray-800">
              <MapPin className="mr-1 inline h-4 w-4 text-emerald-500" />
              打卡 · {spotTitle}
            </p>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="记录一下此刻的心情..."
              className="mt-3 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[13px] text-gray-700 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              autoFocus
            />
            <button
              onClick={handleCheckin}
              className="mt-3 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-2.5 text-[14px] font-bold text-white shadow-md shadow-emerald-200 active:scale-[0.98]"
            >
              打卡
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes checkinPop {
          0% { transform: scale(1); background: transparent; }
          30% { transform: scale(1.3); }
          50% { background: #10b981; }
          100% { transform: scale(1); background: #10b981; }
        }
        @keyframes checkinBurst {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% {
            transform: translate(
              calc(-50% + var(--burst-x)),
              calc(-50% + var(--burst-y))
            ) scale(0);
            opacity: 0;
          }
        }
        @keyframes checkinPulse {
          0%, 100% { box-shadow: 0 4px 6px -1px rgba(16,185,129,0.2), 0 0 0 0 rgba(16,185,129,0.15); }
          50% { box-shadow: 0 4px 6px -1px rgba(16,185,129,0.2), 0 0 0 4px rgba(16,185,129,0.08); }
        }
        @keyframes checkinSheetUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
