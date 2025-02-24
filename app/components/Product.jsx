import React from "react";
import { useProductContext } from "../context/ProductContext";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

const Product = ({ items }) => {
  const { addToCart, getCartItems } = useProductContext();

  if (!items) {
    return (
      <div className="container mx-auto mt-40 px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="w-full h-[350px] bg-gray-200 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const handleBuyNow = (itemName) => {
    toast.success(`${itemName} purchased successfully 🎉`);
  };

  const handleAddToCart = (product) => {
    addToCart(product.title, product.imgSrc, product.price);
    getCartItems();
  };

  return (
    <div className="container mx-auto px-6 py-10 pt-32"> {/* Adjusted padding-top */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((product) => (
          <div
            key={product._id}
            className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
          >
            {/* Image & Category Tag */}
            <Link href={`/${product._id}`} className="block">
              <div className="relative w-full h-[200px] flex justify-center items-center bg-gray-100">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {product.category}
                </div>
              </div>

              {/* Title */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h2>
              </div>
            </Link>

            {/* Price & Buttons */}
            <div className="p-4 flex flex-col gap-3">
              <p className="text-xl font-bold text-blue-600">${product.price}</p>

              <div className="flex justify-between items-center gap-2">
                <button
                  onClick={() => handleBuyNow(product.title)}
                  className="w-3/5 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-2/5 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105"
                >
                  <FaShoppingCart size={18} />
                  <span className="hidden sm:inline">Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;