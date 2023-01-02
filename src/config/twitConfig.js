import dotenv from 'dotenv';
dotenv.config({ path: '../.env'});

export const twitConfig = {
    consumer_key:  process.env.CONSUMER_KEY,       
    consumer_secret: process.env.CONSUMER_KEY_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};
// console.log(twitConfig)
