// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/admin/Sidebar";

const AdminLayout = () => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 p-4">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
