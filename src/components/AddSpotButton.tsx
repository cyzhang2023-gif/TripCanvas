import { Clock, MapPin, Plus, Save, Tag, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { PoiCategory } from "@/lib/tripTypes";

const categories: PoiCategory[] = ["景点", "美食", "购物", "住宿", "休闲"];

type AddSpotButtonProps = {
  onAdd: (data: { title: string; desc: string; category: PoiCategory; time: string }) => void;
};

export function AddSpotButton({ onAdd }: AddSpotButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-violet-300 py-3 text-[12px] font-bold text-violet-500 transition-all hover:border-violet-400 hover:bg-violet-50 active:scale-[0.98]"
        style={{
          animation: "pulseGlow 2s ease-in-out infinite",
        }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition-transform group-hover:scale-110">
          <Plus className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        添加地点
      </button>

      {open && (
        <AddSpotModal
          onAdd={(data) => {
            onAdd(data);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      )}

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
          50% { box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1); }
        }
      `}</style>
    </>
  );
}

function AddSpotModal({
  onAdd,
  onClose,
}: {
  onAdd: (data: { title: string; desc: string; category: PoiCategory; time: string }) => void;
  onClose: () => void;
}) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("10:00");
  const [category, setCategory] = useState<PoiCategory>("景点");

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 320);
  };

  const handleSave = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), desc: desc.trim(), category, time });
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
        className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: "75vh",
          transform: entered && !closing ? "translateY(0)" : "translateY(100%)",
          opacity: entered && !closing ? 1 : 0,
          transition: "transform 400ms cubic-bezier(.32,.72,0,1), opacity 300ms ease",
        }}
      >
        {/* Drag handle bar */}
        <div className="flex justify-center py-2.5">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3">
          <h3 className="text-[16px] font-bold text-slate-900">添加新地点</h3>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 active:bg-gray-200"
            aria-label="关闭"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 px-5 pb-8">
          {/* Title */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
              <MapPin className="h-3.5 w-3.5" /> 地点名称 *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[14px] font-medium text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              placeholder="输入地点名称"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
              <Tag className="h-3.5 w-3.5" /> 描述
            </label>
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[13px] text-slate-700 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              placeholder="简短描述（选填）"
            />
          </div>

          {/* Time */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
              <Clock className="h-3.5 w-3.5" /> 时间
            </label>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              placeholder="例如: 10:00"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
              <Tag className="h-3.5 w-3.5" /> 分类
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                    category === cat
                      ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleClose}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-[13px] font-semibold text-gray-600 transition active:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-[13px] font-bold text-white shadow-lg shadow-violet-200 transition active:scale-[0.98] disabled:opacity-50"
            >
              <Save className="h-4 w-4" /> 添加
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
