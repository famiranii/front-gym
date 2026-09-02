export default function InputCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card rounded-2xl p-5 border border-border shadow-sm flex flex-col gap-4 animate-fade-in-up">
      <h2 className="text-sm font-bold text-foreground border-b border-border pb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}