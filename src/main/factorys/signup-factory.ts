import { SignUpController } from '../../presentation/controllers/signup/sign-up-controller';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { DbAddAccount } from '../../data/usescases/add-account/db-add-account';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account-mongo-repository';
import { Controller } from '../../presentation/protocols';
import { LogControllerDecorator } from '../decorators/log';
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log-mongo-repository';

export const makeSignUpController = (): Controller => {
    const emailValidatorAdapter = new EmailValidatorAdapter();
    const accountMongoRepository = new AccountMongoRepository();
    const dbAddAccount = new DbAddAccount(accountMongoRepository);
    const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount);
    const logMongoRepository = new LogMongoRepository();
    return new LogControllerDecorator(signUpController, logMongoRepository);
};
