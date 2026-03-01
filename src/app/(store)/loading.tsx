export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-[70vh] bg-white/[0.03] rounded-b-3xl" />
      <div className="h-10 bg-white/[0.02] my-4" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[4/3] rounded-2xl bg-white/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  );
}
