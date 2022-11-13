import {
  HttpResponse,
  HttpRequest,
  Controller,
  EmailValidator,
} from "../protocols";
import { MissingParamError, InvalidParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http";
import { AddAccount } from "../../domain/usecases/add-account";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ["name", "email"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) return badRequest(new InvalidParamError("email"));
      const account = httpRequest.body;
      this.addAccount.add({
        name: account.name,
        email: account.email,
        password: account.password,
      });
    } catch (err) {
      return serverError();
    }
  }
}
