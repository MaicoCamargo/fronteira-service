import { SignUpController } from "../../presentation/controllers/signup/sign-up-controller";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";
import { DbAddAccount } from "../../data/usescases/add-account/db-add-account";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account-mongo-repository";

export const makeSignUpController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(accountMongoRepository);
  return new SignUpController(emailValidatorAdapter, dbAddAccount);
};
