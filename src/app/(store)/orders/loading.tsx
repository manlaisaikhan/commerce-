export default function Loading() {
  return (
    <div className="pt-10 pb-16 px-4 animate-pulse">
      <div className="max-w-4xl mx-auto">
        <div className="h-8 w-48 bg-white/[0.03] rounded-lg mb-8" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 rounded-xl bg-white/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  );
}
