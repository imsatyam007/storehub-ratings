export default function TableHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
      <div>
        <h2
          className="text-xl font-semibold"
          style={{
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="mt-1 text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}