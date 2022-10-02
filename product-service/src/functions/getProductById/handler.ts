import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-models/api-gateway';
import { ApiResponse } from '@libs/api-models/api-response';
import { middyfy } from '@libs/lambda';
import { ApiError } from '@libs/api-models/api-error';
import { productsService } from 'src/database/services/product.service';
import { ProductInStock } from '@libs/models/product-in-stock';

const getProductById: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    console.log(`GET products/{productId} called, productId: ${event.pathParameters.productId}`)
    const productId = event.pathParameters.productId;
    const [product, stock] = await Promise.all([productsService.getProductById(productId), productsService.getStocksById(productId)]);

    if (!product) {
        throw new ApiError(new Error(), 'Product not found', 404);
    }

    return new ApiResponse({
        data: new ProductInStock({ ...product, count: stock?.count }),
    })
}

export const main = middyfy(getProductById);
