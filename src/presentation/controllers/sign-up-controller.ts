import { HttpResponse } from "../protocols/http/http-response";
import { HttpRequest } from "../protocols/http/http-request";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new Error('"name" é obrigatório'),
    };
  }
}
