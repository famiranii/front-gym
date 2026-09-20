"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginMessage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  if (!message) return null;

  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">
      <span className="material-symbols-outlined text-[18px] shrink-0">
        lock
      </span>
      {message}
    </div>
  );
}

export default function LoginMessageBanner() {
  return (
    <Suspense>
      <LoginMessage />
    </Suspense>
  );
}
