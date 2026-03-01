export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-24 bg-white/5 rounded-lg" />
          <div className="h-4 w-40 bg-white/[0.03] rounded mt-2" />
        </div>
        <div className="h-10 w-24 bg-white/5 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5" />
              <div className="space-y-1.5">
                <div className="h-4 w-24 bg-white/5 rounded" />
                <div className="h-3 w-20 bg-white/[0.03] rounded" />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-lg bg-white/5" />
              <div className="w-8 h-8 rounded-lg bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
