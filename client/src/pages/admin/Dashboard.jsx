import { useEffect, useState } from "react";
import {
  Users,
  Store,
  Star,
  ChartColumn,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/admin.service";

import StatsCard from "../../components/common/StatsCard";

import DataTable from "../../components/tables/DataTable";
import TableHeader from "../../components/tables/TableHeader";
import TableRow from "../../components/tables/TableRow";
import Badge from "../../components/common/Badge";

const userColumns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
];

const storeColumns = [
  { key: "name", label: "Store" },
  { key: "owner", label: "Owner" },
  { key: "rating", label: "Rating" },
];

export default function Dashboard() {

const { token } = useAuth();

const [dashboard, setDashboard] = useState({
  totalUsers: 0,
  totalStores: 0,
  totalRatings: 0,
  averageRating: 0,
  recentUsers: [],
  recentStores: [],
});

const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadDashboard = async () => {
    try {
      const res = await getDashboard(token);

      setDashboard(res.data.dashboard);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

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
          Admin Dashboard
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Welcome back! Here's an overview of your StoreHub platform.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={dashboard.totalUsers}
          icon={Users}
          color="#3D52D5"
          ssubtitle="Registered users"
        />

        <StatsCard
          title="Total Stores"
          value={dashboard.totalStores}
          icon={Store}
          color="#16A34A"
          subtitle="Registered stores"
        />

        <StatsCard
          title="Total Ratings"
          value={dashboard.totalRatings}
          icon={Star}
          color="#E8A000"
          subtitle="Submitted ratings"
        />

        <StatsCard
          title="Average Rating"
          value={dashboard.averageRating}
          icon={ChartColumn}
          color="#D97706"
          subtitle="Across all stores"
        />
      </section>

      {/* Recent Users Table */}
      <section>
        <TableHeader
          title="Recent Users"
          subtitle="Latest registered users"
        />

        <DataTable
          columns={userColumns}
          data={dashboard.recentUsers}
          emptyMessage="No users found."
          renderRow={(user) => (
            <TableRow key={user.id}>
              <td className="px-6 py-4">
                {user.name}
              </td>

              <td className="px-6 py-4">
                {user.email}
              </td>

              <td className="px-6 py-4">
                <Badge role={user.role} />
              </td>
            </TableRow>
          )}
        />
      </section>

      <section>
  <TableHeader
    title="Recent Stores"
    subtitle="Newest registered stores"
  />

  <DataTable
    columns={storeColumns}
    data={dashboard.recentStores}
    emptyMessage="No stores found."
    renderRow={(store) => (
      <TableRow key={store.id}>
        <td className="px-6 py-4">
          {store.name}
        </td>

        <td className="px-6 py-4">
          {store.owner}
        </td>

        <td className="px-6 py-4">
          {Number(store.rating).toFixed(1)} ⭐
        </td>
      </TableRow>
    )}
  />
</section>

    </div>
  );
}