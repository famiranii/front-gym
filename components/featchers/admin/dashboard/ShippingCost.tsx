"use client";

import { useState } from "react";
import PrimaryInput from "@/components/ui/PrimaryInput";
import { api } from "@/lib/api";

interface ShippingCostProps {
  initialCost: number;
}

export default function ShippingCost({ initialCost }: ShippingCostProps) {
  const [cost, setCost] = useState(String(initialCost));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const value = Number(cost);

    if (!Number.isFinite(value) || value < 0) {
      setError("هزینه ارسال معتبر نیست.");
      return;
    }

    try {
      setLoading(true);

      await api.put("/admin/shipping-cost", {
        cost: value,
      });

      setSuccess("هزینه ارسال با موفقیت ذخیره شد.");
    } catch (error) {
      console.error(error);
      setError("ذخیره هزینه ارسال انجام نشد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="my-4 rounded-2xl border border-border p-6 shadow-sm">
      <div>
        <h2 className="font-semibold">هزینه ارسال</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          هزینه ارسال سفارش‌ها را تعیین کنید
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start"
      >
        <div className="flex-1">
          <PrimaryInput
            type="number"
            min="0"
            step="1000"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="مثلاً 50000"
            icon="local_shipping"
            error={error}
          />

          <p className="mt-1 text-xs text-muted-foreground">مبلغ به تومان</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-[50px] rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "در حال ذخیره..." : "ذخیره"}
        </button>
      </form>

      {success && <p className="mt-3 text-sm text-success">{success}</p>}
    </section>
  );
}
