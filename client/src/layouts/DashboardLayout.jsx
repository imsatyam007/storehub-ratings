import { Outlet } from "react-router-dom";

export default function DashboardLayout({
  sidebar,
  navbar,
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-[var(--border)] bg-[var(--surface)]">
        {sidebar}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-20 border-b border-[var(--border)] bg-[var(--surface)] px-8 flex items-center justify-between">
          {navbar}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}