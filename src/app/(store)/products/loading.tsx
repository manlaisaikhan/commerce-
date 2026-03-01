export default function Loading() {
  return (
    <div className="pt-8 pb-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square rounded-xl bg-white/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  );
}
