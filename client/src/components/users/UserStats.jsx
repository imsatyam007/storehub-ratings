export default function UserStats({ dashboard }) {
  if (!dashboard) return null;

  const cards = [
    {
      title: "Total Stores",
      value: dashboard.totalStores,
    },
    {
      title: "My Ratings",
      value: dashboard.totalRatings,
    },
    {
      title: "Average Rating",
      value: dashboard.averageRating,
    },
  ];

  return (
    <section className="grid md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl border border-[var(--border)] p-6 shadow-sm"
        >
          <p
            className="text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {card.title}
          </p>

          <h2
            className="text-4xl font-bold mt-3"
            style={{
              color: "var(--primary)",
            }}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </section>
  );
}