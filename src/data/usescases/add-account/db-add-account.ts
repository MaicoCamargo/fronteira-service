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

  async add(accountData: DbAddAccountModel): Promise<DbAccountModel> {
    return await this.addAccountRepository.save(accountData);
  }
}
