import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useTripQuery } from "@/lib/tripStore";
import { ImportPreview } from "@/components/ImportPreview";

export const Route = createFileRoute("/preview")({
  component: PreviewPage,
  validateSearch: z.object({ tripId: z.string() }),
  head: () => ({ meta: [{ title: "导入预览 · Routey" }] }),
});

function PreviewPage() {
  const nav = useNavigate();
  const { tripId } = Route.useSearch();
  const { data: trip, isLoading, isError } = useTripQuery(tripId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--gradient-soft)" }}>
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (isError || !trip) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4" style={{ background: "var(--gradient-soft)" }}>
        <p className="text-sm text-gray-500">无法加载行程数据</p>
        <button
          type="button"
          onClick={() => nav({ to: "/import" })}
          className="rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-white"
        >
          返回导入
        </button>
      </div>
    );
  }

  return <ImportPreview trip={trip} />;
}
