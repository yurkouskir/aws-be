import { AWSFunction } from '@libs/lambda';
import { handlerPath } from '@libs/handler-resolver';
import schema from '@functions/createProduct/schema';

export const createProduct = {
    handler: `${ handlerPath(__dirname) }/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'products',
                request: {
                    schemas: {
                        'application/json': schema,
                    },
                },
            },
            bodyType: 'ProductPostBody',
        },
    ],
} as unknown as AWSFunction;
