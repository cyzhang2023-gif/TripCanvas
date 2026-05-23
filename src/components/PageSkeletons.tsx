/** Page-level skeleton screens for route transitions */

import { Skeleton } from "./Skeleton";

/* ─── Explore page ─── */
export function ExplorePageSkeleton() {
  return (
    <div className="mx-auto max-w-[430px] animate-pulse">
      {/* Hero placeholder */}
      <div className="h-[260px] bg-gray-200" />

      {/* Content area */}
      <div className="-mt-4 rounded-t-[24px] bg-white px-3 pt-4">
        {/* Category tabs */}
        <div className="flex gap-3 pb-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-2.5 w-10 rounded-full" />
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 pb-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>

        {/* Route cards */}
        <div className="space-y-2.5 pb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[30%_1fr] gap-2 rounded-[16px] bg-white pr-1 shadow-sm"
            >
              <Skeleton className="h-[104px] rounded-[16px]" />
              <div className="space-y-2 py-3 pr-2">
                <Skeleton className="h-3.5 w-3/4 rounded-full" />
                <Skeleton className="h-3 w-full rounded-full" />
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-12 rounded-full" />
                  ))}
                </div>
                <Skeleton className="h-3 w-1/2 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Destinations page ─── */
export function DestinationsPageSkeleton() {
  return (
    <div className="mx-auto max-w-[430px] min-h-screen animate-pulse bg-background pb-20">
      {/* Header */}
      <div className="px-4 pt-[env(safe-area-inset-top,44px)]">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="mt-3 h-6 w-48 rounded-lg" />
        <Skeleton className="mt-2 h-3 w-36 rounded-full" />
      </div>

      {/* Search bar */}
      <div className="mx-4 mt-3">
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>

      {/* Sections */}
      <div className="mt-4 space-y-5 px-4">
        {/* Hero section */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-3 w-12 rounded-full" />
          </div>
          <Skeleton className="h-[160px] w-full rounded-2xl" />
        </div>

        {/* Grid sections */}
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i}>
            <div className="mb-2 flex items-center justify-between">
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-3 w-12 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-[96px] rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── My Trips page ─── */
export function MyTripsPageSkeleton() {
  return (
    <div className="mx-auto max-w-[430px] min-h-screen animate-pulse pb-24">
      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-5 pb-1">
        <div>
          <Skeleton className="h-5 w-28 rounded-lg" />
          <Skeleton className="mt-2 h-3 w-36 rounded-full" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-4 mt-2">
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>

      {/* Trip cards */}
      <div className="space-y-2.5 px-4 pt-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[18px] bg-gray-200 shadow-sm"
          >
            <div className="px-3 pt-7 pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/5 rounded-lg bg-gray-300" />
                  <Skeleton className="mt-1.5 h-3 w-1/3 rounded-full bg-gray-300" />
                </div>
                <Skeleton className="h-5 w-14 rounded-full bg-gray-300" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Skeleton className="h-3 w-28 rounded-full bg-gray-300" />
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-7 w-7 rounded-full bg-gray-300" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Budget page ─── */
export function BudgetPageSkeleton() {
  return (
    <div className="mx-auto max-w-[430px] min-h-screen animate-pulse bg-[#f5f6fa] pb-28">
      {/* Header */}
      <div className="flex items-center justify-center bg-white px-4 pt-[env(safe-area-inset-top,44px)] pb-2">
        <Skeleton className="h-5 w-20 rounded-lg" />
      </div>

      {/* Hero image */}
      <Skeleton className="h-[110px] w-full" />

      <div className="px-3 -mt-5 space-y-2.5 relative z-10">
        {/* Destination picker */}
        <div className="rounded-2xl bg-white p-3.5 shadow-sm">
          <Skeleton className="mb-2 h-4 w-24 rounded-full" />
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-16 rounded-full" />
            ))}
          </div>
        </div>

        {/* Route picker */}
        <div className="rounded-2xl bg-white p-3.5 shadow-sm">
          <Skeleton className="mb-2 h-4 w-20 rounded-full" />
          <div className="space-y-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-xl p-2">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-3/4 rounded-full" />
                  <Skeleton className="h-2.5 w-1/2 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget level */}
        <div className="rounded-2xl bg-white p-3.5 shadow-sm">
          <Skeleton className="mb-2 h-4 w-20 rounded-full" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center rounded-xl bg-gray-50 p-2.5">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="mt-1.5 h-3 w-12 rounded-full" />
                <Skeleton className="mt-1 h-2 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Total card */}
        <Skeleton className="h-[120px] w-full rounded-2xl bg-gray-300" />

        {/* Breakdown */}
        <div className="rounded-2xl bg-white p-3.5 shadow-sm">
          <Skeleton className="mb-3 h-4 w-20 rounded-full" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-16 rounded-full" />
                  <Skeleton className="mt-1 h-1.5 w-full rounded-full" />
                </div>
                <Skeleton className="h-3 w-12 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
