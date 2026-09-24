import { DbLoadClientes } from './db-load-clientes';
import { LoadClientesDbFilter, LoadClientesRepository } from '../../protocols/db/cliente/load-clientes-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { throwError } from '../../../../tests/helper/test-helper';
import { LoadEnderecoByIdRepository } from '../../protocols/db/endereco/load-endereco-by-id-repository';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { DbEnderecoModel } from '../../models/db-endereco-model';
import { mockFakeDbEnderecoModel } from '../../../../tests/mock/mock-endereco';
import { makeFakeDbClienteModelList, makeFakeLoadClienteModelList } from '../../../../tests/mock/mock-cliente';
import { knexPaginateAdapter } from '@/main/adapters/knex-paginate-adapter';
import { LoadCarroByClienteIdRepository } from '@/data/protocols/db/carro/load-carro-by-cliente-id-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { Filter } from '@/main/protocols/filter';
import { makeRedisCacheRepository } from '../../../../tests/mock/mock-redis-cache-repository';
import { makeLoadEnderecoByIdRepository } from '../../../../tests/mock/mock-load-endereco-by-id-repository';
import { makeLoadCarroByClienteIdRepository } from '../../../../tests/mock/mock-load-carro-by-cliente-id-repository';
import { RedisHelper } from '@/infra/db/redis/helpers/redis-helper';

const makeLoadClienteRepository = (): LoadClientesRepository => {
    class LoadClienteRepositoryStub implements LoadClientesRepository {
        async load(filters?: Filter<LoadClientesDbFilter>): Promise<Wrapper<DbClienteModel[]>> {
            const wrapper: Wrapper<DbClienteModel[]> = { content: makeFakeLoadClienteModelList() };
            return Promise.resolve(wrapper);
        }
    }
    return new LoadClienteRepositoryStub();
};

interface SutTypes {
    sut: DbLoadClientes;
    loadClientesRepositoryStub: LoadClientesRepository;
    loadCarroByClienteIdRepositoryStub: LoadCarroByClienteIdRepository;
    loadEnderecoByIdRepositoryStub: LoadEnderecoByIdRepository;
}
const makeSut = (): SutTypes => {
    const loadClientesRepositoryStub = makeLoadClienteRepository();
    const loadCarroByClienteIdRepositoryStub = makeLoadCarroByClienteIdRepository();
    const loadEnderecoByIdRepositoryStub = makeLoadEnderecoByIdRepository();
    const redisCacheRepositoryStub = makeRedisCacheRepository();
    const sut = new DbLoadClientes(
        loadClientesRepositoryStub,
        loadCarroByClienteIdRepositoryStub,
        loadEnderecoByIdRepositoryStub,
        redisCacheRepositoryStub,
        redisCacheRepositoryStub
    );
    return { sut, loadClientesRepositoryStub, loadCarroByClienteIdRepositoryStub, loadEnderecoByIdRepositoryStub };
};

describe('DbLoadClientes Use Case', () => {
    beforeEach(async () => {
        await RedisHelper.cleanAll();
    });

    afterAll(async () => {
        await RedisHelper.disconnect();
    });

    test('Deve retornar todos os clientes em caso de sucesso', async () => {
        const { sut, loadCarroByClienteIdRepositoryStub, loadEnderecoByIdRepositoryStub, loadClientesRepositoryStub } =
            makeSut();
        jest.spyOn(loadClientesRepositoryStub, 'load').mockReturnValueOnce(
            Promise.resolve(await knexPaginateAdapter(makeFakeDbClienteModelList()))
        );
        jest.spyOn(loadCarroByClienteIdRepositoryStub, 'loadByClienteId').mockReturnValueOnce(
            Promise.resolve([mockFakeDbCarroModel()])
        );
        jest.spyOn(loadEnderecoByIdRepositoryStub, 'loadById').mockReturnValueOnce(
            Promise.resolve(mockFakeDbEnderecoModel())
        );

        jest.spyOn(loadCarroByClienteIdRepositoryStub, 'loadByClienteId').mockReturnValueOnce(Promise.resolve([]));
        const dbEnderecoModel: DbEnderecoModel = {
            id_endereco: makeFakeLoadClienteModelList()[1].endereco.id,
            cep: makeFakeLoadClienteModelList()[1].endereco.cep,
            rua: makeFakeLoadClienteModelList()[1].endereco.rua,
            numero: makeFakeLoadClienteModelList()[1].endereco.numero,
            complemento: makeFakeLoadClienteModelList()[1].endereco.complemento,
            cidade: makeFakeLoadClienteModelList()[1].endereco.cidade
        };
        jest.spyOn(loadEnderecoByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(dbEnderecoModel));

        const clientes = await sut.load();
        expect(clientes.content).toEqual(makeFakeLoadClienteModelList());
    });

    test('Deve "throws" se LoadCliente throws', async () => {
        const { sut, loadClientesRepositoryStub } = makeSut();
        jest.spyOn(loadClientesRepositoryStub, 'load').mockImplementationOnce(throwError);
        const promise = sut.load();
        await expect(promise).rejects.toThrow();
    });
});
