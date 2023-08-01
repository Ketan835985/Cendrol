const aws = require('aws-sdk');



const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;



const uploadFiles = async (file) => {
    AWS.config.update({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: AWS_REGION
    });

    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    const uploadParams = {
        Bucket: 'classroom-training-bucket',
        Key: `abc/${file.originalname}`,
        Body: file.buffer,
        ACL: 'public-read'
    };

    try {
        const data = await s3.upload(uploadParams).promise();
        return data.Location;
    } catch (error) {
        return {error : error.message}
    }
};

module.exports = {
    uploadFiles
};