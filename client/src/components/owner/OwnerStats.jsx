export default function OwnerStats({
  store,
  totalRatings,
}) {
  if (!store) return null;

  const cards = [
    {
      title: "Store Name",
      value: store.name,
    },
    {
      title: "Average Rating",
      value:
        "⭐".repeat(Math.round(store.averageRating)) +
        "☆".repeat(5 - Math.round(store.averageRating)),
    },
    {
      title: "Total Ratings",
      value: totalRatings,
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            bg-white
            rounded-2xl
            border
            border-[var(--border)]
            p-6
            shadow-sm
          "
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
            className="mt-3 text-3xl font-bold"
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