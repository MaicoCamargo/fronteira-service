import { SignUpController } from "./sign-up-controller";
import { MissingParamError } from "../errors/missing-param-error";
import { HttpRequest } from "../protocols/http/http-request";

describe("SignUpController", function () {
  const makeFakeHttpRequest = (name?: string, email?: string): HttpRequest => ({
    body: { name, email },
  });

  test("Deve retornar 400 se o 'name' não for enviado", () => {
    const sut = new SignUpController();
    const response = sut.handle(makeFakeHttpRequest());
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError("name"));
  });

  test("Deve retornar 400 se o 'email' não for enviado", () => {
    const sut = new SignUpController();
    const response = sut.handle(makeFakeHttpRequest("any_name"));
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError("email"));
  });
});
