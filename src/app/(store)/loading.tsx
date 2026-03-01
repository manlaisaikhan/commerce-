export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-[70vh] bg-white/5 rounded-b-3xl" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-white/5 rounded-lg mb-8" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="aspect-square rounded-xl bg-white/5" />
              <div className="mt-3 space-y-2">
                <div className="h-4 w-3/4 bg-white/5 rounded" />
                <div className="h-4 w-1/3 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
