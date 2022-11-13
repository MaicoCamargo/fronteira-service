import { SignUpController } from "./sign-up-controller";
import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from "../../errors";
import {
  HttpRequest,
  EmailValidator,
  AddAccount,
  AddAccountModel,
  AccountModel,
} from "./signup-protocols";

const makeFakeAccountModel = () => ({
  id: "valid_id",
  name: "valid_name",
  email: "valid_email",
  password: "valid_password",
});

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(account: AddAccountModel): AccountModel {
      return makeFakeAccountModel();
    }
  }
  return new AddAccountStub();
};

const makeEmailValidator = (): any => {
  class EmailValidatorSub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorSub();
};

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
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

  test("Deve chamar AddAccount com valores corretos", () => {
    const { sut, addAccountStub } = makeSut();
    const request = makeFakeHttpRequest("any_name", "any_email@email.com");
    const spyAddAccount = jest.spyOn(addAccountStub, "add");
    sut.handle(request);
    expect(spyAddAccount).toHaveBeenCalledWith(request.body);
  });

  test("Deve retornar 500 se AddAccount throws", async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, "add").mockImplementationOnce(() => {
      throw new Error();
    });
    const request = makeFakeHttpRequest("any_name", "email@email.com");
    const response = sut.handle(request);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  test("Deve retornar 200 em caso de sucesso", async () => {
    const { sut } = makeSut();
    const newAccount = makeFakeAccountModel();

    const request = makeFakeHttpRequest(newAccount.name, newAccount.email);
    const response = sut.handle(request);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual(newAccount.name);
    expect(response.body.password).toEqual(newAccount.password);
    expect(response.body.email).toEqual(newAccount.email);
    expect(response.body.id).toEqual(newAccount.id);
  });
});
