import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/lambda';

export const getProductById = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products/{productId}',
            },
        },
    ],
} as AWSFunction;
