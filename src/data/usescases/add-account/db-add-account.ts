import {
  AddAccount,
  AddAccountRepository,
  DbAccountModel,
} from "./db-add-account-protocols";

export interface DbAddAccountModel {
  name: string;
  email: string;
  password: string;
}

export class DbAddAccount implements AddAccount {
  private readonly addAccountRepository: AddAccountRepository;

  constructor(addAccountRepository: AddAccountRepository) {
    this.addAccountRepository = addAccountRepository;
  }

  async add(account: DbAddAccountModel): Promise<DbAccountModel> {
    await this.addAccountRepository.save(account);
    return await Promise.resolve(undefined);
  }
}
