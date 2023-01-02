// A functions that generates a reply for a tweet by taking in the image and a tweet text and also a reponse for a scenario where the tweet text is not found


export const generateReply = (user, text) => {
    if (!text) {
        return `@${user} Sorry, the meme you are looking for is not found. Please try again and make sure you are using the correct format`;
    }
    return `@${user} Here is your ${text} meme. Thanks for using memebotv2 `;
}