export default function Badge({ role }) {
  const colors = {
    ADMIN: {
      bg: "#E8EEFF",
      color: "#3D52D5",
    },
    USER: {
      bg: "#DCFCE7",
      color: "#16A34A",
    },
    OWNER: {
      bg: "#FEF3C7",
      color: "#D97706",
    },
  };

  const badge = colors[role] || {
    bg: "#ECEEF5",
    color: "#4B5068",
  };

  return (
    <span
      className="px-3 py-1 rounded-full text-sm font-semibold"
      style={{
        backgroundColor: badge.bg,
        color: badge.color,
      }}
    >
      {role}
    </span>
  );
}