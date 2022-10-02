import { middyfy } from '@libs/lambda';

import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-models/api-gateway';
import { ApiResponse } from '@libs/api-models/api-response';
//import { ApiError } from '@libs/api-models/api-error';
import AWS from 'aws-sdk';
const s3 = new AWS.S3({region: 'eu-west-1'});

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const fileName = event.queryStringParameters?.name;
  const params = {
    Bucket: 'product-service-products-file-upload-bucket',
    Key: `uploaded/${fileName}`,
    ContentType: 'text/csv',
  }

 const url = s3.getSignedUrl('putObject', params);

  return new ApiResponse({
    data: url,
  })
};

export const main = middyfy(importProductsFile);
