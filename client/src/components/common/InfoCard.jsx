export default function InfoCard({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[var(--border)]
        bg-white
        p-5
      "
    >
      <p
        className="text-sm mb-2"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        {label}
      </p>

      <p
        className="font-semibold text-lg"
        style={{
          color: "var(--text-primary)",
        }}
      >
        {value || "-"}
      </p>
    </div>
  );
}