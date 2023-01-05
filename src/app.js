import mongoose from "mongoose";
import express from "express";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

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