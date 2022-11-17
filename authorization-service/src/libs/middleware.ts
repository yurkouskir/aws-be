import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import MiddlewareFunction = middy.MiddlewareFn;
import { formatJSONResponse } from '@libs/api-models/api-gateway';
import { ApiError } from '@libs/api-models/api-error';

export const apiGatewayResponseMiddleware = (options: { enableErrorLogger?: boolean } = {}) => {
    const after: MiddlewareFunction<APIGatewayProxyEvent, any> = async (request) => {
        if (!request.event?.httpMethod || request.response === undefined || request.response === null) {
            return;
        }

        const existingKeys = Object.keys(request.response);
        const isHttpResponse = existingKeys.includes('statusCode')
            && existingKeys.includes('headers')
            && existingKeys.includes('body');

        if (isHttpResponse) {
            return;
        }

        request.response = formatJSONResponse(request.response);
    }

    const onError: MiddlewareFunction<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
        const { error } = request;
        let statusCode = 500;

        if (error instanceof ApiError) {
            statusCode = error.statusCode;
        }

        if (options.enableErrorLogger) {
            console.error(error);
        }

        request.response = formatJSONResponse({ message: error.message }, statusCode);
    }

    return {
        after,
        onError,
    };
}
