import Product from "../models/product.js";
import { NextResponse } from "next/server";

export const createProduct = async (req) => {
    const body = await req.json();

    const newProduct = await Product.create(body);

    return NextResponse.json({success : true , message : "Product Created Successfully" , newProduct : newProduct}, {status: 201});
}

export const getProducts = async (req) => {
    const products = await Product.find({});

    return NextResponse.json({success : true , message : "Products Fetched Successfully" , products : products}, {status: 200});
}
