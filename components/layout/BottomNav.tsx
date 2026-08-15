"use client";

import { useState } from "react";

const navItems = [
  { label: "خانه", icon: "home", href: "#" },
  { label: "فروشگاه", icon: "storefront", href: "#" },
  { label: "سفارشات", icon: "receipt_long", href: "#" },
  { label: "پروفایل", icon: "person", href: "#" },
];

export default function BottomNav() {
  const [active, setActive] = useState(0);

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-card border-t border-border shadow-[0_-4px_12px_rgba(26,26,26,0.06)] flex flex-row-reverse justify-around items-center h-20 px-4">
      {navItems.map((item, i) => (
        <button
          key={item.label}
          onClick={() => setActive(i)}
          className={`flex flex-col items-center justify-center px-4 py-2 rounded-full transition-all active:scale-90 duration-300 cursor-pointer ${
            active === i
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <span
            className="material-symbols-outlined mb-1 text-[24px]"
            style={{ fontVariationSettings: `'FILL' ${active === i ? 1 : 0}` }}
          >
            {item.icon}
          </span>
          <span className="text-[11px]">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
