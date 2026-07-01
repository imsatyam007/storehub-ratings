export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "var(--primary)",
  subtitle,
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-[var(--border)]
        p-6
        shadow-sm
        hover:shadow-md
        transition-all
        duration-200
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-sm font-medium"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {title}
          </p>

          <h2
            className="mt-3 text-4xl font-bold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {value}
          </h2>

          {subtitle && (
            <p
              className="mt-2 text-sm"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className="
              w-14
              h-14
              rounded-xl
              flex
              items-center
              justify-center
            "
            style={{
              backgroundColor: `${color}20`,
            }}
          >
            <Icon
              size={28}
              style={{
                color,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}