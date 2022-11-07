import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createDynamoDBClient } from 'src/database/db';
import { ProductInStock } from '@libs/models/product-in-stock';
import { GuidGenerator } from '@libs/guid-generator';

const { PRODUCTS_TABLE, STOCKS_TABLE } = process.env;

class ProductsService {
    constructor(
        private readonly docClient: DocumentClient,
        private readonly productsTableName: string,
        private readonly stocksTableName: string,
    ) {
    }

    public async getProducts(): Promise<any> {
        const result = await this.docClient
            .scan({
                TableName: this.productsTableName
            })
            .promise();

        return result.Items;
    }

    public async getProductById(id: string): Promise<any> {
        const result = await this.docClient
            .query({
                TableName: this.productsTableName,
                ExpressionAttributeValues: {
                    ":v1": id,
                },
                KeyConditionExpression: 'id=:v1'
            })
            .promise();
    
        return result.Items;
    }

    public async getStocks(): Promise<any> {
        const result = await this.docClient
            .scan({
                TableName: this.stocksTableName
            })
            .promise();

        return result.Items;
    }

    public async getStocksById(id: string): Promise<any> {
        const result = await this.docClient
            .query({
                TableName: this.stocksTableName,
                ExpressionAttributeValues: {
                    ":v1": id,
                },
                KeyConditionExpression: 'id=:v1'
            })
            .promise();

        return result.Items;
    }

    public async createProduct(productInStock: ProductInStock): Promise<any> {
        const { title, description, count, price } = productInStock;
        const id = GuidGenerator.generateGuid();

        const product = this.docClient
            .put(
                {
                    TableName: this.productsTableName,
                    Item: { id, description, price, title },
                }
            )
            .promise();

        const stocks = this.docClient
            .put(
                {
                    TableName: this.stocksTableName,
                    Item: { product_id: id, count },
                }
            )
            .promise();

        return Promise.all([product, stocks]);
    }
}

export const productsService = new ProductsService(createDynamoDBClient(), PRODUCTS_TABLE, STOCKS_TABLE);
