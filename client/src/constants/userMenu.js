import {
  LayoutDashboard,
  Store,
  Star,
  Lock,
} from "lucide-react";

const userMenu = [
  {
    label: "Dashboard",
    path: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Stores",
    path: "/user/stores",
    icon: Store,
  },
  {
    label: "My Ratings",
    path: "/user/ratings",
    icon: Star,
  },
  {
    label: "Change Password",
    path: "/user/change-password",
    icon: Lock,
  }
];

export default userMenu;