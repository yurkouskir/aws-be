import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import type { AWS } from "@serverless/typescript";
import { Handler } from 'aws-lambda';
//import cors from '@middy/http-cors'

export const middyfy = (handler: Handler) => {
  return middy(handler)
      .use(middyJsonBodyParser())
}

// AWSFunction type
export type AWSFunction = AWS['functions'][0];
