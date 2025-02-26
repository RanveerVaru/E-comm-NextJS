import mongoose from "mongoose"

const dbConnection = async () => {
    await mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("MongoDB Connected successfully...")
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err.message);
    })
}

export default dbConnection;

