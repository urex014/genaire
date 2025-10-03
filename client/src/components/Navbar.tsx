import { useState } from "react";
import { useTheme } from "@/utils/ThemeContext";
import { useCart } from "@/utils/CartContext";
import { Menu, X } from "lucide-react"; // for hamburger icons
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate()
  const {cart} = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-300 dark:border-black bg-white/80 dark:bg-black dark:backdrop-blur-xl mb-10 backdrop-blur-md fixed top-0 left-0 z-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0 text-2xl font-bold cursor-pointer">
            Bobyx
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="hover:text-blue-500 transition">Shop</a>
            <a href="#" className="hover:text-blue-500 transition">Latest Fits</a>
            <a href="#" className="hover:text-blue-500 transition">Gallery</a>
            <a href="#" className="hover:text-blue-500 transition">Contact</a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 hover:opacity-80 transition"
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={()=>{navigate('/cart')}} className="relative mx-4">
          <ShoppingCart size={20} color={theme ==="light"?"#000":"#ffffff"} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black backdrop-blur-lg border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-col space-y-4 px-4 py-4">
            <a href="/shop" className="hover:text-blue-500 transition">Shop</a>
            <a href="#" className="hover:text-blue-500 transition">Latest Fits</a>
            <a href="#" className="hover:text-blue-500 transition">Gallery</a>
            <a href="#" className="hover:text-blue-500 transition">Contact</a>

            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 hover:opacity-80 transition"
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
