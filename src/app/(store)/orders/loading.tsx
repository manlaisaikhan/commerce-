export default function Loading() {
  return (
    <div className="pt-10 pb-16 px-4 animate-pulse">
      <div className="max-w-4xl mx-auto">
        <div className="h-8 w-56 bg-white/5 rounded-lg mb-10" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <div className="h-3 w-24 bg-white/10 rounded" />
                  <div className="h-4 w-20 bg-white/10 rounded" />
                </div>
                <div className="h-7 w-28 bg-white/10 rounded-full" />
              </div>
              <div className="h-px bg-white/10 mb-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-40 bg-white/10 rounded" />
                  <div className="h-4 w-20 bg-white/10 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-32 bg-white/10 rounded" />
                  <div className="h-4 w-16 bg-white/10 rounded" />
                </div>
              </div>
              <div className="flex justify-between mt-4 pt-3 border-t border-white/10">
                <div className="h-5 w-12 bg-white/10 rounded" />
                <div className="h-5 w-24 bg-white/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
