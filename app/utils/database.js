import mongoose from "mongoose"

const dbConnection = async () => {
    await mongoose.connect("mongodb+srv://ranaveerbharvad3139:yAbBv2cWHaqAKLSm@cluster0.dqndz.mongodb.net/E-comm-NextJS")
    .then(() => {
        console.log("MongoDB Connected successfully...")
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err.message);
    })
}

export default dbConnection;

