import cloudinary from "cloudinary";
import Product from "../models/product.js";
import { NextResponse } from "next/server";

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "your_cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY || "your_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "your_api_secret",
});

// ✅ Function to Upload Image to Cloudinary
const uploadImageToCloudinary = async (file) => {
  try {
    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64String}`;


    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: "products",
      resource_type: "auto",
    });

    return uploadResponse.secure_url;
  } catch (error) {
    throw new Error("Failed to upload image to Cloudinary");
  }
};

// ✅ Function to Create Product
export const createProduct = async (req) => {
  try {
    // 🔹 Read form data
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const imageFiles = formData.getAll("imgSrc");

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      imageFiles.length === 0
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 🔹 Upload images
    console.log("🖼 Uploading images to Cloudinary...");
    const imageUrls = await Promise.all(
      imageFiles.map(uploadImageToCloudinary)
    );

    const newProduct = await Product.create({
      title,
      description,
      price,
      category,
      imgSrc: imageUrls,
    });

    return NextResponse.json(
      { success: true, message: "Product Created Successfully", newProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// ✅ Function to Fetch Products
// ✅ Function to Fetch Products (Most Recent First)
export const getProducts = async () => {
  const products = await Product.find({}).sort({ createdAt: -1 }); // Sort by latest first

  return NextResponse.json(
    { success: true, message: "Products Fetched Successfully", products },
    { status: 200 }
  );
};


export const deleteProduct = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID required!" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error!" },
      { status: 500 }
    );
  }
};

