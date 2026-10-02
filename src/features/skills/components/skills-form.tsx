"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SkillCategoryRow } from "@/src/db/table";
import { createSkillCategoryAction, updateSkillCategoryAction } from "../action/skill";

export default function SkillForm({ initial }: { initial?: SkillCategoryRow | null }) {
  const router = useRouter();
  const isEdit = !!initial;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [skills, setSkills] = useState<string[]>(
    initial?.skills?.length ? initial.skills : [""]
  );
  const [sortOrder, setSortOrder] = useState<number>(initial?.sortOrder ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      skills: skills.map((s) => s.trim()).filter(Boolean),
      sortOrder,
      isActive: initial?.isActive ?? true,
    };

    const result = isEdit
      ? await updateSkillCategoryAction(initial!.id, payload)
      : await createSkillCategoryAction(payload);

    setSaving(false);

    if (result?.success) {
      router.push("/dashboard/skills");
      router.refresh();
    } else {
      setError(result?.error ?? "Failed to save");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Category title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Front-end"
          required
          className="w-full bg-[#111] border border-zinc-800 rounded-md p-2.5 text-sm text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Skills</label>
        <div className="flex flex-col gap-2">
          {skills.map((skill, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={skill}
                onChange={(e) => {
                  const next = [...skills];
                  next[i] = e.target.value;
                  setSkills(next);
                }}
                className="flex-1 bg-[#111] border border-zinc-800 rounded-md p-2 text-sm text-white"
              />
              <button
                type="button"
                onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
                className="text-zinc-500 hover:text-red-400 text-sm px-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSkills([...skills, ""])}
          className="mt-2 text-[13px] text-zinc-400 hover:text-white"
        >
          + Add skill
        </button>
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Sort order</label>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          className="w-24 bg-[#111] border border-zinc-800 rounded-md p-2 text-sm text-white"
        />
        <p className="text-[12px] text-zinc-600 mt-1">Lower numbers appear first.</p>
      </div>

      {error && <p className="text-[13px] text-red-400/80">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="self-start bg-white text-black text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50"
      >
        {saving ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
}