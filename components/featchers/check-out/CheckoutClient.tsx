// components/checkout/CheckoutClient.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutContent from "./CheckoutContent";

export default function CheckoutClient() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (!t || !id) {
      router.push("/login");
      return;
    }
    setToken(t);
    setUserId(id);
  }, []);

  if (!token || !userId) return null;

  return <CheckoutContent token={token} userId={userId} />;
}
