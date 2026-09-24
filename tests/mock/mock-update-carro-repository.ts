import { UpdateCarroModel, UpdateCarroRepository } from '@/data/protocols/db/carro/update-carro-repository';
import { DbCarroModel } from '@/data/models/db-carro-model';
import { mockFakeDbCarroModel } from './mock-carro';

export const makeUpdateCarroRepository = (carro: DbCarroModel = mockFakeDbCarroModel()): UpdateCarroRepository => {
    class UpdateCarroRepositoryStub implements UpdateCarroRepository {
        async update(model: UpdateCarroModel): Promise<DbCarroModel> {
            return await Promise.resolve(carro);
        }
    }
    return new UpdateCarroRepositoryStub();
};
