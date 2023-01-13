import AWS from "aws-sdk"


AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: 'us-east-1'
});
 
export const getImage = async (keyword) => {
    try {
        console.log(keyword)
        const data = await new AWS.S3()
            .getObject({
                Bucket: 'teslimmeme',
                Key: `fetchedmeme/${keyword}`
            })
            .promise()
        return data;
    } catch (error) {
        console.log("error here")
        return false
    }
}
  
 

 
