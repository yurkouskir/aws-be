import { middyfy } from '@libs/lambda';
import { ApiResponse } from '@libs/api-models/api-response';
import { S3Event } from 'aws-lambda';
import AWS from 'aws-sdk';
import csvParser from 'csv-parser';
import { ApiError } from '@libs/api-models/api-error';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const importFileParser = async (event: S3Event) => {
    const s3 = new AWS.S3({ region: 'eu-west-1' });
    const sqsClient = new SQSClient({ region: 'eu-west-1' });
    const messages = [];

    for (const record of event.Records) {
        const path = record.s3.object.key;
        const bucket = record.s3.bucket.name;
        //ToDo: create s3 data provider and place following logic
        const s3Stream = s3.getObject({
            Bucket: bucket,
            Key: path,
        }).createReadStream()

        await new Promise<void>((resolve, reject) => {
            s3Stream
                .pipe(csvParser({
                    headers: ['title', 'description', 'count', 'price'],
                    skipLines: 1,
                }))
                .on('data', data => {
                    const product = JSON.stringify(data);
                        messages.push(
                            sqsClient.send(
                                new SendMessageCommand({
                                    QueueUrl: process.env.SQS_URL,
                                    MessageBody: product,
                                })
                            )
                        )
                })
                .on('error', error => {
                    reject(new ApiError(error, 'Error loading file', 503));
                })
                .on('end', async () => {
                    await s3.copyObject({
                        Bucket: bucket,
                        CopySource: `${bucket}/${path}`,
                        Key: path.replace('uploaded', 'parsed')
                    }).promise();

                    await s3.deleteObject({
                        Bucket: bucket,
                        Key: record.s3.object.key
                    }).promise();

                    try {
                        await Promise.all(messages);
                        resolve();
                    } catch(e) {
                        console.log(e)
                    }
                })
        })
    }

  return new ApiResponse({
    data: 'Success',
  })
};

export const main = middyfy(importFileParser);
