import {
  LayoutDashboard,
  Store,
  Star,
  Lock,
} from "lucide-react";

const ownerMenu = [
  {
    label: "Dashboard",
    path: "/owner/dashboard",
    icon: LayoutDashboard,
  },
    {
    label: "My Store",
    path: "/owner/store",
    icon: Store,
  },
  {
    label: "Ratings",
    path: "/owner/ratings",
    icon: Star,
  },
    {
    label: "Change Password",
    path: "/owner/change-password",
    icon: Lock,
  },
];

export default ownerMenu;