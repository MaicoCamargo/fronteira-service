import { SignUpController } from "./sign-up-controller";
import { MissingParamError } from "../errors/missing-param-error";
import { HttpRequest } from "../protocols/http/http-request";
import { InvalidParamError } from "../errors/invalid-param-error";
import { EmailValidator } from "../protocols/email-validator";

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

const makeEmailValidatorStub = (): any => {
  return new (class EmailValidatorSub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  })();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

const makeFakeHttpRequest = (name?: string, email?: string): HttpRequest => ({
  body: { name, email },
});

describe("SignUpController", function () {
  test("Deve retornar 400 se 'name' não for enviado", () => {
    const { sut } = makeSut();
    const response = sut.handle(makeFakeHttpRequest());
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError("name"));
  });

  test("Deve retornar 400 se 'email' não for enviado", () => {
    const { sut } = makeSut();
    const response = sut.handle(makeFakeHttpRequest("any_name"));
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError("email"));
  });

  test("Deve retornar 400 se 'email' for invalido", () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const response = sut.handle(
      makeFakeHttpRequest("any_name", "invalid_email.com")
    );
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new InvalidParamError("email"));
  });
});
