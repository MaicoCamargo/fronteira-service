import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { DbAddAccountModel } from "../../../../data/usescases/add-account/db-add-account";
import { DbAccountModel } from "../../../../data/models/db-account-model";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
  async save(data: DbAddAccountModel): Promise<DbAccountModel> {
    const collection = MongoHelper.getCollection("accounts");
    const result = await collection.insertOne(data);
    const { insertedId } = result;
    const { _id, ...createdAccountWithoutId } = await collection.findOne({
      _id: insertedId,
    });
    // @ts-expect-error
    return Object.assign({}, createdAccountWithoutId, { id: _id });
  }
}
