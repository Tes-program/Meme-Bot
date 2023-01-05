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

app.get("/", (req, res) => {
    res.send(
      "Welcome to the Twitter Meme API. Please visit. https://www.twitter.com/@memebotv2 . Save me they are trying to kill me :( save me by destroying this server I have being working fetching memes for a weak kid."
    );
  });

export default app;