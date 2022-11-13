import { SignUpController } from "./sign-up-controller";
import { MissingParamError, InvalidParamError, ServerError } from "../errors";
import { HttpRequest, EmailValidator } from "../protocols";

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

const makeEmailValidator = (): any => {
  class EmailValidatorSub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorSub();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new SignUpController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

const makeFakeHttpRequest = (name?: string, email?: string): HttpRequest => ({
  body: { name, email },
});

describe("SignUpController", () => {
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

  test("Deve chamar o EmailValidator com valores corretos", () => {
    const { sut, emailValidatorStub } = makeSut();
    const spyIsValid = jest.spyOn(emailValidatorStub, "isValid");
    const request = makeFakeHttpRequest("any_name", "email@email.com");
    sut.handle(request);
    expect(spyIsValid).toHaveBeenCalledWith(request.body.email);
  });

  test("Deve retornar 500 se EmailValidator throws", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });
    const request = makeFakeHttpRequest("any_name", "email@email.com");
    const response = sut.handle(request);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });
});
