import { HttpResponse } from '../protocols';
import { ServerError } from '../errors';

/**
 * It returns an object with a statusCode of 400 and a body of the error
 * @param {Error} error - Error - The error object that will be returned to the response body.
 * @returns An object with two properties: statusCode and body.
 */
export const badRequest = (error: Error): HttpResponse => {
    return { statusCode: 400, body: error };
};

/**
 * It returns an object with a statusCode of 500 and a body of a new ServerError object
 * @returns An object with two properties: statusCode and body.
 */
export const serverError = (error: Error): HttpResponse => {
    return { statusCode: 500, body: new ServerError(error.stack) };
};

/**
 * It takes a data parameter, and returns an object with a statusCode of 200 and a body property that is the data parameter
 * @param {any} data - The data you want to return to the client.
 * @returns An object with two properties: statusCode and body.
 */
export const ok = (data: any): HttpResponse => {
    return { statusCode: 200, body: data };
};

export const created = (data: any): HttpResponse => {
    return { statusCode: 201, body: data };
};

export const noContent = (): HttpResponse => {
    return { statusCode: 204, body: null };
};

export const unauthorized = (data: any): HttpResponse => {
    return { statusCode: 401, body: data };
};

export const forbidden = (data: any): HttpResponse => {
    return { statusCode: 403, body: data };
};
