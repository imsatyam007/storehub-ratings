import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getUserById } from "../../services/admin.service";

import Badge from "../../components/common/Badge";
import InfoCard from "../../components/common/InfoCard";

export default function UserDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await getUserById(id, token);
        setUser(res.data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id, token]);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading user...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        User not found.
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
          {user.name.charAt(0)}
        </div>

        <div>
          <h1
            className="text-3xl font-bold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {user.name}
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {user.email}
          </p>

          <div className="mt-3">
            <Badge role={user.role} />
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="grid md:grid-cols-2 gap-6">
        <InfoCard
          label="Email"
          value={user.email}
        />

        <InfoCard
          label="Address"
          value={user.address}
        />

        <InfoCard
          label="Role"
          value={user.role}
        />

        <InfoCard
          label="Average Rating"
          value={user.rating ?? "N/A"}
        />

        <InfoCard
          label="Joined"
          value={new Date(user.createdAt).toLocaleDateString()}
        />
      </section>
    </div>
  );
}