// components/FieldCell.tsx

import { CopyButton } from "@/components/ui/CopyButton";

type Props = {
  label?: string;
  value: string;
  mono?: boolean;
  ltr?: boolean;
};

export function FieldCell({ label, value, mono, ltr }: Props) {
  return (
    <div className="mt-4 flex items-center justify-between gap-3 md:mt-0 md:justify-start">
      <div className="min-w-0">
        {label && (
          <p className="text-xs text-muted-foreground md:hidden">{label}</p>
        )}
        <p
          dir={ltr ? "ltr" : undefined}
          className={`mt-1 truncate text-sm text-foreground md:mt-0 ${mono ? "font-mono text-xs text-muted-foreground" : ""}`}
        >
          {value}
        </p>
      </div>
      <CopyButton value={value} />
    </div>
  );
}
