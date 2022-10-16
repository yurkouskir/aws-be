import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-models/api-gateway';
import { ApiResponse } from '@libs/api-models/api-response';
import { PRODUCTS_MOCK } from '@libs/products-mock';
import { middyfy } from '@libs/lambda';
import { ApiError } from '@libs/api-models/api-error';

const getProductById: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    const productId = event.pathParameters.productId;
    const product = PRODUCTS_MOCK.find(product => product.id === productId);

    if (!product) {
        throw new ApiError(new Error(), 'Product not found', 404);
    }

    return new ApiResponse({
        data: product,
    })
}

export const main = middyfy(getProductById);
