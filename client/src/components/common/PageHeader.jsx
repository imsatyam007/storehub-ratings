export default function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <section className="flex justify-between items-center">
      <div>
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h1>

        {description && (
          <p
            className="mt-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </section>
  );
}