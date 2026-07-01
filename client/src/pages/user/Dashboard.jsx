import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/user.service";

import UserStats from "../../components/users/UserStats";

export default function Dashboard() {
  const { token, user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await getDashboard(token);

console.log("Dashboard API:", res.data);
console.log("Dashboard Object:", res.data.dashboard);

setDashboard(res.data.dashboard);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        Loading dashboard...
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
          User Dashboard
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          View your stores, ratings and account information.
        </p>
      </section>

      <UserStats dashboard={dashboard} />
    </div>
  );
}