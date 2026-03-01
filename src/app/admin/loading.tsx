export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-7 w-40 bg-white/5 rounded-lg" />
        <div className="h-4 w-32 bg-white/[0.03] rounded mt-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { color: "bg-blue-500/10" },
          { color: "bg-green-500/10" },
          { color: "bg-orange-500/10" },
        ].map((card, i) => (
          <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-3">
              <div className="h-3.5 w-20 bg-white/5 rounded" />
              <div className={`w-5 h-5 rounded ${card.color}`} />
            </div>
            <div className="h-7 w-12 bg-white/5 rounded" />
          </div>
        ))}
      </div>

      <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded bg-green-500/10" />
          <div className="h-3.5 w-24 bg-white/5 rounded" />
        </div>
        <div className="h-9 w-44 bg-white/5 rounded mt-1" />
      </div>

      <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded bg-white/5" />
          <div className="h-5 w-40 bg-white/5 rounded" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              <div className="space-y-1">
                <div className="h-4 w-20 bg-white/5 rounded" />
                <div className="h-3 w-32 bg-white/[0.03] rounded" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-24 bg-yellow-500/10 rounded-full" />
                <div className="h-4 w-20 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
