import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, any>

export const formatJSONResponse = (response: Record<string, unknown>, statusCode: number = 200): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(response)
  }
}
