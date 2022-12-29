import cron from "node-cron";
import Tweet from "./utils/twitter.js";
import { saveMention, fetchMention } from "./model/tweetRespond.js";
export const tweet = new Tweet();

// cron job to run every 1 minutes
cron.schedule("*/1 * * * *", async () => {
   // Search for tweets that mention your bot's handle and include a specific keyword that will be saved to tweet_text
    const tweets = await tweet.searchTweets(
        "from:memebotv2",
        "tweet_text"
    );
    // loop through the tweets
    tweets.forEach(async (tweet) => {
        // get the tweet id
        const id = tweet.id_str;
        // get the tweet text
        const text = tweet.text;
        // get the tweet user
        const user = tweet.user.screen_name;
        // get the tweet data
        const data = await Tweet.getTweetText(id);
        // save the tweet data to the database
        await saveMention({
            tweet_id: id,
            tweet_text: text,
            tweet_user: user,
            image_url: data.tweet,
        });
    });
});