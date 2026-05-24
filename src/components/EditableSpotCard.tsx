import { GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Spot } from "@/lib/tripTypes";

type EditableSpotCardProps = {
  spot: Spot;
  dayColor: string;
  onDelete: () => void;
  onEdit: () => void;
  children: React.ReactNode;
};

/**
 * Wraps a SpotCard with edit controls: delete button, drag handle, and tap-to-edit.
 * Used when the trip page is in edit mode.
 */
export function EditableSpotCard({
  spot,
  dayColor,
  onDelete,
  onEdit,
  children,
}: EditableSpotCardProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div
      className="group relative"
      style={{
        animation: "wobble 0.8s ease-in-out infinite alternate",
      }}
    >
      {/* Drag handle */}
      <div
        className="absolute -left-1 top-1/2 z-10 flex -translate-y-1/2 cursor-grab items-center justify-center rounded-lg bg-white/80 p-1 shadow-sm backdrop-blur-sm active:cursor-grabbing"
        title="拖动排序"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      {/* Delete button */}
      {!confirming ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setConfirming(true);
          }}
          className="absolute -right-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white shadow-md transition-transform hover:scale-110"
          style={{
            animation: "popIn 0.3s cubic-bezier(.34,1.56,.64,1)",
          }}
          aria-label="删除"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      ) : (
        <div
          className="absolute -right-1 -top-1 z-10 flex items-center gap-1 rounded-full bg-white p-0.5 shadow-lg"
          style={{ animation: "popIn 0.2s ease" }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold text-white"
          >
            确认删除
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setConfirming(false);
            }}
            className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-600"
          >
            取消
          </button>
        </div>
      )}

      {/* Tap-to-edit wrapper around the card content */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="cursor-pointer rounded-xl transition-all hover:bg-[#fff0ed]/50"
        title="点击编辑"
      >
        {children}
      </div>

      <style>{`
        @keyframes wobble {
          0% { transform: rotate(-0.5deg); }
          100% { transform: rotate(0.5deg); }
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
