// components/cart/CartStepper.tsx

type Step = {
  label: string;
  number: string;
};

const STEPS: Step[] = [
  { number: "۱", label: "آدرس" },
  { number: "۲", label: "ارسال" },
  { number: "۳", label: "پرداخت" },
];

export default function CartStepper({ active }: { active: number }) {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto mb-6 relative">
      <div className="absolute top-4 left-0 right-0 h-[2px] bg-border -z-10" />
      {STEPS.map((step, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <div
            key={step.number}
            className="flex flex-col items-center gap-2 bg-background px-2"
          >
            <div
              className={[
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm",
                done || current
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground border border-border",
              ].join(" ")}
            >
              {done ? (
                <span className="material-symbols-outlined text-base leading-none">
                  check
                </span>
              ) : (
                step.number
              )}
            </div>
            <span
              className={[
                "text-xs font-semibold",
                current ? "text-foreground" : "text-muted-foreground",
              ].join(" ")}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
