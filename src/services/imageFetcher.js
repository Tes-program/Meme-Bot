import express from "express"
import { saveImageUrl } from "../model/tweetRespond.js";
import dotenv from "dotenv"
import { S3 } from "aws-sdk";
const AWS = require("aws-sdk");

const app = express();

const image_fetcher = express.Router();

app.get("/imageFetcher", (req, res) => {
    AWS.config.update({
        accessKeyId: process.env.AWSAccessKeyID,
        secretAccessKey: process.env.AWSSecretKey
    });

    let s3 = new AWS.S3();

    async function getImage() {
        const data = S3
        .getObject({
            Bucket: process.env.AWSBucket,
            Key: "fetchedmeme/${tweet_text}"
        })
        .promise();
        return data;
    }
// save image link to the database saveImageUrl

    getImage()
    .then((img) => {
        let image = encode(img.Body);
        saveImageUrl(image);
        res.send(image);
    })

    function encode(data) {
        let buf = Buffer.from(data);
        let base64 = buf.toString("base64");
        return base64;
    }
})

export default image_fetcher;


