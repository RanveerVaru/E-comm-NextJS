import dbConnection from "@/app/utils/database.js";
import { createProduct, getProducts } from "@/app/controllers/product.js";


export async function POST(req) {
    await dbConnection();
    return createProduct(req);
}

export async function GET(req) {
    await dbConnection();
    return await getProducts(req);
}

