// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/admin/AdminNavbar.";


const AdminLayout = () => (
  <div className="flex bg-black dark:bg-black">
    <AdminNavbar />
    <main className="flex-1 bg-black p-4">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
