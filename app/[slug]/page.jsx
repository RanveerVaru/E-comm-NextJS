"use client";
import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext";
import Product from "../components/Product";
import toast from "react-hot-toast";

const ProductDetailPage = ({ params }) => {
  const { slug } = React.use(params);
  const { products, addToCart, getCartItems } = useProductContext();

  const [productById, setProductById] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filterProduct = products.find((p) => p._id === slug);
      if (filterProduct) {
        setProductById(filterProduct);

        // Exclude the current product from related items
        const related = products.filter(
          (p) => p.category === filterProduct.category && p._id !== slug
        );
        setRelatedProducts(related);
      }
    }
  }, [slug, products]); // <-- Depend on slug & products to update correctly

  const handleBuyNow = (itemName) => {
    toast.success(`${itemName} purchased successfully 🎉`);
  };

  if (!productById) {
    return <h1 className="text-center mt-8">Loading...</h1>;
  }

  return (
    <div className="container mx-auto mt-10 px-6 py-10">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={productById.imgSrc}
            alt={productById.title}
            width={400}
            height={400}
            className="rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{productById.title}</h1>
          <p className="text-gray-600">{productById.description}</p>
          <span className="text-lg font-semibold bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md">
            {productById.category}
          </span>

          {/* Price */}
          <p className="text-2xl font-bold text-blue-600">${productById.price}</p>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button onClick={() => {handleBuyNow(productById.title)}} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-transform duration-200 hover:scale-105">
              Buy Now
            </button>

            <button
              onClick={() => {
                addToCart(productById.title, productById.imgSrc, productById.price);
                getCartItems();
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-transform duration-200 hover:scale-105"
            >
              Add To Cart 🛒
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <Product items={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
