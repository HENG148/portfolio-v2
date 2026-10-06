"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col justify-center px-6 py-16">
      <p className="mb-2 font-mono text-[13px] text-red-400/80">
        <span className="text-zinc-600">$</span> error --last
      </p>
      <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">
        This page failed to load. You can try again, or head back home.
      </p>

      {error.digest && (
        <p className="mt-4 font-mono text-[12px] text-zinc-600">ref: {error.digest}</p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg border border-[#2a2a2a] px-4 py-2 text-[13px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-[#2a2a2a] px-4 py-2 text-[13px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}