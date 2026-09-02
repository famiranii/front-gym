import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

const inputCls =
  "w-full h-11 bg-background rounded-xl border border-input focus:border-ring focus:ring-2 focus:ring-ring/20 text-foreground px-4 py-2.5 text-sm transition-all outline-none placeholder:text-muted-foreground";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  suffix?: ReactNode;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, suffix, className = "", ...props }, ref) => (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <label className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>

      <div className="relative">
        <input
          ref={ref}
          {...props}
          className={`${inputCls} ${
            suffix ? "pl-14" : ""
          } ${error ? "border-destructive focus:border-destructive" : ""} ${className}`}
        />

        {suffix && (
          <span className="pointer-events-none absolute left-0 top-0 flex h-11 w-12 items-center justify-center text-xs font-semibold text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>

      <p className="h-3 text-xs text-destructive">{error}</p>
    </div>
  ),
);

FormInput.displayName = "FormInput";

export default FormInput;
