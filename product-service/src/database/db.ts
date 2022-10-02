import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const createDynamoDBClient = (): DocumentClient => {
    return new AWS.DynamoDB.DocumentClient();
};
