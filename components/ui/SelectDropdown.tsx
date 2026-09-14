"use client";

import { useEffect, useRef, useState } from "react";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectDropdownProps<T extends string = string> {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function SelectDropdown<T extends string = string>({
  value,
  options,
  onChange,
  placeholder = "انتخاب کنید",
  className = "",
  disabled = false,
}: SelectDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: SelectOption<T>) => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative w-fit ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex min-w-48 items-center justify-between gap-4
          rounded-xl
          border border-border
          bg-card
          px-4 py-3
          text-sm font-medium
          text-foreground
          transition-all
          hover:bg-muted
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">sort</span>

          <span>{selectedOption?.label ?? placeholder}</span>
        </div>

        <span
          className={`
            material-symbols-outlined
            text-[18px]
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-full z-50
            mt-2
            min-w-full
            overflow-hidden
            rounded-xl
            border border-border
            bg-card
            p-1.5
            shadow-xl shadow-black/20
          "
        >
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`
                  flex w-full items-center justify-between
                  gap-4
                  rounded-lg
                  px-3 py-2.5
                  text-right text-sm
                  transition-colors
                  ${
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }
                `}
              >
                <span>{option.label}</span>

                {selected && (
                  <span className="material-symbols-outlined text-[18px]">
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
