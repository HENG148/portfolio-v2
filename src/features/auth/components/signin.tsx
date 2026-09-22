"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth/auth-client";

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message ?? "Invalid email or password");
      return;
    }

    router.push("/dashboard/about");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="rounded-lg border border-zinc-800 bg-[#0d0d0d] overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="ml-2 text-[11px] font-mono text-zinc-500">login.sh</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            <div>
              <p className="font-mono text-[13px] text-green-400/80 mb-1">
                <span className="text-zinc-600">$</span> login --user
              </p>
              <h1 className="text-xl font-bold text-white">Sign in</h1>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full bg-[#111] border border-zinc-800 rounded-md p-2.5 text-sm text-white outline-none focus:border-zinc-600"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#111] border border-zinc-800 rounded-md p-2.5 text-sm text-white outline-none focus:border-zinc-600"
              />
            </div>

            {error && (
              <p className="font-mono text-[13px] text-red-400/80">
                <span className="text-zinc-600">!</span> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-white text-black text-sm font-medium py-2.5 rounded-md disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}