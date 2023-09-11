import { DbLoadClientes } from './db-load-clientes';
import { LoadClientesRepository } from '../../protocols/db/cliente/load-clientes-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { throwError } from '../../../../tests/helper/test-helper';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { LoadEnderecoByIdRepository } from '../../protocols/db/endereco/load-endereco-by-id-repository';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { DbCarroModel } from '../../models/db-carro-model';
import { DbEnderecoModel } from '../../models/db-endereco-model';
import { mockFakeDbEnderecoModel } from '../../../../tests/mock/mock-endereco';
import { makeFakeDbClienteModelList, makeFakeLoadClienteModelList } from '../../../../tests/mock/mock-cliente';
import { knexPaginateAdapter } from '../../../main/adapters/knex-paginate-adapter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { PageFilter } from '../../../main/protocols/page-filter';

const makeLoadClienteRepository = (): LoadClientesRepository => {
    class LoadClienteRepositoryStub implements LoadClientesRepository {
        async load(pageFilter?: PageFilter): Promise<Wrapper<DbClienteModel[]>> {
            return await knexPaginateAdapter(makeFakeDbClienteModelList(), pageFilter);
        }
    }
    return new LoadClienteRepositoryStub();
};

const makeLoadCarroRepository = (): LoadCarroByIdRepository => {
    class LoadCarroRepositoryStub implements LoadCarroByIdRepository {
        loadById(id: number): Promise<DbCarroModel> {
            return Promise.resolve(mockFakeDbCarroModel());
        }
    }
    return new LoadCarroRepositoryStub();
};

const makeLoadEnderecoRepository = (): LoadEnderecoByIdRepository => {
    class LoadEnderecoRepositoryStub implements LoadEnderecoByIdRepository {
        loadById(id: number): Promise<DbEnderecoModel> {
            return Promise.resolve(mockFakeDbEnderecoModel());
        }
    }
    return new LoadEnderecoRepositoryStub();
};

interface SutTypes {
    sut: DbLoadClientes;
    loadClientesRepositoryStub: LoadClientesRepository;
    loadCarroByIdRepositoryStub: LoadCarroByIdRepository;
    loadEnderecoByIdRepositoryStub: LoadEnderecoByIdRepository;
}
const makeSut = (): SutTypes => {
    const loadClientesRepositoryStub = makeLoadClienteRepository();
    const loadCarroByIdRepositoryStub = makeLoadCarroRepository();
    const loadEnderecoByIdRepositoryStub = makeLoadEnderecoRepository();
    const sut = new DbLoadClientes(
        loadClientesRepositoryStub,
        loadCarroByIdRepositoryStub,
        loadEnderecoByIdRepositoryStub
    );
    return { sut, loadClientesRepositoryStub, loadCarroByIdRepositoryStub, loadEnderecoByIdRepositoryStub };
};
describe('DbLoadCliente Use Case', () => {
    test('Deve retornar todos os clientes em caso de sucesso', async () => {
        const { sut, loadCarroByIdRepositoryStub, loadEnderecoByIdRepositoryStub, loadClientesRepositoryStub } =
            makeSut();
        jest.spyOn(loadClientesRepositoryStub, 'load').mockReturnValueOnce(
            Promise.resolve(await knexPaginateAdapter(makeFakeDbClienteModelList()))
        );
        jest.spyOn(loadCarroByIdRepositoryStub, 'loadById').mockReturnValueOnce(
            Promise.resolve(mockFakeDbCarroModel())
        );
        jest.spyOn(loadEnderecoByIdRepositoryStub, 'loadById').mockReturnValueOnce(
            Promise.resolve(mockFakeDbEnderecoModel())
        );
        const dbCarroModel: DbCarroModel = {
            cor: makeFakeLoadClienteModelList()[1].carro.cor,
            ano: makeFakeLoadClienteModelList()[1].carro.ano,
            modelo: makeFakeLoadClienteModelList()[1].carro.modelo,
            placa: makeFakeLoadClienteModelList()[1].carro.placa,
            kilometragem: makeFakeLoadClienteModelList()[1].carro.quilometragem,
            id_carro: makeFakeLoadClienteModelList()[1].carro.id
        };
        jest.spyOn(loadCarroByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(dbCarroModel));
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
