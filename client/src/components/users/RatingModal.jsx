import { useEffect, useState } from "react";

export default function RatingModal({
  open,
  store,
  loading,
  onClose,
  onSubmit,
}) {
  const [rating, setRating] = useState(1);

  useEffect(() => {
    if (store) {
      setRating(store.userRating || 1);
    }
  }, [store]);

  if (!open || !store) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-8
          shadow-xl
        "
      >
        <h2
          className="text-2xl font-bold"
          style={{
            color: "var(--text-primary)",
          }}
        >
          {store.userRating
            ? "Update Rating"
            : "Submit Rating"}
        </h2>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          {store.name}
        </p>

        <div className="mt-8 flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="text-4xl"
            >
              {star <= rating ? "⭐" : "☆"}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="
              px-5
              py-3
              rounded-xl
              border
              border-[var(--border)]
            "
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit(store.id, rating)
            }
            disabled={loading}
            className="
              px-5
              py-3
              rounded-xl
              bg-[var(--primary)]
              text-white
              hover:opacity-90
              disabled:opacity-50
            "
          >
            {loading
              ? "Saving..."
              : store.userRating
              ? "Update Rating"
              : "Submit Rating"}
          </button>
        </div>
      </div>
    </div>
  );
}