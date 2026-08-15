interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  loading?: boolean;
}

export default function PrimaryButton({ children, icon, loading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="w-full bg-secondary text-secondary-foreground font-semibold text-sm py-4 px-6 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin text-[20px]">
          progress_activity
        </span>
      ) : (
        <>
          {children}
          {icon && (
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
