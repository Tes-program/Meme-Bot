import mongoose from "mongoose";
import express from "express";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
    },
    async (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log("Connection to MongoDB Established")
    }
)
export default app;