"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

type ActionResult = { success?: boolean; error?: string | undefined | void; }
type DeleteButtonProps = {
  id: string;
  action: (id: string) => Promise<ActionResult>;
  confirmMessage?: string;
}

export default function DeleteButton({ id, action, confirmMessage = "Delete this items?" }: DeleteButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(confirmMessage)) return;
    setDeleting(true);
    const result = await action(id);
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
  )
}