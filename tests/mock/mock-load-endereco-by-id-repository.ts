import { LoadEnderecoByIdRepository } from '@/data/protocols/db/endereco/load-endereco-by-id-repository';
import { DbEnderecoModel } from '@/data/models/db-endereco-model';
import { mockFakeDbEnderecoModel } from './mock-endereco';

export const makeLoadEnderecoByIdRepository = (): LoadEnderecoByIdRepository => {
    class LoadEnderecoByIdRepositoryStub implements LoadEnderecoByIdRepository {
        async loadById(id: number): Promise<DbEnderecoModel> {
            return await Promise.resolve(mockFakeDbEnderecoModel());
        }
    }
    return new LoadEnderecoByIdRepositoryStub();
};
