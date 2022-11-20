require('dotenv').config()

export const awsConfig = {
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    AWSBucket: process.env.AWSBucket
};