import { useState, useEffect, useRef} from "react";
import type { ReactNode } from "react";
import { useCart } from "@/lib/CartContext";
interface NavLink {
  name: string;
  href?: string;
  subLinks?: NavLink[];
}

interface ResponsiveNavbarProps {
  logo?: ReactNode | string;
  links?: NavLink[];
  className?: string;
}

export default function ResponsiveNavbar({
 
  logo = "Genaire",
  links = [
    {
      name: "Shop",
      subLinks: [
        { name: "New", href: "/shop/new" },
        { name: "All", href: "/shop" }
      ]
    },
    { name: "Gallery", href: "/gallery" },
    { name: "Info", href: "/info" },
    { name: "Events", href: "/events" }
  ],
  className = ""
}: ResponsiveNavbarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const {cartCount} = useCart();
  const [shopOpen, setShopOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        setShopOpen(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setShopOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  function isActive(href?: string): boolean {
    try {
      return href ? typeof window !== "undefined" && window.location.pathname === href : false;
    } catch {
      return false;
    }
  }


  return (
    <nav className={`w-full bg-white/80 backdrop-blur-md border-b border-gray-200 ${className}`} aria-label="Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">

          {/*  logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3">
              {typeof logo === "string" ? <span className="text-lg font-semibold">{logo}</span> : logo}
            </a>
          </div>

          {/* center: desktop nav links (hidden on small screens) */}
          <div className="hidden md:flex md:justify-center md:space-x-6 md:col-start-2">
            {links.map((link) =>
              link.subLinks ? (
                <div key={link.name} className="relative">
                  <button
                    onClick={() => setShopOpen((s) => !s)}
                    className={`text-sm font-medium px-3 py-2 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${
                      shopOpen ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"
                    }`}
                  >
                    {link.name}
                  </button>

                  {shopOpen && (
                    <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      {link.subLinks.map((sub) => (
                        <a
                          key={sub.href}
                          href={sub.href}
                          className={`block px-4 py-2 text-sm ${
                            isActive(sub.href) ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
)}

                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${
                    isActive(link.href) ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"
                  }`}
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          {/* search icon */}
          <div className="flex items-center space-x-4 md:col-start-3 md:justify-end">
            <button aria-label="Search" className="p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              <svg className="h-6 w-6 text-gray-700 hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </button>
              {/* shopping bad */}
            <a href="/cart" aria-label="cart" className="p-1 rounded focus:outline-none relative focus-visible:ring-2 focus-visible:ring-indigo-500">
              <svg className="h-6 w-6 text-gray-700 hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a2 2 0 104 0" />
              </svg>
              {cartCount > 0&&(
                <span className="absolute -top-1 -right-1 bg-red-500 text-white p-1 text-xs rounded-full ">
                  {cartCount}
                </span>
              )}
            </a>

            {/* mobile only hamburger button */}
            <button
              onClick={() => setOpen((s) => !s)}
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex items-center justify-center p-2 rounded-md md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu panel */}
      <div ref={menuRef} id="mobile-menu" className={`md:hidden ${open ? "block" : "hidden"} transition-all`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {links.map((link) =>
            link.subLinks ? (
              <div key={link.name}>
                <span className="block px-3 py-2 text-base font-medium text-gray-700">{link.name}</span>
                {link.subLinks.map((sub) => (
                  <a
                    key={sub.href}
                    href={sub.href}
                    className={`block pl-6 pr-3 py-2 rounded-md text-sm font-medium ${
                      isActive(sub.href) ? "text-indigo-600 bg-indigo-50" : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {sub.name}
                  </a>
                ))}
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href) ? "text-indigo-600 bg-indigo-50" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={
                  (e) =>{e.preventDefault(); setOpen(false)}}
              >
                {link.name}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
