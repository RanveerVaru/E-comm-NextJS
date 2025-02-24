import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    title : {type : 'string' , required: true},
    price : {type : 'number' , required: true},
    imgSrc : {type : 'string' , required: true},
    // user : {type : mongoose.Schema.Types.ObjectId, ref : 'User'}
},{timestamps : true});

const Cart = mongoose.models.Cart || mongoose.model('Cart',cartSchema);

export default Cart;