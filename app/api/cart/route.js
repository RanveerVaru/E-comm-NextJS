import dbConnection from "@/app/utils/database";
import { addToCart, clearCartItems, getCartItems } from "@/app/controllers/cart";


export async function POST(req) {
    await dbConnection();
    return addToCart(req);
}

export async function GET(req) {
    await dbConnection();
    return getCartItems(req);
}

export async function DELETE(req) {
    await dbConnection();
    return clearCartItems(req);
}