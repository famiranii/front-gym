"use client";

import { FormEvent, useId, useState } from "react";

type OrderSearchBarProps = {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export default function OrderSearchBar({
  value,
  onSearch,
  placeholder = "جست‌وجوی سریال پرداخت...",
  disabled = false,
  loading = false,
  className = "",
}: OrderSearchBarProps) {
  const [input, setInput] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);

  const inputId = useId();

  // Sync local input when the parent changes `value`
  if (value !== previousValue) {
    setPreviousValue(value);
    setInput(value);
  }

  const isDisabled = disabled || loading;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isDisabled) return;

    const trimmedValue = input.trim();

    if (trimmedValue === value.trim()) {
      return;
    }

    onSearch(trimmedValue);
  };

  const clearSearch = () => {
    if (isDisabled) return;

    setInput("");
    onSearch("");
  };

  return (
    <form
      onSubmit={submit}
      role="search"
      className={`flex w-full gap-2 sm:max-w-md ${className}`}
    >
      <div className="relative min-w-0 flex-1">
        <label htmlFor={inputId} className="sr-only">
          جست‌وجوی سریال پرداخت
        </label>

        <span
          aria-hidden="true"
          className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[19px] text-muted-foreground"
        >
          receipt_long
        </span>

        <input
          id={inputId}
          type="search"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          disabled={isDisabled}
          autoComplete="off"
          spellCheck={false}
          dir="rtl"
          className="h-11 w-full rounded-xl border bg-card py-2 pr-10 pl-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
        />

        {input.length > 0 && !isDisabled && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute left-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="پاک کردن جست‌وجو"
          >
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[18px]"
            >
              close
            </span>
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
            />
            <span>در حال جست‌وجو...</span>
          </>
        ) : (
          <>
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[18px]"
            >
              search
            </span>
            <span>جست‌وجو</span>
          </>
        )}
      </button>
    </form>
  );
}
