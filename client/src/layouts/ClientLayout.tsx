// src/layouts/ClientLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ClientLayout = () => (
  <div className="dark:bg-black">
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default ClientLayout;
