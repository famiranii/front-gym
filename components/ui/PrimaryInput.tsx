import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  endIcon?: string;
  onEndIconClick?: () => void;
  error?: string;
  inputClassName?: string; // جدا از className
}

const PrimaryInput = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, endIcon, onEndIconClick, error, inputClassName, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="relative">
          <input
            ref={ref}
            className={`w-full border rounded-lg px-4 py-[14px] text-sm transition-all outline-none
              ${endIcon ? "pr-10" : ""}
              ${error ? "border-destructive" : "border-transparent"}
              ${inputClassName ?? "bg-card text-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:ring-1 focus:ring-ring"}
            `}
            {...props}
          />
          {icon && (
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[20px] text-muted-foreground/50">
              {icon}
            </span>
          )}
          {endIcon && (
            <button
              type="button"
              onClick={onEndIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/3 text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {endIcon}
              </span>
            </button>
          )}
        </div>
        <div className="h-4">
          {error && (
            <p className="text-xs text-destructive leading-4 truncate">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  },
);

PrimaryInput.displayName = "PrimaryInput";
export default PrimaryInput;
