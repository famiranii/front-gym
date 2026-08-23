import {
  forwardRef,
  type SelectHTMLAttributes,
} from "react";

const selectCls =
  "w-full bg-background rounded-xl border border-input focus:border-ring focus:ring-2 focus:ring-ring/20 text-foreground px-4 py-2.5 text-sm appearance-none transition-all outline-none";

export type SelectOption = {
  value: string;
  label: string;
};

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
};

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      options,
      error,
      placeholder = "انتخاب کنید...",
      className = "",
      ...props
    },
    ref,
  ) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>

      <div className="relative">
        <select
          ref={ref}
          {...props}
          className={`${selectCls} ${
            error ? "border-destructive focus:border-destructive" : ""
          } ${className}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-lg">
          expand_more
        </span>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  ),
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
