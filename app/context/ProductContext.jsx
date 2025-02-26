"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Check if the user is logged in on initial load
  useEffect(() => {
    fetchAllProducts();
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem("userToken", token);
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const api = await axios.get(`${API_BASE_URL}/products`);
      if (api.data.success) {
        setProducts(api.data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
    }
  };

  // Delete product with loading state
  const deleteProduct = async (id) => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to delete a product.");
      return;
    }

    if (loadingDelete) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    setLoadingDelete(true);
    try {
      const response = await axios.delete(`/api/products?id=${id}`);
      if (response.data.success) {
        toast.success("Product deleted successfully");
        setProducts((prev) => prev.filter((p) => p._id !== id)); // Update UI without refetching
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
    setLoadingDelete(false);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoggedIn,
        login,
        logout,
        deleteProduct,
        fetchAllProducts,
        loadingDelete,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

export default ProductContext;
