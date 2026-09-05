import Link from "next/link";

export default function ProfileButton() {
  return (
    <Link
      href="/account/profile"
      className="relative w-9 h-9 flex items-center justify-center rounded-md border border-border bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
      aria-label="اطلاعات شخصی"
    >
      <span className="material-symbols-outlined text-[20px]">person</span>
    </Link>
  );
}
