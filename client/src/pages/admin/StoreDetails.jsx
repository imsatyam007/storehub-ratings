import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getStoreById } from "../../services/admin.service";

import InfoCard from "../../components/common/InfoCard";

export default function StoreDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStore() {
      try {
        const res = await getStoreById(id, token);

        setStore(res.data.store);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStore();
  }, [id, token]);

  if (loading) {
    return (
      <div className="text-center py-20">
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
      <section className="flex items-center gap-6">
        <div
          className="
            w-20
            h-20
            rounded-full
            bg-[var(--primary)]
            text-white
            flex
            items-center
            justify-center
            text-3xl
            font-bold
          "
        >
          {store.name.charAt(0)}
        </div>

        <div>
          <h1
            className="text-3xl font-bold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {store.name}
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {store.email}
          </p>
        </div>
      </section>

      {/* Details */}
      <section className="grid md:grid-cols-2 gap-6">
        <InfoCard
          label="Email"
          value={store.email}
        />

        <InfoCard
          label="Address"
          value={store.address}
        />

        <InfoCard
          label="Store Owner"
          value={store.owner?.name}
        />

        <InfoCard
          label="Owner Email"
          value={store.owner?.email}
        />

        <InfoCard
          label="Average Rating"
          value={`${store.averageRating} ⭐`}
        />

        <InfoCard
          label="Total Ratings"
          value={store.totalRatings}
        />

        <InfoCard
          label="Created"
          value={new Date(store.createdAt).toLocaleDateString()}
        />
      </section>
    </div>
  );
}