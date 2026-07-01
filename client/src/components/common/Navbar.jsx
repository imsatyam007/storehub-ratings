import { useAuth } from "../../context/AuthContext";
import Badge from "./Badge";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div className="w-full h-full flex items-center justify-between">
      <div>
        <p
          className="text-lg font-semibold"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Welcome back, {user?.name}
        </p>

        <p
          className="text-sm"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          {user?.email}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Badge role={user?.role} />

        <div
          className="
            w-12
            h-12
            rounded-full
            bg-[var(--primary)]
            text-white
            flex
            items-center
            justify-center
            font-bold
            text-lg
          "
        >
          {user?.name?.charAt(0)}
        </div>
      </div>
    </div>
  );
}