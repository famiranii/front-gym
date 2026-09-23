"use client";

import { useState } from "react";
import FormInput from "@/components/ui/FormInput";
import { api } from "@/lib/api";

export type DiscountResult = {
  valid: boolean;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  discount_amount: number;
  final_subtotal: number;
};

type DiscountCodeProps = {
  subtotal: number;
  onValidated: (result: DiscountResult | null) => void;
};

export default function DiscountCode({
  subtotal,
  onValidated,
}: DiscountCodeProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [result, setResult] = useState<DiscountResult | null>(null);

  const handleValidate = async () => {
    const value = code.trim().toUpperCase();

    if (!value) {
      setError("کد تخفیف را وارد کنید");
      return;
    }

    if (subtotal <= 0) {
      setError("مبلغ سفارش معتبر نیست");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post<DiscountResult>("/discount/validate", {
        code: value,
        subtotal,
      });

      if (!response.valid) {
        setResult(null);
        onValidated(null);
        setError("کد تخفیف معتبر نیست");
        return;
      }

      setResult(response);
      onValidated(response);
    } catch (error: any) {
      console.error("Discount validation error:", error);

      setResult(null);
      onValidated(null);

      setError(error?.response?.data?.error || "کد تخفیف معتبر نیست");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setCode("");
    setResult(null);
    setError("");
    onValidated(null);
  };

  return (
    <section
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
      dir="rtl"
    >
      <h2 className="mb-4 border-b border-border pb-2 text-lg font-extrabold text-foreground">
        کد تخفیف
      </h2>

      {result ? (
        <div className="flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <span className="material-symbols-outlined text-lg text-primary">
                check
              </span>
            </div>

            <div>
              <p className="text-sm font-bold text-foreground">
                کد تخفیف اعمال شد
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                کد <span className="font-bold text-primary">{result.code}</span>{" "}
                معتبر است
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="text-sm font-semibold text-destructive transition-opacity hover:opacity-80"
          >
            حذف
          </button>
        </div>
      ) : (
        <div className="flex items-end gap-3">
          <FormInput
            label="کد تخفیف"
            placeholder="مثلاً WELCOME20"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError("");
            }}
            error={error}
          />

          <button
            type="button"
            onClick={handleValidate}
            disabled={loading || !code.trim()}
            className="mb-4 h-11 shrink-0 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "بررسی..." : "اعمال"}
          </button>
        </div>
      )}
    </section>
  );
}
