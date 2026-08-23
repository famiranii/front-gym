import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

const inputCls =
  "w-full bg-background rounded-xl border border-input focus:border-ring focus:ring-2 focus:ring-ring/20 text-foreground px-4 py-2.5 text-sm transition-all outline-none placeholder:text-muted-foreground";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  suffix?: ReactNode;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, suffix, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>

      <div className="relative">
        <input
          ref={ref}
          {...props}
          className={`${inputCls} ${suffix ? "pl-14" : ""} ${
            error ? "border-destructive focus:border-destructive" : ""
          } ${className}`}
        />
        {suffix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground pointer-events-none">
            {suffix}
          </span>
        )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  ),
);

FormInput.displayName = "FormInput";

export default FormInput;
