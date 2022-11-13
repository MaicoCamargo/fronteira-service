import { SignUpController } from "./sign-up-controller";

describe("SignUpController", function () {
  test("Deve retornar 400 se o name não for enviado", () => {
    const sut = new SignUpController();
    const request = { body: { email: "email@email.com" } };
    const response = sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error('"name" é obrigatório'));
  });
});
