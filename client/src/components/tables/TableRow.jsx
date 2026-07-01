export default function TableRow({
  children,
  className = "",
  ...props
}) {
  return (
    <tr
      className={`
        border-t
        border-[var(--border)]
        hover:bg-[var(--surface-alt)]
        transition-colors
        ${className}
      `}
      {...props}
    >
      {children}
    </tr>
  );
}