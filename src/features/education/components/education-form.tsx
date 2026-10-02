"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Education } from "@/src/db/table/education.table";
import { saveEducationAction } from "../action";

const input =
  "w-full bg-[#111] border border-zinc-800 rounded-md p-2 text-sm text-white";

export default function EducationForm({ initial }: { initial: Education | null }) {
  const router = useRouter();
  const [school, setSchool] = useState(initial?.school ?? "");
  const [degree, setDegree] = useState(initial?.degree ?? "");
  const [period, setPeriod] = useState(initial?.period ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [msg, setMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    const res = await saveEducationAction(
      { school, degree, period, description: description || null, sortOrder },
      initial?.id
    );

    setSaving(false);
    if (res?.success) {
      router.push("/dashboard/education");
      router.refresh();
    } else setMsg(res?.error ?? "Failed to save");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">School</label>
        <input value={school} onChange={(e) => setSchool(e.target.value)} className={input} />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Degree</label>
        <input value={degree} onChange={(e) => setDegree(e.target.value)} className={input} />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Period</label>
        <input
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="2021 - 2025"
          className={input}
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={input}
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Sort order</label>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          className={input}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-white text-black text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {msg && <span className="text-[13px] text-red-400">{msg}</span>}
      </div>
    </form>
  );
}