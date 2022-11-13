import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

const makeSut = () => {
  return new EmailValidatorAdapter();
};

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe("EmailValidator Adapter", () => {
  test("Deve retornar false se o validator retornar false", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email.com");
    expect(isValid).toEqual(false);
  });

  test("Deve retornar true se o validator retornar true", () => {
    const sut = makeSut();
    const isValid = sut.isValid("valid_email@email.com");
    expect(isValid).toEqual(true);
  });

  test("Deve chamar o validator com valor corret", () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("email@email.com");
    expect(isEmailSpy).toHaveBeenCalledWith("email@email.com");
  });
});
