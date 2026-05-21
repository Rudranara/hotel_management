import { Database } from "lucide-react";

export function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300/15 ring-1 ring-amber-300/20">
          <Database size={24} className="text-amber-300" />
        </div>

        <p className="text-xs uppercase tracking-[0.4em] text-amber-200">Setup required</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Connect your database</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">
          Create a{" "}
          <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-xs text-amber-200">.env.local</code>{" "}
          file in your project root with the variables below, then restart the dev server.
        </p>

        {/* Code block */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 text-left">
          <div className="flex items-center gap-2 border-b border-white/8 bg-white/5 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-2 text-xs text-white/30">.env.local</span>
          </div>
          <div className="space-y-1.5 p-5 font-mono text-sm">
            <p className="text-white/30"># Required environment variables</p>
            <p className="mt-3">
              <span className="text-amber-200">MONGODB_URI</span>
              <span className="text-white/40">=</span>
              <span className="text-emerald-300">mongodb+srv://user:pass@cluster.mongodb.net/db</span>
            </p>
            <p>
              <span className="text-amber-200">JWT_SECRET</span>
              <span className="text-white/40">=</span>
              <span className="text-emerald-300">your-super-secret-key-min-32-chars</span>
            </p>
            <p>
              <span className="text-amber-200">ADMIN_EMAIL</span>
              <span className="text-white/40">=</span>
              <span className="text-emerald-300">admin@yourdomain.com</span>
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-white/35">
          After adding the file, run{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-white/55">npm run dev</code> to restart.
        </p>
      </div>
    </div>
  );
}
