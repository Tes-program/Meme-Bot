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
    image_url: {
        type: String,
        required: false,
    },
    video_url: {
        type: String,
        required: false,
    },
});

const Mention = mongoose.model("mention", mentionSchema);

/**
 *  @param (*) mention the mention object
 *  @param {string} mention.tweet_id is the id of the tweet
 *  @param {string} mention.tweet_text the text of the tweet
 *  @param {string} mention.tweet_user the user who tweeted
 * @param {string} mention.image_url the url of the image
 */
export const saveMention = async (mention) => {
    try {
        const newMention = new Mention(mention);
        await newMention.save();
    } catch (error) {
        console.log(error);
    }
}

// fetch tweet mention by the id
export const fetchMention = async (id) => {
    try {
        const mention = await
        Mention.findOne({ tweet_id:
        id });
        return mention;
    } catch (error) {
        console.log(error);
    }
}

// save image url to the database
export const saveImageUrl = async (image) => {
    const newImage = new Image(image);
    try {
      const image = await newImage.save();
      return image;
    } catch (error) {
      console.log(error.message);
    }
  };
export default Mention;