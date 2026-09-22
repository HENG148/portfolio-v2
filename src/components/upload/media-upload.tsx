import { Media } from "@/src/db/table/upload.table"
import Image from "next/image";
import { useState } from "react";

type Props = {
  value: Media[],
  onChange: (media: Media[]) => void;
  multiple?: boolean;
}

export function MediaUpload({ value, onChange, multiple = true }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError(null);

    try {
      const upload: Media[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file)

        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "upload error");
        upload.push(data as Media);
      }
      onChange(multiple ? [...value, ...upload] : upload);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove(media: Media) {
    onChange(value.filter((m) => m.publicId !== media.publicId));
    try {
      await fetch(`/api/upload/${media.publicId}`, { method: "DELETE" });
    } catch (e) {
      console.error("cleanup failed: ", e);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {value.map((m) => (
          <div key={m.publicId} className="relative aspect-video overflow-hidden rounded-lg border border-zinc-800">
            <Image src={m.url} alt={m.alt ?? ""} fill sizes="200px" className="object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(m)}
              className="absolute top-1 right-1 rounded bg-black/70 px-2 py-0.5 text-xs text-white"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple={multiple}
        disabled={uploading}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
        className="text-sm text-zinc-400"
      />

      {uploading && <p className="text-sm text-zinc-400">Uploading…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}