import { middyfy } from '@libs/lambda';

import { ApiResponse } from '@libs/api-models/api-response';
import { S3Event } from 'aws-lambda';
import AWS from 'aws-sdk';
import csvParser from 'csv-parser';
import { ApiError } from '@libs/api-models/api-error';

const importFileParser = async (event: S3Event) => {
    const s3 = new AWS.S3({ region: 'eu-west-1' });
    const data2 = [];
    console.log(event.Records)
    for (const record of event.Records) {
        const path = record.s3.object.key;
        const bucket = record.s3.bucket.name;

        const s3Stream = s3.getObject({
            Bucket: bucket,
            Key: path,
        }).createReadStream()

        await new Promise((resolve, reject) => {
            s3Stream
                .pipe(csvParser())
                .on('data', data => {
                    console.log('data received')
                    console.log(data);
                    data2.push(data);
                })
                .on('error', error => {
                    console.log(`error: ${error}`)
                    reject('')
                    throw new ApiError(error, 'Error loading file', 503);
                })
                .on('end', async () => {
                    console.log('end')
                    console.log(data2)
                    await s3.copyObject({
                        Bucket: bucket,
                        CopySource: `${bucket}/${path}`,
                        Key: path.replace('uploaded', 'parsed')
                    }).promise();

                    await s3.deleteObject({
                        Bucket: bucket,
                        Key: record.s3.object.key
                    }).promise();

                    resolve("");
                })
        })
    }
    console.log(data2)
  return new ApiResponse({
    data: 'Success',
  })
};

export const main = middyfy(importFileParser);
