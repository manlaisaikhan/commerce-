export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-16 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-2xl bg-white/[0.03]" />
        <div className="space-y-4 py-4">
          <div className="h-8 w-3/4 bg-white/[0.03] rounded-lg" />
          <div className="h-6 w-32 bg-white/[0.03] rounded" />
          <div className="h-24 w-full bg-white/[0.03] rounded-lg" />
          <div className="h-14 w-40 bg-white/[0.03] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
