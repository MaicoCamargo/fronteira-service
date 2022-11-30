import { MongoHelper } from '../helpers/mongo-helper';
import { Collection } from 'mongodb';
import { LogMongoRepository } from './log-mongo-repository';

interface SutTypes {
    sut: LogMongoRepository;
}

const makeSut = (): SutTypes => {
    return { sut: new LogMongoRepository() };
};
describe('Log Mongo Repository', function () {
    let collection: Collection;

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    });

    beforeEach(async () => {
        collection = await MongoHelper.getCollection('errors');
        await collection.deleteMany({});
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    test('Deve criar um erro na base de dados', async () => {
        const { sut } = makeSut();
        await sut.logError('any_error');
        const countDocuments = await collection.countDocuments();
        expect(countDocuments).toBe(1);
    });
});
