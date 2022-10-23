import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket : 'product-service-products-file-upload-bucket',
        event: "s3:ObjectCreated:*",
        rules: [
          { prefix: 'uploaded/' }
        ],
        existing: true
      }
    },
  ],
};
