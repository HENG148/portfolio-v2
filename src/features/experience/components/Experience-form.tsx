"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ExperienceRow } from "@/src/db/table/experience.table";
import { createExperienceAction, updateExperienceAction } from "../action/experience";

interface ExperienceFormProps {
  initial?: ExperienceRow | null;
}

export default function ExperienceForm({ initial }: ExperienceFormProps) {
  const router = useRouter();
  const isEdit = !!initial;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [company, setCompany] = useState(initial?.company ?? "");
  const [period, setPeriod] = useState(initial?.period ?? "");
  const [bullets, setBullets] = useState<{ text: string }[]>(
    initial?.bullets ?? [{ text: "" }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      company,
      period,
      bullets: bullets.filter((b) => b.text.trim()),
      sortOrder: initial?.sortOrder ?? 0,
      isActive: initial?.isActive ?? true,
    };

    const result = isEdit
      ? await updateExperienceAction(initial!.id, payload)
      : await createExperienceAction(payload);

    setSaving(false);

    if (result?.success) {
      router.push("/dashboard/experience");
      router.refresh();
    } else {
      setError(result?.error ?? "Failed to save experience");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-[#111] border border-zinc-800 rounded-md p-2.5 text-sm text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Company</label>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="w-full bg-[#111] border border-zinc-800 rounded-md p-2.5 text-sm text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Period</label>
        <input
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="e.g. Jan 2023 – Present"
          required
          className="w-full bg-[#111] border border-zinc-800 rounded-md p-2.5 text-sm text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Bullets</label>
        <div className="flex flex-col gap-2">
          {bullets.map((b, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={b.text}
                onChange={(e) => {
                  const next = [...bullets];
                  next[i] = { text: e.target.value };
                  setBullets(next);
                }}
                className="flex-1 bg-[#111] border border-zinc-800 rounded-md p-2 text-sm text-white"
              />
              <button
                type="button"
                onClick={() => setBullets(bullets.filter((_, idx) => idx !== i))}
                className="text-zinc-500 hover:text-red-400 text-sm px-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setBullets([...bullets, { text: "" }])}
          className="mt-2 text-[13px] text-zinc-400 hover:text-white"
        >
          + Add bullet
        </button>
      </div>

      {error && <p className="text-[13px] text-red-400/80">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-white text-black text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update Experience" : "Create Experience"}
        </button>
      </div>
    </form>
  );
}