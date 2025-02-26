"use client";
import React from "react";
import Product from "./components/Product";
import { useProductContext } from "./context/ProductContext";

const Page = () => {
  const { products } = useProductContext(); // Use the `products` state from ProductContext

  return (
    <div>
      <Product items={products} />
    </div>
  );
};

export default Page;