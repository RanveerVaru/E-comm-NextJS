"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useProductContext } from "../context/ProductContext";
import axios from "axios";
import toast from "react-hot-toast";

const Product = ({ items }) => {
  const { deleteProduct, isLoggedIn, loadingDelete } = useProductContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    mobile: "",
    address: "",
    otherDetails :"",
  });
  const [loading, setLoading] = useState(false);

  // Open modal when "Buy Now" is clicked
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleBuyNow = async () => {
    if (!userDetails.name || !userDetails.mobile || !userDetails.address) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/order", {
        name: userDetails.name,
        mobile: userDetails.mobile,
        address: userDetails.address,
        product: selectedProduct.title,
        description: selectedProduct.description,
        otherDetails : userDetails.otherDetails,
      });

      if (data.success) {
        toast.success("Order placed successfully!");
        setUserDetails({ name: "", mobile: "", address: "", otherDetails :""});
        setIsModalOpen(false); // Close modal on success
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      toast.error("Error placing order.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-6 mt-8 py-10">
      {items?.length === 0 ? (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-4xl font-bold text-gray-500">No Products Found</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map((product) => (
            <div
              key={product._id}
              className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 transform relative"
            >
              {/* 🔹 Delete Button */}
              {isLoggedIn && (
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="absolute top-2 right-2 z-10 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-transform duration-200"
                  disabled={loadingDelete}
                >
                  {loadingDelete ? "Wait.." : <FaTrash />}
                </button>
              )}

              <Link href={`/${product._id}`} className="block">
                {/* 🔹 Image Slider */}
                <div className="relative w-full h-[200px] bg-gray-100">
                  <Swiper navigation={true} modules={[Navigation]} className="w-full h-full">
                    {product.imgSrc.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={img}
                          alt={`${product.title} ${index}`}
                          className="w-full h-full object-cover rounded-t-2xl"
                          loading="lazy"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                    {product.category}
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h2>
                </div>
              </Link>

              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="w-3/5 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-transform duration-200 hover:scale-105"
                  >
                    Buy Now
                  </button>
                  <p className="w-2/5 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-transform duration-200 hover:scale-105">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Order Form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Order</h2>
            <label className="block mb-2 text-sm font-medium">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="eg: Ranveer Varu"
              value={userDetails.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2 text-sm font-medium">Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={userDetails.mobile}
              placeholder="eg: 8965789685"
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2 text-sm font-medium">Address:</label>
            <input
              type="text"
              name="address"
              value={userDetails.address}
              placeholder="eg: kkv hall, Rajkot pincode-360001"
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2 text-sm font-medium">Details:</label>
            <input
              type="text"
              name="mobile"
              value={userDetails.otherDetails}
              placeholder="eg: 2-pair of shoes,black-color"
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleBuyNow}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
