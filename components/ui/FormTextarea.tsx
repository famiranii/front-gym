import {
  forwardRef,
  type TextareaHTMLAttributes,
} from "react";

const textareaCls =
  "w-full bg-background rounded-xl border border-input focus:border-ring focus:ring-2 focus:ring-ring/20 text-foreground px-4 py-3 text-sm transition-all outline-none resize-y placeholder:text-muted-foreground";

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>

      <textarea
        ref={ref}
        {...props}
        className={`${textareaCls} ${
          error ? "border-destructive focus:border-destructive" : ""
        } ${className}`}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  ),
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
