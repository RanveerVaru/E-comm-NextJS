"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { MdElectricBolt } from "react-icons/md";
import { useProductContext } from "../context/ProductContext";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const { products, setData, cart } = useProductContext();
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filterByCategory = (category) => {
    setData(products.filter((p) => p.category === category));
  };

  const filterByPrice = (price) => {
    setData(products.filter((p) => p.price >= price));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search/${searchTerm}`);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2 text-blue-600 font-bold">
          <MdElectricBolt size={28} className="sm:text-3xl text-2xl" />
          <span className="hidden sm:inline text-2xl">E-Bazar</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-grow max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500">
              <AiOutlineSearch size={20} />
            </button>
          </div>
        </form>

        {/* Cart Icon */}
        <Link href={"/cart"} className="relative">
          <AiOutlineShoppingCart size={28} className="text-blue-600" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

      {/* Category and Price Filters */}
      {pathname === "/" && (
        <div className="bg-gray-50 py-2">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto sm:flex-nowrap gap-4 py-2 scrollbar-hide">
              {/* Categories */}
              <div className="flex flex-nowrap gap-4">
                <button
                  onClick={() => setData(products)}
                  className="flex-shrink-0 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  All
                </button>
                <button
                  onClick={() => filterByCategory("mobiles")}
                  className="flex-shrink-0 px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Mobiles
                </button>
                <button
                  onClick={() => filterByCategory("laptops")}
                  className="flex-shrink-0 px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Laptops
                </button>
                <button
                  onClick={() => filterByCategory("tablets")}
                  className="flex-shrink-0 px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Tablets
                </button>
                <button
                  onClick={() => filterByCategory("accessories")}
                  className="flex-shrink-0 px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Accessories
                </button>
              </div>

              {/* Price Filters */}
              <div className="flex flex-nowrap gap-4">
                <button
                  onClick={() => filterByPrice(20000)}
                  className="flex-shrink-0 px-4 py-2 bg-gray-200 rounded-lg"
                >
                  ₹20,000+
                </button>
                <button
                  onClick={() => filterByPrice(30000)}
                  className="flex-shrink-0 px-4 py-2 bg-gray-200 rounded-lg"
                >
                  ₹30,000+
                </button>
                <button
                  onClick={() => filterByPrice(50000)}
                  className="flex-shrink-0 px-4 py-2 bg-gray-200 rounded-lg"
                >
                  ₹50,000+
                </button>
                <button
                  onClick={() => filterByPrice(60000)}
                  className="flex-shrink-0 px-4 py-2 bg-gray-200 rounded-lg"
                >
                  ₹60,000+
                </button>
                <button
                  onClick={() => filterByPrice(80000)}
                  className="flex-shrink-0 px-4 py-2 bg-gray-200 rounded-lg"
                >
                  ₹80,000+
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;