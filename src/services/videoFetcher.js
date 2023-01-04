import AWS from "aws-sdk"
import fs from "fs"


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
      const file = fs.createWriteStream(`./videos/video.mp4`);
      stream.pipe(file);
      stream.on('end', () => {
        resolve();
      });
      stream.on('error', (err) => {
        reject(err);
      });
    });
  };
  

    