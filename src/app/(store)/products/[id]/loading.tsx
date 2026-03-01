export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-16 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-2xl bg-white/5" />
        <div className="space-y-6 py-4">
          <div className="h-4 w-20 bg-white/5 rounded" />
          <div className="h-8 w-3/4 bg-white/5 rounded-lg" />
          <div className="h-6 w-32 bg-white/5 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/5 rounded" />
            <div className="h-4 w-5/6 bg-white/5 rounded" />
            <div className="h-4 w-2/3 bg-white/5 rounded" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-10 rounded-lg bg-white/5" />
            ))}
          </div>
          <div className="h-12 w-36 rounded-lg bg-white/5" />
          <div className="flex gap-3">
            <div className="flex-1 h-14 rounded-lg bg-white/5" />
            <div className="flex-1 h-14 rounded-lg bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
