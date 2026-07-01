import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/owner.service";

import OwnerStats from "../../components/owner/OwnerStats";

export default function Dashboard() {
  const { token } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await getDashboard(token);

        setDashboard(res.data);
      } catch (error) {
        console.error("Owner Dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p
          className="text-lg font-medium"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <section>
        <h1
          className="text-3xl font-bold"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Owner Dashboard
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          View your store performance and ratings.
        </p>
      </section>

      {/* Stats */}
      <OwnerStats
        store={dashboard.store}
        totalRatings={dashboard.totalRatings}
      />
    </div>
  );
}