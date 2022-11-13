import { HttpResponse } from "../protocols/http/http-response";
import { HttpRequest } from "../protocols/http/http-request";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http";
import { Controller } from "../protocols/controller";

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ["name", "email"];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
