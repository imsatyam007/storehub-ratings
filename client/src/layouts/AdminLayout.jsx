import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

import adminMenu from "../constants/adminMenu";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar menuItems={adminMenu} />

      <div className="flex flex-1 flex-col">
        <div className="border-b border-[var(--border)] bg-white px-8 py-4">
          <Navbar />
        </div>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}