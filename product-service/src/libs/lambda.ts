import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import type { AWS } from "@serverless/typescript";
import { Handler } from 'aws-lambda';
import { apiGatewayResponseMiddleware } from '@libs/middleware';
import cors from '@middy/http-cors'

export const middyfy = (handler: Handler) => {
  return middy(handler)
      .use(middyJsonBodyParser())
      .use(cors())
      .use(apiGatewayResponseMiddleware({ enableErrorLogger: process.env.IS_OFFLINE === 'true' }));
}

// AWSFunction type
export type AWSFunction = AWS['functions'][0];
