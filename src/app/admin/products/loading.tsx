export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-36 bg-white/5 rounded-lg" />
          <div className="h-4 w-48 bg-white/[0.03] rounded mt-2" />
        </div>
        <div className="h-10 w-24 bg-white/5 rounded-lg" />
      </div>

      <div className="relative">
        <div className="h-11 rounded-lg bg-white/5" />
      </div>

      <div className="border border-white/10 rounded-xl overflow-hidden">
        <div className="bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-4 px-4 py-3">
            <div className="w-10 h-4 bg-white/10 rounded" />
            <div className="flex-1 h-4 bg-white/10 rounded" />
            <div className="w-20 h-4 bg-white/10 rounded" />
            <div className="w-12 h-4 bg-white/10 rounded" />
            <div className="w-12 h-4 bg-white/10 rounded" />
            <div className="w-16 h-4 bg-white/10 rounded" />
          </div>
        </div>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-white/5">
            <div className="w-10 h-10 rounded bg-white/5" />
            <div className="flex-1 space-y-1">
              <div className="h-4 w-40 bg-white/5 rounded" />
            </div>
            <div className="w-20 h-4 bg-white/5 rounded" />
            <div className="w-12 h-4 bg-white/5 rounded" />
            <div className="w-12 h-4 bg-white/5 rounded" />
            <div className="flex gap-1">
              <div className="w-8 h-8 rounded-lg bg-white/5" />
              <div className="w-8 h-8 rounded-lg bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
