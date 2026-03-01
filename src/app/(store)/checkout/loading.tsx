export default function Loading() {
  return (
    <div className="pt-10 pb-16 px-4 animate-pulse">
      <div className="max-w-2xl mx-auto">
        <div className="h-8 w-40 bg-white/5 rounded-lg mb-10" />
        <div className="space-y-6">
          <div>
            <div className="h-3 w-28 bg-white/5 rounded mb-2" />
            <div className="h-12 rounded-lg bg-white/5" />
          </div>
          <div>
            <div className="h-3 w-32 bg-white/5 rounded mb-2" />
            <div className="h-48 rounded-lg bg-white/5" />
          </div>
          <div className="h-12 rounded-lg bg-white/5" />
          <div>
            <div className="h-3 w-24 bg-white/5 rounded mb-2" />
            <div className="h-20 rounded-lg bg-white/5" />
          </div>
          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <div className="h-5 w-32 bg-white/10 rounded mb-4" />
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-36 bg-white/10 rounded" />
                  <div className="h-4 w-20 bg-white/10 rounded" />
                </div>
              ))}
            </div>
            <div className="h-px bg-white/10 my-4" />
            <div className="flex justify-between">
              <div className="h-5 w-12 bg-white/10 rounded" />
              <div className="h-5 w-24 bg-white/10 rounded" />
            </div>
          </div>
          <div className="h-14 rounded-lg bg-white/5" />
        </div>
      </div>
    </div>
  );
}
