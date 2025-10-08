// src/components/Sidebar.tsx
import { Link } from "react-router-dom";
import { Hamburger,X } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [open, isOpen] = useState(false)
  if(!open){
    return(
      <div onClick={()=>{
        isOpen(!open)
      }} className="absolute top-2 left-2 p-10">
        <Hamburger color="white" size={20} />
      </div>
    )
  }

  return (
    <aside className={open?"w-64 h-screen z-50 bg-blacktext-white p-6 fixed top-0 left-0":"hidden"}>
      <div onClick={()=>{isOpen(!open)}} className="w-full hover:cursor-pointer justify-end flex">
      <X size={20} color="white" />
      </div>
      <h2 className="text-2xl font-bold mb-6">ClothBrand Admin</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/products" className="hover:text-blue-400">Products</Link>
        <Link to="/orders" className="hover:text-blue-400">Orders</Link>
        <Link to="/users" className="hover:text-blue-400">Users</Link>
        <Link to="/settings" className="hover:text-blue-400">Settings</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
