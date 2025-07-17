import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Packages", path: "/packages" },
    { name: "Payments", path: "/payments" },
    { name: "Careers", path: "/careers" },
    { name: "Download", path: "/download" },
    // { name: "Blog", path: "/blog" },
    { name: "Quiz", path: "/quiz" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    // ✅ set here logo and name of the company fixed to the top left corner
    <nav className="bg-transparent backdrop-blur-md sticky top-16 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-2">
        {/* Header */}
        <div className="flex justify-between items-center h-16 bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg px-6 border border-white/30">
          {/* ✅ Left: Logo and Company Name */}
          <div className="flex items-center gap-4">
            <div className="">
              {/* <BookOpen className="h-6 w-6 text-white" /> */}
              <img src="/assets/Logo/2.svg" alt="Logo" className="h-14 w-14 rounded-full" />
            </div>
            {/* <div className="hidden sm:block">
              <div className="font-bold text-lg text-gray-800">
                Al-Sirat al-Mustaqim
              </div>
              <div className="text-sm text-blue-600 font-medium">
                الصراط المستقيم
              </div>
            </div> */}
          </div>

          {/* Right: Navigation Links or Menu Button */}
          <div className="flex items-center">
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => {
                const isActive = currentPath === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false); // for mobile
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group ${
                      isActive
                        ? "text-blue-600 bg-white/30 font-semibold"
                        : "text-gray-700 hover:text-blue-600 hover:bg-white/30"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Nav Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-300"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/20 backdrop-blur-xl border-t animate-fade-in rounded-b-2xl mx-4 mt-2 shadow-lg border border-white/30">
              {navItems.map((item) => {
                const isActive = currentPath === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                      isActive
                        ? "text-blue-600 bg-white/30 font-semibold"
                        : "text-gray-700 hover:text-blue-600 hover:bg-white/30"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
