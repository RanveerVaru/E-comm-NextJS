"use client";
import React from "react";
import { useProductContext } from "../context/ProductContext";
import Link from "next/link";
import toast from "react-hot-toast";

const CartPage = () => {
  const { cart, clearCart } = useProductContext();

  const handleBuyNow = (itemName) => {
    toast.success(`${itemName} purchased successfully 🎉`);
  };

  return (
    <div className="container mx-auto mt-10 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Shopping Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <div className="text-center flex flex-col items-center gap-4">
          <p className="text-lg text-gray-600">No items added to the cart.</p>
          <Link
            href="/"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-transform duration-200 hover:scale-105"
          >
            Continue Shopping 🛍️
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {cart.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src={item.imgSrc}
                alt={item.title}
                width={400}
                height={400}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
    
            {/* Product Info */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">{item.title}</h1>    
    
              {/* Price */}
              <p className="text-2xl font-bold text-blue-600">${item.price}</p>
    
              {/* Action Buttons */}
              <div className="flex gap-4 mt-4">
                <button onClick={() => {handleBuyNow(item.title)}} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-transform duration-200 hover:scale-105">
                  Buy Now
                </button>
    
                <button
                  onClick={() => {
                    toast.success("item removed successfully !")
                  }}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-transform duration-200 hover:scale-105"
                >
                  Remove From Cart 🛒
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}

      {/* Clear Cart Button */}
      {cart.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-transform duration-200 hover:scale-105"
          >
            Clear Cart 🗑️
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
