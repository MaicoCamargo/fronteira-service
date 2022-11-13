import { HttpResponse } from "../protocols/http/http-response";

export const badRequest = (error: Error): HttpResponse => {
  return { statusCode: 400, body: error };
};
