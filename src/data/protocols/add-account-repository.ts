import { DbAddAccountModel } from "../usescases/add-account/db-add-account";
import { DbAccountModel } from "../models/db-account-model";

export interface AddAccountRepository {
  save: (data: DbAddAccountModel) => Promise<DbAccountModel>;
}
