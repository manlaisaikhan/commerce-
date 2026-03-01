export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-28 bg-white/5 rounded-lg" />
          <div className="h-4 w-40 bg-white/[0.03] rounded mt-2" />
        </div>
        <div className="h-10 w-36 bg-white/5 rounded-lg" />
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          { w: "w-12", active: true },
          { w: "w-28", dot: "bg-yellow-400" },
          { w: "w-24", dot: "bg-green-400" },
          { w: "w-28", dot: "bg-blue-400" },
          { w: "w-24", dot: "bg-purple-400" },
          { w: "w-24", dot: "bg-emerald-400" },
          { w: "w-24", dot: "bg-red-400" },
        ].map((opt, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 h-8 rounded-lg px-3 ${
              opt.active ? "bg-white/10" : "bg-white/5"
            } ${opt.w}`}
          >
            {opt.dot && <div className={`w-1.5 h-1.5 rounded-full ${opt.dot}`} />}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {[
          "border-l-yellow-500/30",
          "border-l-green-500/30",
          "border-l-blue-500/30",
          "border-l-purple-500/30",
        ].map((border, i) => (
          <div key={i} className={`rounded-xl border border-white/10 bg-white/[0.02] border-l-4 ${border}`}>
            <div className="px-4 py-3.5 flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-white/5" />
              <div className="min-w-[110px] space-y-1.5">
                <div className="h-4 w-20 bg-white/5 rounded font-mono" />
                <div className="h-3 w-16 bg-white/[0.03] rounded" />
              </div>
              <div className="flex-1 hidden sm:block space-y-1.5">
                <div className="h-4 w-20 bg-white/5 rounded" />
                <div className="h-3 w-12 bg-white/[0.03] rounded" />
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <div className="hidden sm:block h-6 w-24 bg-white/5 rounded-full" />
                <div className="h-4 w-20 bg-white/5 rounded" />
                <div className="w-4 h-4 bg-white/[0.03] rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
