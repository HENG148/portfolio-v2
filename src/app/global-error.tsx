"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body className="m-0 flex min-h-screen items-center justify-center bg-[#0a0a0a] font-mono text-white">
        <div className="max-w-110 p-6">
          <p className="mb-2 text-[13px] text-red-400">
            <span className="text-zinc-600">$</span> error --fatal
          </p>
          <h1 className="m-0 text-2xl">Something went wrong</h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            The site hit an unexpected error. Please try again.
          </p>
          {error.digest && (
            <p className="mt-4 text-xs text-zinc-600">ref: {error.digest}</p>
          )}
          <button
            onClick={reset}
            className="mt-6 cursor-pointer rounded-lg border border-[#2a2a2a] bg-transparent px-4 py-2 text-[13px] font-semibold text-white/80"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}