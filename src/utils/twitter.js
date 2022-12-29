import Twit from "twit";
import { twitConfig } from "../config/twitConfig";
const T = new Twit(twitConfig)

class Tweet {
    constructor() {
        this.tweet = "Hello World";
    }
}



/**
 * 
 * @param {*} This is the id of the tweet whoose data i need to get
 * @returns The data of the tweet as an object which includes the text of the tweet
 * 
 */

async function getTweetText(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const tweet = await T.get("statuses/show", {
                id,
                tweet_mode: "extended",
            });
            return resolve({ tweet: tweet.data});
        } catch(error) {
            reject (error)
        }

    })
}
/**
 * @param {*} This is the image you want to tweet
 * @returns the tweet as an object
 */
async function tweetImage(image) {
    return new Promise(async (resolve, reject) => {
        try {
            const tweet = await T.post("media/upload", {
                media_data: image
            });
            return resolve(tweet);
        } catch(error) {
            reject(error);
        }
    })
}

export default Tweet;
