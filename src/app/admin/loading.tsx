export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-40 bg-white/5 rounded-lg" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/5">
            <div className="h-3 w-20 bg-white/10 rounded mb-3" />
            <div className="h-7 w-16 bg-white/10 rounded" />
          </div>
        ))}
      </div>
      <div className="p-5 rounded-xl border border-white/10 bg-white/5">
        <div className="h-5 w-36 bg-white/10 rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 rounded-lg bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
