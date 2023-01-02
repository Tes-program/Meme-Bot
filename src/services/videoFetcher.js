import dotenv from "dotenv"
import AWS from "aws-sdk"
dotenv.config({ path: require('find-config')('.env')});
AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: 'us-east-1'
});

export const getVideo = async (Number)  => {
    const data = new AWS.S3()
        .getObject({
            Bucket: 'teslimmeme',
            Key: `videomemes/${Number}.mp4`
        })
        .promise();
    return data;
}
  

function encode(data) {
    let buf = Buffer.from(data);
    let base64video = buf.toString("base64");
    return base64video;
}
 

 

