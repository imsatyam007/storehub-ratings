import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import adminMenu from "../constants/adminMenu";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-var(--background) overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar menuItems={adminMenu} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Fixed Navbar */}
        <header
          className="
                fixed
                top-0
                z-50
                h-20
                shrink-0
                border-b
                border-var(--border)
               bg-white
                px-8
                flex
                items-center
              "
            >
          <Navbar />
        </header>

        {/* Scrollable Content */}
        <main
          className="
            flex-1
            overflow-y-auto
            bg-[var(--background)]
            p-8
            mt-20
          "
        style={{ height: "calc(100vh - 80px)" }}
      >
  <Outlet />
</main>
      </div>
    </div>
  );
}