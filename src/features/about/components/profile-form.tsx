"use client";

import { useState } from "react";
import { upsertAboutAction } from "../action";
import type { About } from "@/src/db/table/about.table";

export default function AboutForm({ initial }: { initial: About | null }) {
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [highlights, setHighlights] = useState<{ text: string }[]>(
    initial?.highlights ?? [{ text: "" }]
  );
  const [tags, setTags] = useState<{ label: string }[]>(
    initial?.tags ?? [{ label: "" }]
  );
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const result = await upsertAboutAction({
      bio,
      highlights: highlights.filter((h) => h.text.trim()),
      tags: tags.filter((t) => t.label.trim()),
      slides: initial?.slides ?? [],
    });

    setSaving(false);
    setStatus(result?.success ? "Saved" : result?.error ?? "Failed to save");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={5}
          className="w-full bg-[#111] border border-zinc-800 rounded-md p-3 text-sm text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Highlights</label>
        <div className="flex flex-col gap-2">
          {highlights.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={h.text}
                onChange={(e) => {
                  const next = [...highlights];
                  next[i] = { text: e.target.value };
                  setHighlights(next);
                }}
                className="flex-1 bg-[#111] border border-zinc-800 rounded-md p-2 text-sm text-white"
              />
              <button
                type="button"
                onClick={() => setHighlights(highlights.filter((_, idx) => idx !== i))}
                className="text-zinc-500 hover:text-red-400 text-sm px-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setHighlights([...highlights, { text: "" }])}
          className="mt-2 text-[13px] text-zinc-400 hover:text-white"
        >
          + Add highlight
        </button>
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Tags</label>
        <div className="flex flex-col gap-2">
          {tags.map((t, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={t.label}
                onChange={(e) => {
                  const next = [...tags];
                  next[i] = { label: e.target.value };
                  setTags(next);
                }}
                className="flex-1 bg-[#111] border border-zinc-800 rounded-md p-2 text-sm text-white"
              />
              <button
                type="button"
                onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
                className="text-zinc-500 hover:text-red-400 text-sm px-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setTags([...tags, { label: "" }])}
          className="mt-2 text-[13px] text-zinc-400 hover:text-white"
        >
          + Add tag
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-white text-black text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {status && <span className="text-[13px] text-zinc-400">{status}</span>}
      </div>
    </form>
  );
}