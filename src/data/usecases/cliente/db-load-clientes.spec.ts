import { DbLoadClientes } from './db-load-clientes';
import { LoadClientesRepository } from '../../protocols/db/cliente/load-clientes-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { throwError } from '../../../../tests/helper/test-helper';

const makeFakeDbClienteModelList = (): DbClienteModel[] => [
    {
        id_cliente: 1,
        cpf: 'any_cpf',
        carro_id: 1,
        nome: 'any_nome',
        endereco_id: 1,
        last_updated: new Date('2022-01-01'),
        telefone: 'any_telefone'
    },
    {
        id_cliente: 2,
        cpf: 'other_cpf',
        carro_id: 2,
        nome: 'other_nome',
        endereco_id: 2,
        last_updated: new Date('2022-01-01'),
        telefone: 'other_telefone'
    }
];

const makeFakeLoadClienteModelList = (): any[] => [
    {
        id: 1,
        cpf: 'any_cpf',
        nome: 'any_nome',
        lastUpdated: new Date('2022-01-01'),
        telefone: 'any_telefone'
    },
    {
        id: 2,
        cpf: 'other_cpf',
        nome: 'other_nome',
        lastUpdated: new Date('2022-01-01'),
        telefone: 'other_telefone'
    }
];

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
