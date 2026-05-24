import { Clock, MapPin, Save, Tag, Type, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Spot } from "@/lib/tripTypes";
import type { PoiCategory } from "@/lib/tripTypes";

const categories: PoiCategory[] = ["景点", "美食", "购物", "住宿", "休闲"];

type EditSpotModalProps = {
  spot: Spot;
  onSave: (updated: Partial<Spot> & { id: string }) => void;
  onClose: () => void;
};

export function EditSpotModal({ spot, onSave, onClose }: EditSpotModalProps) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);

  const [title, setTitle] = useState(spot.title);
  const [desc, setDesc] = useState(spot.desc ?? "");
  const [time, setTime] = useState(spot.time);
  const [category, setCategory] = useState<PoiCategory>(spot.category ?? "景点");
  const [durationMin, setDurationMin] = useState(spot.durationMin ?? 60);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 320);
  };

  const handleSave = () => {
    onSave({
      id: spot.id,
      title: title.trim() || spot.title,
      desc: desc.trim(),
      time,
      category,
      durationMin,
    });
    handleClose();
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
          maxHeight: "80vh",
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
          <h3 className="text-[16px] font-bold text-slate-900">编辑地点</h3>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 active:bg-gray-200"
            aria-label="关闭"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 px-5 pb-8 overflow-y-auto" style={{ maxHeight: "calc(80vh - 120px)" }}>
          {/* Title */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
              <Type className="h-3.5 w-3.5" /> 名称
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[14px] font-medium text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              placeholder="地点名称"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
              <MapPin className="h-3.5 w-3.5" /> 描述
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={2}
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[13px] text-slate-700 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              placeholder="简短描述..."
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
              placeholder="例如: 09:00"
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

          {/* Duration */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
              <Clock className="h-3.5 w-3.5" /> 游玩时长 ({durationMin} 分钟)
            </label>
            <input
              type="range"
              min={15}
              max={300}
              step={15}
              value={durationMin}
              onChange={(e) => setDurationMin(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
            <div className="mt-1 flex justify-between text-[10px] text-gray-400">
              <span>15分钟</span>
              <span>5小时</span>
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
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-[13px] font-bold text-white shadow-lg shadow-violet-200 transition active:scale-[0.98]"
            >
              <Save className="h-4 w-4" /> 保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
