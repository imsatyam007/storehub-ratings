export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`bg-white border border-[var(--border)] rounded-2xl shadow-sm p-8 ${className}`}
    >
      {children}
    </div>
  );
}