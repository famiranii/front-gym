// components/SearchBar.tsx
"use client";

import { useState } from "react";

type Props = {
  onSearch: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({ onSearch, placeholder = "جستجو..." }: Props) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  const clear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div className="relative">
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[20px] text-muted-foreground">
        search
      </span>

      <input
        dir="rtl"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-border bg-card py-2 pr-10 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
      />

      {value && (
        <button
          type="button"
          onClick={clear}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      )}
    </div>
  );
}
