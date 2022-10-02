import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-models/api-gateway';
import { productsService } from 'src/database/services/product.service';
import { ApiResponse } from '@libs/api-models/api-response';
import { middyfy } from '@libs/lambda';
import schema from '@functions/createProduct/schema';
import { ProductInStock } from '@libs/models/product-in-stock';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    console.log(`POST /product called product: ${event.body.product}`);
    const productInStock = event.body.product as ProductInStock;
    await productsService.createProduct(productInStock);

    return new ApiResponse({
        data: 'success',
    })
}

export const main = middyfy(createProduct);
