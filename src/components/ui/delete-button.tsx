"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteExperienceAction } from "@/src/features/experience/action/experience";

export default function DeleteExperienceButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this experience entry?")) return;

    setDeleting(true);
    const result = await deleteExperienceAction(id);
    setDeleting(false);

    if (result?.success) {
      router.refresh();
    } else {
      alert(result?.error ?? "Failed to delete");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="text-[13px] text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}