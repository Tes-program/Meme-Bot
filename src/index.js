import cron from "node-cron";
import Tweet from "./utils/twitter.js";
import { saveMention, fetchMention } from "./model/tweetRespond.js";
import { getImage } from "./services/imageFetcher.js";
import { getVideo } from "./services/videoFetcher.js";
import { generateReply } from "./utils/generateReply.js";
import { fileURLToPath } from "url";
import path from "path";
import app from "./app.js";
import fs from "fs";

async function postMediaChunked(options) {
  return new Promise((resolve, reject) => {
    Tweet.postMediaChunked(options, function (err, data, response) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function replyToTweet(base64, id, text, user) {
  try {
    Tweet.post('media/upload', { media_data: base64 }, function (err, data, response) {
      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      var mediaIdStr = data.media_id_string
      var meta_params = { media_id: mediaIdStr }

      Tweet.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // now we can reference the media and post a tweet (media will attach to the tweet)
          var params = { status: generateReply(user, text), media_ids: [mediaIdStr], in_reply_to_status_id: id, }

          Tweet.post('statuses/update', params, function (err, data, response) {
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

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
// Post a video every 3 hours
async function upload(videoNumber) {
  let counter = 0;
  while (counter < 20) {
    try {
      const filePath = path.join(__dirname, `videos/${videoNumber}.mp4`)
      const data = await postMediaChunked({ file_path: filePath })
      console.log("tweeting", data.media_id);
      let succeeded = false;
      while (!succeeded) {
        const result = await Tweet.get('media/upload', {
          command: 'STATUS',
          media_id: data.media_id_string,
        });
        if (result.data.processing_info.state === 'succeeded') {
          succeeded = true;
        }
      }
      var params = { status: `This is video meme ${videoNumber}`, media_ids: [data.media_id_string] };
      const tweet = await Tweet.post('statuses/update', params);
      // Delete the file after it has been tweeted
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err)
          return
        }
        console.log("file deleted")
      })


      // If no error occurs, exit the loop
      break;
    } catch (error) {
      // Increment the counter
      counter++;
      // If the counter has reached 7, return an error message
      if (counter === 20) {
        return console.log(`Error: Retry limit exceeded. The function was unable to complete after ${counter} attempts.`);
      }
    }
  }
}


function encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString("base64");
  return base64;
}


let videoNumber = 0

cron.schedule('*/10 * * * * *', async () => {
  if (videoNumber > 2000) {
    cron.destory()
  } else {
    videoNumber++
    let keyword = await getVideo(videoNumber)
    upload(keyword)
  }


})



// cron job to run every 20 seconds
cron.schedule("0 */1 * * * *", async () => {
  // Search for tweets that mention your bot's handle and include a specific keyword that will be saved to tweet_text
  try {
    const tweets = await Tweet.get("statuses/mentions_timeline", {
      count: 1,
      tweet_mode: "extended",
    });
    // loop through the tweets
    for (const tweet of tweets.data) {
      const mention = await fetchMention(tweet.id_str);
      if (mention) {
        // console.log("Stopped", tweet.id_str )
        return;
      }
      // console.log("Processing tweet", tweet.id_str)
      // console.log(tweets.data) 
      // get the tweet id
      const id = tweet.id_str;
      //  console.log(id)
      // get the tweet text
      let text = tweet.full_text;
      //  text = text.replace('@memebotv2', '')
      //  text = text.trim()
      let pattern = /@[^\s]+\s/g;
      text = text.replace(pattern, '');
      //  console.log(text)
      // get the tweet user
      let user = tweet.user.screen_name;
      //  console.log(user)
      const data = await getImage(text)
      const base64 = encode(data.Body);
      //  console.log(base64)
      await saveMention({
        tweet_id: id,
        tweet_text: text,
        tweet_user: user,
        image_url: base64,
      });
      await replyToTweet(base64, id, text, user);
      //  console.log(user)
      // save the tweet data to the database


    };
  } catch (error) {
    console.log(error)
  }

});


// // Delete a version of a video every 3 hours
// cron.schedule('0 */15 * * * *', () => {
//  const filePath = path.join(__dirname, `videos/${videoNumber}.mp4`)
//  if (videoNumber > 2000) {
//    cron.destory()
//  }
//  else {
//   videoNumber++
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     //file removed
//   } )
//  }

// })
