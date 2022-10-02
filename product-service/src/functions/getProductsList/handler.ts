import { middyfy } from '@libs/lambda';
import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-models/api-gateway';
import { ApiResponse } from '@libs/api-models/api-response';
import { productsService } from 'src/database/services/product.service';
import { ProductInStock } from '@libs/models/product-in-stock';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
  const [products, stocks] = await Promise.all([productsService.getProducts(), productsService.getStocks()]);
  const productsInStock = products.map(product => {
    const stockData = stocks.find(stock => stock.product_id === product.id);

    return new ProductInStock({ ...product, count: stockData?.count });
  })

  return new ApiResponse({
    data: productsInStock,
  })
}

export const main = middyfy(getProductsList);
