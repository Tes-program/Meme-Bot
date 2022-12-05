import mongoose from "mongoose";
import express from "express";
import tweet_router from "./routes/tweetrRoutes";
import image_fetcher from "./services/imageFetcher";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/tweet", tweet_router);
app.use("/imageFetcher", image_fetcher)

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