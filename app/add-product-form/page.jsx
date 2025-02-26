"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiUploadCloud } from "react-icons/fi";
import { useProductContext } from "../context/ProductContext";
const ProductForm = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const {fetchAllProducts} = useProductContext();
  const [submitBtn , setSubmitBtn] = useState("Add Product")
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]); // Store image previews

  // Handle input field changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Generate preview images
    const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreview(imagePreviews);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn("Wait....")
    if (files.length === 0) return toast.error("Please select images!");

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => formData.append(key, value));
    files.forEach((file) => formData.append("imgSrc", file));

    try {
      const res = await axios.post("/api/products", formData);
      if(res.data.success) {
        toast.success("Product added successfully!"); 
        // Reset form
        fetchAllProducts();
        setSubmitBtn("Add Product");
        setProduct({ title: "", description: "", price: "", category: "" });
        setFiles([]);
        setPreview([]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <input 
          type="text" 
          name="title" 
          value={product.title} 
          onChange={handleChange} 
          placeholder="Product Title" 
          required 
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        {/* Description Input */}
        <textarea 
          name="description" 
          value={product.description} 
          onChange={handleChange} 
          placeholder="Product Description" 
          required 
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Price Input */}
        <input 
          type="number" 
          name="price" 
          value={product.price} 
          onChange={handleChange} 
          placeholder="Price (INR)" 
          required 
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Category Input */}
        <input 
          type="text" 
          name="category" 
          value={product.category} 
          onChange={handleChange} 
          placeholder="Category" 
          required 
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* File Upload */}
        <label className="border border-dashed border-gray-400 p-6 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:border-blue-400 transition">
          <FiUploadCloud className="text-3xl text-gray-500" />
          <p className="text-sm text-gray-500">Click to upload product images</p>
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange} 
            className="hidden"
          />
        </label>

        {/* Image Previews */}
        {preview.length > 0 && (
          <div className="flex gap-2 overflow-x-auto p-2">
            {preview.map((src, index) => (
              <img key={index} src={src} alt="Preview" className="w-24 h-24 object-cover rounded-lg border shadow-sm" />
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          {submitBtn}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
