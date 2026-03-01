export default function Loading() {
  return (
    <div className="pt-10 pb-16 px-4 animate-pulse">
      <div className="max-w-lg mx-auto">
        <div className="h-8 w-40 bg-white/[0.03] rounded-lg mb-8" />
        <div className="p-6 rounded-xl bg-white/[0.03] space-y-4">
          <div className="h-20 rounded-lg bg-white/[0.03]" />
          <div className="h-12 rounded-lg bg-white/[0.03]" />
          <div className="h-48 rounded-lg bg-white/[0.03]" />
          <div className="h-12 rounded-lg bg-white/[0.03]" />
          <div className="h-14 rounded-xl bg-white/[0.03]" />
        </div>
      </div>
    </div>
  );
}
