import { LoadCarroByClienteIdRepository } from '@/data/protocols/db/carro/load-carro-by-cliente-id-repository';
import { DbCarroModel } from '@/data/models/db-carro-model';
import { mockFakeDbCarroModelList } from './mock-carro';

export const makeLoadCarroByClienteIdRepository = (
    carros: DbCarroModel[] = mockFakeDbCarroModelList()
): LoadCarroByClienteIdRepository => {
    class LoadCarroByClienteIdRepositoryStub implements LoadCarroByClienteIdRepository {
        async loadByClienteId(id: number): Promise<DbCarroModel[]> {
            return await Promise.resolve(carros);
        }
    }
    return new LoadCarroByClienteIdRepositoryStub();
};
