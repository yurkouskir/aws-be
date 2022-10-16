import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/lambda';

export const getProductsList  = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
      },
    },
  ],
} as AWSFunction;
