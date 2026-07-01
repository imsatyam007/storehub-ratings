import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import Badge from "./Badge";
import Button from "./Button";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ menuItems = [] }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
  const confirmed = window.confirm(
    "Are you sure you want to logout?"
  );

  if (confirmed) {
    logout();
  }
};

  return (
    <aside
    className="
      w-72
      h-screen
      shrink-0
      sticky
      top-0
      flex
      flex-col
      bg-var(--surface)
      border-r
      border-var(--border)
    "
  >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-var(--border)">
        <Logo />
      </div>

      {/* User */}
      <div className="px-6 py-6 border-b border-[var(--border)]">
        <h3
          className="font-semibold text-lg"
          style={{ color: "var(--text-primary)" }}
        >
          {user?.name}
        </h3>

        <p
          className="text-sm mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          {user?.email}
        </p>

        <Badge role={user?.role} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition-all
              duration-200
              ${
                isActive
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--text-primary)] hover:bg-[var(--surface-alt)]"
              }
            `
            }
          >
            {item.icon && <item.icon size={20} />}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-[var(--border)]">
        <Button
          variant="danger"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}