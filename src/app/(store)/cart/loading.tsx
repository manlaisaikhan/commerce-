export default function Loading() {
  return (
    <div className="pt-10 pb-16 px-4 animate-pulse">
      <div className="max-w-4xl mx-auto">
        <div className="h-8 w-24 bg-white/5 rounded-lg mb-10" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="w-20 h-20 rounded-lg bg-white/10" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 bg-white/10 rounded" />
                <div className="h-4 w-24 bg-white/10 rounded" />
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded bg-white/10" />
                  <div className="w-8 h-4 bg-white/10 rounded" />
                  <div className="w-7 h-7 rounded bg-white/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div className="h-6 w-32 bg-white/5 rounded" />
          <div className="h-12 w-40 rounded-lg bg-white/5" />
        </div>
      </div>
    </div>
  );
}
