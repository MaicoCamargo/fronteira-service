import { HttpResponse } from "../protocols/http/http-response";
import { ServerError } from "../errors/server-error";

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
export const serverError = (): HttpResponse => {
  return { statusCode: 500, body: new ServerError() };
};
