export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-36 bg-white/5 rounded-lg" />
          <div className="h-4 w-48 bg-white/5 rounded mt-2" />
        </div>
        <div className="h-10 w-32 bg-white/5 rounded-lg" />
      </div>
      {/* Filters */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-9 w-24 rounded-lg bg-white/5" />
        ))}
      </div>
      {/* Order cards */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-4 w-20 bg-white/10 rounded" />
                <div className="h-6 w-24 bg-white/10 rounded-full" />
              </div>
              <div className="h-4 w-28 bg-white/10 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 w-40 bg-white/10 rounded" />
              <div className="h-5 w-24 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
