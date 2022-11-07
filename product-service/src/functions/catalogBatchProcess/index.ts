import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/lambda';

export const catalogBatchProcess = {
    handler: `${ handlerPath(__dirname) }/handler.main`,
    events: [
        {
            sqs: {
                batchSize: 5,
                arn: 'arn:aws:sqs:eu-west-1:032392554761:catalogItemsQueue'
            }
        },
    ],
} as unknown as AWSFunction;
