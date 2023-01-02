import Twit from "twit";
import { twitConfig } from "../config/twitConfig.js";
import { generateReply } from "./generateReply.js";

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
 * @param {*} This is the tweet you want to reply to with an image
 * @returns the tweet data as an object
 */

 async function replyToTweet(base64, id, text, user) {
    try {
        T.post('media/upload', { media_data: base64 }, function (err, data, response) {
            // now we can assign alt text to the media, for use by screen readers and
            // other text-based presentations and interpreters
            var mediaIdStr = data.media_id_string
            var meta_params = { media_id: mediaIdStr}
          
            T.post('media/metadata/create', meta_params, function (err, data, response) {
              if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                var params = { status: generateReply(user, text), media_ids: [mediaIdStr], in_reply_to_status_id: id, }
          
                T.post('statuses/update', params, function (err, data, response) {
                    if (err) {
                       return console.log(err)
                    }
                  console.log(data)
                })
              }
            })
          })
    } catch (error) {
        console.log(error)
    }
}
 


export default T;

