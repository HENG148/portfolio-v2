"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConfirmDelete({ id, action }: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; error?: string } | undefined>;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        if (!confirm("Delete this item ?")) return;
        setBusy(true);
        const res = await action(id);
        setBusy(false);
        if (res?.success) router.refresh();
        else alert(res?.error ?? "Failed to delete");
      }}
      className="text-[13px] text-zinc-500 hover:text-red-400 disabled:opacity-50">
      {busy ? "..." : "Delete"}
    </button>
  );
}