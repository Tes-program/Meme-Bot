import AWS from "aws-sdk"
import fs from "fs"
import { fileURLToPath } from "url";
import { __dirname } from  "../index.js"
import path from "path";

AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: 'us-east-1'
});

export const getVideo = (keyword) => {
    return new Promise((resolve, reject) => {
      const data = new AWS.S3()
        .getObject({
          Bucket: 'teslimmeme',
          Key: `videomemes/${keyword}.mp4`,
        });
      const stream = data.createReadStream();
      const __filename = fileURLToPath(import.meta.url);
      const file = fs.createWriteStream(path.join(__dirname, `./videos/${keyword}.mp4`));
      stream.pipe(file);
      stream.on('end', () => {
        // console.log("done")
        resolve(keyword);
      });
      stream.on('error', (err) => {
        reject(err);
      });
    });
  };
  

    