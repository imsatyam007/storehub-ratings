import {
  LayoutDashboard,
  Users,
  Store,
  Star,
} from "lucide-react";

const adminMenu = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Stores",
    path: "/admin/stores",
    icon: Store,
  },
  {
    label: "Ratings",
    path: "/admin/ratings",
    icon: Star,
  },
];

export default adminMenu;