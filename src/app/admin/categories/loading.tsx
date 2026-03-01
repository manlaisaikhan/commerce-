export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-28 bg-white/5 rounded-lg" />
          <div className="h-4 w-44 bg-white/5 rounded mt-2" />
        </div>
        <div className="h-10 w-24 bg-white/5 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="w-full h-32 rounded-lg bg-white/10 mb-3" />
            <div className="h-5 w-28 bg-white/10 rounded mb-2" />
            <div className="h-3 w-20 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
