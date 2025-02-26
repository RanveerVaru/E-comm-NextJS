import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const login = async (req) => {
    try {
        const { email, password } = await req.json(); // Await parsing JSON
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password); // Fix order
        if (!isPasswordMatch) {
            return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
        }

        const token = jwt.sign({ id: user._id, name: user.name }, "secretttt", { expiresIn: "1d" });

        return NextResponse.json({ success: true, message: "Login successful", token }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: `Login failed: ${error.message}` }, { status: 500 });
    }
};

export const signup = async (req) => {
    try {
        const { name, email, password } = await req.json(); // Await parsing JSON

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, message: "User already exists" }, { status: 409 });
        }

        const hashedPass = await bcrypt.hash(password, 10); // Await bcrypt.hash
        const newUser = await User.create({ email, password: hashedPass, name });

        return NextResponse.json({ success: true, message: "Signup successful", user: newUser }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ success: false, message: `Signup failed: ${error.message}` }, { status: 500 });
    }
};





