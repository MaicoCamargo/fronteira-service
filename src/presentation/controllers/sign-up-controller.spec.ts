import { SignUpController } from "./sign-up-controller";
import { MissingParamError } from "../errors/missing-param-error";
import { HttpRequest } from "../protocols/http/http-request";

const makeSut = () => {
  return new SignUpController();
};

const makeFakeHttpRequest = (name?: string, email?: string): HttpRequest => ({
  body: { name, email },
});

describe("SignUpController", function () {
  test("Deve retornar 400 se 'name' não for enviado", () => {
    const sut = makeSut();
    const response = sut.handle(makeFakeHttpRequest());
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError("name"));
  });

  test("Deve retornar 400 se 'email' não for enviado", () => {
    const sut = makeSut();
    const response = sut.handle(makeFakeHttpRequest("any_name"));
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError("email"));
  });
});
