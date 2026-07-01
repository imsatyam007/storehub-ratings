import DashboardLayout from "./DashboardLayout";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import userMenu from "../constants/userMenu";

export default function UserLayout() {
  return (
    <DashboardLayout
      sidebar={<Sidebar menuItems={userMenu} />}
      navbar={<Navbar />}
    />
  );
}