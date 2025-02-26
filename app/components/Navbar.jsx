"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { MdElectricBolt } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useProductContext } from "../context/ProductContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoggedIn, logout } = useProductContext(); // Use the global login state and logout function

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    router.push(`/search/${searchTerm}`);
  };

  return (
    <>
      {/* Floating Add Product Button (Only Visible if Logged In) */}
      {isLoggedIn && (
        <button
          onClick={() => router.push("/add-product-form")}
          className="fixed bottom-10 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-transform duration-200 hover:scale-105 z-50"
        >
          + Add Product
        </button>
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0  left-0 w-full z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold">
            <MdElectricBolt size={28} className="sm:text-3xl text-2xl" />
            <span className="hidden sm:inline text-2xl">E-Bazar</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-grow max-w-md mx-4 w-full">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
              >
                <AiOutlineSearch size={20} />
              </button>
            </div>
          </form>

          {/* Right Section */}
          <div className="flex gap-4 items-center">
            {/* Conditional Login / Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="text-blue-600 text-xl hover:text-blue-700 transition-colors duration-200"
              >
                <IoMdLogOut size={28} />
              </button>
            ) : (
              <button
                onClick={() => router.push("/authForm")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-transform duration-200 hover:scale-105"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;