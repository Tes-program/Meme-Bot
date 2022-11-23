import mongoose from "mongoose";

const mentionSchema = new mongoose.Schema({
    tweet_id: {
    type: String,
    required: true,
    unique: true,
    },
    tweet_text: {
        type: String,
        required: true, 
    },
    tweet_user: {
        type: String,
        required: true,
    },
    match_response: {
        type: String,
        required: false,
    },
    in_reply_to_status_id_str: {
        type: String,
    },
});

const Mention = mongoose.model("mention", mentionSchema);

/**
 *  @param (*) mention the mention object
 *  @param {string} mention.tweet_id is the id of the tweet
 *  @param {string} mention.tweet_text the text of the tweet
 *  @param {string} mention.tweet_user the user who tweeted
 *  @param {string} mention.match_response the url of the song in the tweet
 *  @param {string} mention.in_reply_to_status_id_str the id of the tweet the mention is replying to
 */

