"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, PenTool, LogOut, X } from "lucide-react"; // Import icons

interface NavBarProps {
  theme: string;
  setTheme: (theme: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setShowPopup: (show: boolean) => void;
}

export default function NavBar({
  theme,
  setTheme,
  searchQuery,
  setSearchQuery,
  setShowPopup,
}: NavBarProps) {
  const isDark = theme === "dark";
  const pathname = usePathname();
  const router = useRouter();
  const isLandingPage = pathname === "/workspace";

  const [showSearch, setShowSearch] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <nav
      className={`p-4 shadow-md flex justify-between items-center fixed w-full top-0 z-50 transition-all duration-500 ${
        isDark ? "bg-blue-800 text-gray-200" : "bg-blue-500 text-white"
      }`}
    >
      {/* Left Section */}
      <h1 className="text-xl font-bold">PlanAi</h1>

      {/* Center - Hide on Landing Page */}
      {!isLandingPage && (
        <ul className="flex space-x-4">
          <li>
            <a href="#about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#features" className="hover:underline">
              Features
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      )}

      {/* Right Section */}
      <div className="flex space-x-4 items-center">
        {/* Search Icon - Only on Landing Page */}
        {isLandingPage && (
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <Search className="w-5 h-5" />
          </button>
        )}

        {/* Search Box - Shows when search is clicked */}
        {showSearch && (
          <div className="absolute top-16 right-10 bg-white text-black p-2 rounded-lg shadow-md flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-1 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
              }}
              className="text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Pen Icon - Only on Landing Page */}
        {isLandingPage && (
          <button
            onClick={() => setShowPopup(true)}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <PenTool className="w-5 h-5" />
          </button>
        )}

        {/* Sign Out Icon - Only on Landing Page */}
        {isLandingPage && (
          <button
            onClick={handleSignOut}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`px-4 py-2 rounded-md shadow-md transition-all duration-300 ${
            isDark
              ? "bg-gray-700 text-blue-300 hover:bg-gray-600"
              : "bg-white text-blue-500 hover:bg-gray-200"
          }`}
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}
