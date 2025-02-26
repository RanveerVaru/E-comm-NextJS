"use client";
import React from "react";
import { useProductContext } from "@/app/context/ProductContext";
import Product from "@/app/components/Product";

const Page = ({ params }) => {
  const { slug } = React.use(params);
  const { products } = useProductContext();
  const items = products.filter((p) =>
    p.title.toLowerCase().includes(slug.toLowerCase()) ||
    p.description.toLowerCase().includes(slug.toLowerCase())
  );
  

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <h2 className="text-3xl font-semibold text-gray-800">No Results Found</h2>
          <p className="text-gray-600 mt-2">Try searching for a different product.</p>
        </div>
      ) : (
        <Product items={items} />
      )}
    </div>
  );
};

export default Page;
