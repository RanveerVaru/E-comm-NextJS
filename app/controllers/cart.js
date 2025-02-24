import Cart from "../models/cart.js";
import { NextResponse } from "next/server";


export const addToCart = async (req) => {
    const body = await req.json();

    const newCart = await Cart.create(body);

    return NextResponse.json({success : true , message : "Item added to cart successfully" , cartItem : newCart } , {status : 201});
}

export const getCartItems = async (req) => {
    const cartItems = await Cart.find({});

    return NextResponse.json({success : true , message : "Fetched cart items successfully" , cartItems } , {status : 200});
}

export const clearCartItems = async (req) => {
    await Cart.deleteMany({});

    return NextResponse.json({success : true , message : "Cart items cleared successfully" } , {status : 200});
}
