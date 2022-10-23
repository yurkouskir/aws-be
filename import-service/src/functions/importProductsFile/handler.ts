import { middyfy } from '@libs/lambda';
import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-models/api-gateway';
import { ApiResponse } from '@libs/api-models/api-response';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
const s3 = new S3Client({ region: 'eu-west-1' });
const { UPLOAD_PRODUCTS_BUCKET_NAME } = process.env;

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const fileName = event.queryStringParameters?.name;
  const params = new PutObjectCommand({
      Bucket: UPLOAD_PRODUCTS_BUCKET_NAME,
      Key: `uploaded/${ fileName }`,
      ContentType: 'text/csv',
  });

 const url = await getSignedUrl(s3, params, { expiresIn: 3600 });

  return new ApiResponse({
    data: url,
  })
};

export const main = middyfy(importProductsFile);
