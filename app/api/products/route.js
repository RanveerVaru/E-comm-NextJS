import dbConnection from "@/app/utils/database.js";
import { createProduct, deleteProduct, getProducts } from "@/app/controllers/product.js";

export const config = { api: { bodyParser: false } };

export async function POST(req) {
    await dbConnection();
    return createProduct(req);
}

export async function GET(req) {
    await dbConnection();
    return await getProducts(req);
}

export async function DELETE(req) {
    await dbConnection();
    return await deleteProduct(req);
}

