"use client";
import CheckoutContent from "@/components/featchers/check-out/CheckoutContent";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    setToken(t);
    setUserId(id);
  }, []);
  if (!token || !userId) return null;

  return <CheckoutContent token={token} userId={userId} />;
}
