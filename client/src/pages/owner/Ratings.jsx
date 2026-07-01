import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/owner.service";

import OwnerRatingTable from "../../components/owner/OwnerRatingTable";

export default function Ratings() {
  const { token } = useAuth();

  const [ratedUsers, setRatedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRatings() {
      try {
        const res = await getDashboard(token);

        setRatedUsers(res.data.ratedUsers);
      } catch (error) {
        console.error("Owner Ratings:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRatings();
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
          Loading ratings...
        </p>
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
          Store Ratings
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          View all users who have rated your store.
        </p>
      </section>

      {/* Ratings Table */}
      <OwnerRatingTable
        ratedUsers={ratedUsers}
      />
    </div>
  );
}