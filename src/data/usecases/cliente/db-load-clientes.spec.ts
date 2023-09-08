import { DbLoadClientes } from './db-load-clientes';
import { LoadClientesRepository } from '../../protocols/db/cliente/load-clientes-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { throwError } from '../../../../tests/helper/test-helper';
import { makeFakeDbClienteModelList, makeFakeLoadClienteModelList } from '../../../../tests/mock/mock-cliente';

const makeLoadClienteRepository = (): LoadClientesRepository => {
    class LoadClienteRepositoryStub implements LoadClientesRepository {
        load(): Promise<DbClienteModel[]> {
            return Promise.resolve(makeFakeDbClienteModelList());
        }
    }
    return new LoadClienteRepositoryStub();
};

interface SutTypes {
    sut: DbLoadClientes;
    loadClientesRepositoryStub: LoadClientesRepository;
}
const makeSut = (): SutTypes => {
    const loadClientesRepositoryStub = makeLoadClienteRepository();
    const sut = new DbLoadClientes(loadClientesRepositoryStub);
    return { sut, loadClientesRepositoryStub };
};
describe('DbLoadCliente Use Case', () => {
    test('Deve retornar todos os clientes em caso de sucesso', async () => {
        const { sut } = makeSut();
        const clientes = await sut.load();
        expect(clientes).toEqual(makeFakeLoadClienteModelList());
    });

    test('Deve "throws" se LoadCliente throws', async () => {
        const { sut, loadClientesRepositoryStub } = makeSut();
        jest.spyOn(loadClientesRepositoryStub, 'load').mockImplementationOnce(throwError);
        const promise = sut.load();
        await expect(promise).rejects.toThrow();
    });
});
