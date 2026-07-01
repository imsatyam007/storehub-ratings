export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]",

    secondary:
      "bg-white border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-alt)]",

    success:
      "bg-[var(--success)] text-white hover:opacity-90",

    danger:
      "bg-[var(--danger)] text-white hover:opacity-90",
  };

  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`
        ${fullWidth ? "w-full" : ""}
        h-11
        px-6
        rounded-xl
        font-semibold
        flex
        items-center
        justify-center
        gap-2
        transition-all
        duration-200
        cursor-pointer
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}