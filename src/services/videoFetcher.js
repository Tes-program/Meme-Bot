import AWS from "aws-sdk"
AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: 'us-east-1'
});

export const getVideo = async (number)  => {
    const Videodata = new AWS.S3()
        .getObject({
            Bucket: 'teslimmeme',
            Key: `videomemes/${number}.mp4`
        })
        .promise();
    return Videodata;
}
  

function videoEncoder(Videodata) {
    let buffer = Buffer.from(data);
    let base64video = buffer.toString("base64");
    return base64video;
}
 

 

