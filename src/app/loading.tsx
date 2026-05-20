export default function GlobalLoading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl space-y-4 rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
        <div className="h-5 w-32 animate-pulse rounded-full bg-white/10" />
        <div className="h-12 w-2/3 animate-pulse rounded-full bg-white/10" />
        <div className="h-5 w-full animate-pulse rounded-full bg-white/10" />
        <div className="h-5 w-5/6 animate-pulse rounded-full bg-white/10" />
      </div>
    </div>
  );
}
