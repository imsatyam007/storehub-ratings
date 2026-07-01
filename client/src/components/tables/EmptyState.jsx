export default function EmptyState({
  message = "No data found.",
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        py-16
        rounded-xl
        border
        border-dashed
        border-[var(--border)]
        bg-[var(--surface)]
      "
    >
      <p
        className="text-lg font-medium"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        {message}
      </p>
    </div>
  );
}