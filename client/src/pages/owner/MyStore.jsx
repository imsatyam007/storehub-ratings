import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/owner.service";

export default function MyStore() {
  const { token } = useAuth();

  const [store, setStore] = useState(null);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStore() {
      try {
        const res = await getDashboard(token);

        setStore(res.data.store);
        setTotalRatings(res.data.totalRatings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStore();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        Loading store...
      </div>
    );
  }

  if (!store) {
    return (
      <div className="text-center py-20">
        Store not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1
          className="text-3xl font-bold"
          style={{
            color: "var(--text-primary)",
          }}
        >
          My Store
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          View your store information.
        </p>
      </section>

      {/* Store Card */}
      <div
        className="
          bg-white
          rounded-2xl
          border
          border-[var(--border)]
          p-8
          shadow-sm
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Store Name */}
  <div className="rounded-xl border border-[var(--border)] p-6 bg-white">
    <p
      className="text-sm mb-2"
      style={{ color: "var(--text-secondary)" }}
    >
      Store Name
    </p>

    <h2
      className="text-2xl font-bold"
      style={{ color: "var(--text-primary)" }}
    >
      {store.name}
    </h2>
  </div>

  {/* Average Rating */}
  <div className="rounded-xl border border-[var(--border)] p-6 bg-white">
    <p
      className="text-sm mb-2"
      style={{ color: "var(--text-secondary)" }}
    >
      Average Rating
    </p>

    <h2 className="text-2xl font-bold">
      {"⭐".repeat(Math.round(store.averageRating))}
      {"☆".repeat(5 - Math.round(store.averageRating))}
    </h2>
  </div>

  {/* Address */}
  <div className="rounded-xl border border-[var(--border)] p-6 bg-white">
    <p
      className="text-sm mb-2"
      style={{ color: "var(--text-secondary)" }}
    >
      Address
    </p>

    <p
      className="text-lg font-semibold leading-7"
      style={{ color: "var(--text-primary)" }}
    >
      {store.address}
    </p>
  </div>

  {/* Total Ratings */}
  <div className="rounded-xl border border-[var(--border)] p-6 bg-white">
    <p
      className="text-sm mb-2"
      style={{ color: "var(--text-secondary)" }}
    >
      Total Ratings
    </p>

    <h2
      className="text-4xl font-bold"
      style={{ color: "var(--primary)" }}
    >
      {totalRatings}
    </h2>
  </div>

</div>
      </div>
    </div>
  );
}