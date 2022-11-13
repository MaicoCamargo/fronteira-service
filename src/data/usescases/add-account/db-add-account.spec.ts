import {
  AddAccountRepository,
  DbAccountModel,
  DbAddAccount,
  DbAddAccountModel,
} from "./db-add-account-protocols";

const makeFakeDbAddAccountModel = (): DbAddAccountModel => ({
  name: "any_name",
  email: "any_email",
  password: "valid_password",
});

const makeFakeDbAccountModel = (): DbAccountModel => ({
  id: "valid_id",
  email: "valid_email",
  name: "valid_name",
  password: "hashed_password",
});

const makeAddAccountRepository = () => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async save(data: DbAddAccountModel): Promise<DbAccountModel> {
      return makeFakeDbAccountModel();
    }
  }
  return new AddAccountRepositoryStub();
};

interface SutTypes {
  sut: DbAddAccount;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(addAccountRepositoryStub);
  return { sut, addAccountRepositoryStub };
};

describe("DbAddAccount Use case", function () {
  test("Deve chamar o AddAccountRepository com valores corretos", () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const spySave = jest.spyOn(addAccountRepositoryStub, "save");
    sut.add(makeFakeDbAddAccountModel());
    expect(spySave).toHaveBeenCalledWith(makeFakeDbAddAccountModel());
  });

  test("Deve 'throw' se AddAccountRepository 'throw'", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, "save")
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()));
      });
    const promise = sut.add(makeFakeDbAddAccountModel());
    await expect(promise).rejects.toThrow();
  });
});
