import AWS from "aws-sdk"


AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: 'us-east-1'
});
 
export const getImage = async (keyword)  => {
    const data = new AWS.S3()
        .getObject({
            Bucket: 'teslimmeme',
            Key: `fetchedmeme/${keyword}`
        })
        .promise();
    return data;
}
  

function encode(data) {
    let buf = Buffer.from(data);
    let base64 = buf.toString("base64");
    return base64;
}
 

 
