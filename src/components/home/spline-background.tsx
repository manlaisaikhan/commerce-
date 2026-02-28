"use client";

import dynamic from "next/dynamic";

const SplineScene = dynamic(() => import("@/components/spline-scene"), {
  ssr: false,
  loading: () => null,
});

export function SplineBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <SplineScene />
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
}
