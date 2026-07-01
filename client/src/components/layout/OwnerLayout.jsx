import DashboardLayout from "./DashboardLayout";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import ownerMenu from "../constants/ownerMenu";

export default function OwnerLayout() {
  return (
    <DashboardLayout
      sidebar={<Sidebar menuItems={ownerMenu} />}
      navbar={<Navbar />}
    />
  );
}