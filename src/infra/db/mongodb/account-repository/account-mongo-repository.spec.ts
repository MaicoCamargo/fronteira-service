import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account-mongo-repository';

const makeSut = () => {
    const sut = new AccountMongoRepository();
    return sut;
};

describe('Account Mongo Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    });

    beforeEach(async () => {
        const collection = await MongoHelper.getCollection('accounts');
        await collection.deleteMany({});
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });
    test('Deve retornar uma conta em caso de sucesso', async () => {
        const sut = makeSut();
        const account = await sut.save({
            name: 'any_name',
            email: 'any_email',
            password: 'any_password'
        });
        expect(account).toBeTruthy();
        expect(account.id).toBeTruthy();
        expect(account.name).toBe('any_name');
        expect(account.password).toBe('any_password');
        expect(account.email).toBe('any_email');
    });
});
