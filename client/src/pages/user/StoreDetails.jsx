import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getStoreById } from "../../services/user.service";

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
      <section>
        <h1
          className="text-3xl font-bold"
          style={{
            color: "var(--text-primary)",
          }}
        >
          {store.name}
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Store Details
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <InfoCard
          label="Store Name"
          value={store.name}
        />

        <InfoCard
          label="Address"
          value={store.address}
        />

        <InfoCard
          label="Overall Rating"
          value={`⭐ ${store.overallRating}`}
        />

        <InfoCard
          label="My Rating"
          value={
            store.userRating
              ? `⭐ ${store.userRating}`
              : "Not Rated"
          }
        />
      </section>
    </div>
  );
}