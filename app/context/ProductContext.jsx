"use client";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCartItems();
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    const api = await axios.get(`${API_BASE_URL}/products`);
    if (api.data.success) {
      setProducts(api.data.products);
      setData(api.data.products);
    }
  };

  const addToCart = async (title, imgSrc, price) => {
    const api = await axios.post(`${API_BASE_URL}/cart`, {
      title,
      imgSrc,
      price,
    });
    if (api.data.success) {
      toast.success(api.data.message);
    }
  };

  const getCartItems = async () => {
    const api = await axios.get(`${API_BASE_URL}/cart`);
    if (api.data.success) {
      setCart(api.data.cartItems);
    }
  };

  const clearCart = async () => {
    const api = await axios.delete(`${API_BASE_URL}/cart`);
    if (api.data.success) {
      toast.success(api.data.message);
      getCartItems();
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        data,
        setData,
        addToCart,
        cart,
        getCartItems,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
// ✅ useContext(ProductContext) allows any component to access the context without manually importing ProductContext.
// ✅ Instead of writing: const { data } = useContext(ProductContext);
// We can simply use:
// const { data } = useProductContext();
// ✔ Custom hooks make it easier to use context in components.

export default ProductContext;
