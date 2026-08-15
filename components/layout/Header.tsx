import Link from "next/link";

const navLinks = [
  { label: "خانه", href: "#", active: true },
  { label: "فروشگاه", href: "#" },
  { label: "سفارشات", href: "#" },
  { label: "پروفایل", href: "#" },
];

export default function Header() {
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex bg-card text-foreground sticky top-0 shadow-sm flex-row-reverse justify-between items-center px-6 py-3 w-full z-40">
        <button className="p-2 rounded-full hover:bg-muted transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="font-bold text-2xl text-foreground tracking-tighter">
          آریا اسپرت
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex gap-6 mr-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  link.active
                    ? "text-foreground border-b-2 border-secondary pb-1"
                    : "text-muted-foreground hover:text-foreground transition-colors pb-1"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <CartButton count={2} />
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-card text-foreground sticky top-0 shadow-sm flex flex-row-reverse justify-between items-center px-4 py-3 w-full z-40">
        <button className="p-2 rounded-full hover:bg-muted transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="font-bold text-xl text-foreground tracking-tighter">
          آریا اسپرت
        </div>

        <CartButton count={2} />
      </header>
    </>
  );
}

function CartButton({ count }: { count: number }) {
  return (
    <button className="relative p-2 rounded-full hover:bg-muted transition-colors active:scale-95 duration-200">
      <span className="material-symbols-outlined">shopping_bag</span>
      {count > 0 && (
        <span className="absolute top-1 right-1 bg-secondary text-secondary-foreground text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}
