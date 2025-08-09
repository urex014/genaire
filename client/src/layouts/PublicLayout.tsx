import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 py-6 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Genaire. All rights reserved.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="/privacy" className="hover:text-indigo-600 text-sm">Privacy Policy</a>
            <a href="/terms" className="hover:text-indigo-600 text-sm">Terms of Service</a>
            <a href="/contact" className="hover:text-indigo-600 text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
