import { EmailValidatorAdapter } from "./email-validator-adapter";

const makeSut = () => {
  return new EmailValidatorAdapter();
};

describe("EmailValidator Adapter", () => {
  test("Deve retornar false se o validator retornar false", () => {
    const sut = makeSut();
    const isValid = sut.isValid("invalid_email.com");
    expect(isValid).toEqual(false);
  });
});
