import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-models/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductInStock } from '@libs/models/product-in-stock';
import { productsService } from 'src/database/services/product.service';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
const snsClient = new SNSClient({ region: 'eu-west-1' });

const catalogBatchProcess: ValidatedEventAPIGatewayProxyEvent<any> = async (event: any) => {
    const products = event.Records.map(({ body }) => body);
    console.log('batch products')
    console.log(products);
    for (const product of products) {
        try {
            const productInStock = new ProductInStock({...JSON.parse(product)});
            await productsService.createProduct(productInStock);

            await snsClient.send(
                new PublishCommand({
                    Subject: 'Product added',
                    Message: `Products ${product} added`,
                    TopicArn: process.env.SNS_ARN
                })
            );
        }
        catch (e) {
            console.log(`error creating product ${e} ${product}`)
        }
    }
}

export const main = middyfy(catalogBatchProcess);
