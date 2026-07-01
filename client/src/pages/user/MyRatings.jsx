import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import { getMyRatings } from "../../services/user.service";

import MyRatingTable from "../../components/users/MyRatingTable";

export default function MyRatings() {
  const { token } = useAuth();

  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRatings() {
      try {
        const res = await getMyRatings(token);

        setRatings(res.data.ratings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadRatings();
  }, [token]);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading ratings...
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
          My Ratings
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          View all ratings you've submitted.
        </p>
      </section>

      <MyRatingTable ratings={ratings} />
    </div>
  );
}