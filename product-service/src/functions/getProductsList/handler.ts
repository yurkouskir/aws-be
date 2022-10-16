import { middyfy } from '@libs/lambda';
import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-models/api-gateway';
import { ApiResponse } from '@libs/api-models/api-response';
import { PRODUCTS_MOCK } from '@libs/products-mock';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
  return new ApiResponse({
    data: PRODUCTS_MOCK,
  })
}

export const main = middyfy(getProductsList);
