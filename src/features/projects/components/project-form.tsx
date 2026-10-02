"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProjectAction, updateProjectAction } from "../action";
import type { Project } from "@/src/db/table/projects.table";
import { uploadImageAction } from "../../uploads/action";

interface ProjectFormProps {
  initial?: Project | null;
}

const SUMMARY_MAX = 200;

export default function ProjectForm({ initial }: ProjectFormProps) {
  const router = useRouter();
  const isEdit = !!initial;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? [""]);
  const [githubUrl, setGithubUrl] = useState(initial?.githubUrl ?? "");
  const [liveUrl, setLiveUrl] = useState(initial?.liveUrl ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [status, setStatus] = useState<"completed" | "in-progress">(
    (initial?.status as "completed" | "in-progress") ?? "completed"
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImageAction(formData);
    setUploading(false);
    e.target.value = ""; // allow re-selecting the same file later

    if (result?.success) {
      setImageUrl(result.url ?? "");
    } else {
      setError(result?.error ?? "Image upload failed");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      category: category || undefined,
      summary: summary.trim() || undefined,
      description,
      tags: tags.map((t) => t.trim()).filter(Boolean),
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
      imageUrl: imageUrl || undefined,
      featured,
      status,
      sortOrder: initial?.sortOrder ?? 0,
      isActive: initial?.isActive ?? true,
    };

    const result = isEdit
      ? await updateProjectAction(initial!.id, payload)
      : await createProjectAction(payload);

    setSaving(false);

    if (result?.success) {
      router.push("/dashboard/projects");
      router.refresh();
    } else {
      setError(result?.error ?? "Failed to save project");
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
        <label className="block text-sm text-zinc-400 mb-1.5">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-[#111] border border-zinc-800 rounded-md p-2.5 text-sm text-white"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm text-zinc-400">
            Short intro <span className="text-zinc-600">(shown on home page card)</span>
          </label>
          <span
            className={`text-[12px] ${
              summary.length > SUMMARY_MAX ? "text-red-400" : "text-zinc-600"
            }`}
          >
            {summary.length}/{SUMMARY_MAX}
          </span>
        </div>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={2}
          maxLength={SUMMARY_MAX}
          placeholder="1–2 sentences that sum up the project"
          className="w-full bg-[#111] border border-zinc-800 rounded-md p-2.5 text-sm text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">
          Full description <span className="text-zinc-600">(shown on project details page, supports markdown)</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
          required
          className="w-full bg-[#111] border border-zinc-800 rounded-md p-2.5 text-sm text-white font-mono"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Tags</label>
        <div className="flex flex-col gap-2">
          {tags.map((tag, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={tag}
                onChange={(e) => {
                  const next = [...tags];
                  next[i] = e.target.value;
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
          onClick={() => setTags([...tags, ""])}
          className="mt-2 text-[13px] text-zinc-400 hover:text-white"
        >
          + Add tag
        </button>
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">GitHub URL</label>
        <input
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="w-full bg-[#111] border border-zinc-800 rounded-md p-2.5 text-sm text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Live URL</label>
        <input
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          className="w-full bg-[#111] border border-zinc-800 rounded-md p-2.5 text-sm text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Image</label>

        {imageUrl && (
          <div className="relative inline-block mb-3">
            <img
              src={imageUrl}
              alt=""
              className="h-32 w-auto rounded-md border border-zinc-800 object-cover"
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute top-1.5 right-1.5 bg-black/70 text-white text-[11px] font-medium px-2 py-1 rounded-md hover:bg-black/90"
            >
              Remove
            </button>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="block text-sm text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-zinc-800 file:bg-[#111] file:text-white file:text-sm"
        />
        {uploading && <p className="text-[13px] text-zinc-500 mt-1">Uploading...</p>}
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-sm text-zinc-400">
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "completed" | "in-progress")}
            className="bg-[#111] border border-zinc-800 rounded-md p-1.5 text-sm text-white"
          >
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
          </select>
        </label>
      </div>

      {error && <p className="text-[13px] text-red-400/80">{error}</p>}

      <button
        type="submit"
        disabled={saving || uploading}
        className="self-start bg-white text-black text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50"
      >
        {saving ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}