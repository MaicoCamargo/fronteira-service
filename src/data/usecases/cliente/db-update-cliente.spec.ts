import { UpdateClienteRepository } from '../../protocols/db/cliente/update-cliente-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { DbUpdateCliente } from './db-update-cliente';
import {
    mockFakeClienteModel,
    mockFakeDbClienteModel,
    mockFakeUpdateClienteParams
} from '../../../../tests/mock/mock-cliente';
import { UpdateCarroModel, UpdateCarroRepository } from '../../protocols/db/carro/update-carro-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { mockFakeDbCarroModel, mockFakeDbCarroModelList } from '../../../../tests/mock/mock-carro';
import { AddCarroModel, SaveCarroRepository } from '../../protocols/db/carro/save-carro-repository';
import { UpdateClienteParams } from '@/domain/usecases/cliente/update-cliente';
import { ClienteModel } from '@/domain/models/cliente-model';
import { CarroModel } from '@/domain/models/carro-model';
import { LoadCarroByClienteIdRepository } from '../../protocols/db/carro/load-carro-by-cliente-id-repository';
import { DeleteCarroRepository } from '../../protocols/db/carro/delete-carro-repository';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';
import { makeRedisCacheRepository } from '../../../../tests/mock/mock-redis-cache-repository';
import { RedisHelper } from '@/infra/db/redis/helpers/redis-helper';

describe('DbUpdateCliente Use Case', () => {
    afterAll(async () => {
        await RedisHelper.disconnect();
    });

    test('Deve chamar UpdateClienteRepository com valores corretos', async () => {
        const { sut, updateClienteRepositoryStub } = makeSut();
        const updateSpy = jest.spyOn(updateClienteRepositoryStub, 'update');
        await sut.update(mockFakeUpdateClienteParams());
        expect(updateSpy).toHaveBeenCalledWith({
            id_cliente: mockFakeUpdateClienteParams().id,
            nome: mockFakeUpdateClienteParams().nome,
            telefone: mockFakeUpdateClienteParams().telefone,
            cpf: mockFakeUpdateClienteParams().cpf
        });
    });

    test('Deve lançar exceção se UpdateClienteRepository lançar exceção', async () => {
        const { sut, updateClienteRepositoryStub } = makeSut();
        jest.spyOn(updateClienteRepositoryStub, 'update').mockReturnValueOnce(Promise.reject(new Error()));
        const promise = sut.update(mockFakeUpdateClienteParams());
        await expect(promise).rejects.toThrow();
    });

    test('Deve retornar um cliente atualizado em caso de sucesso', async () => {
        const { sut } = makeSut();
        const wrapper = await sut.update(mockFakeUpdateClienteParams());
        // todo quando atualizar endereco remover {...}
        expect(wrapper.content).toEqual({
            id: mockFakeClienteModel().id,
            telefone: mockFakeClienteModel().telefone,
            cpf: mockFakeClienteModel().cpf,
            carros: mockFakeClienteModel().carros,
            nome: mockFakeClienteModel().nome
        });
        const cached = await (await RedisHelper.getClient()).scan(0, { MATCH: `customers::list*` });
        expect(cached.keys).toHaveLength(0);
    });

    test('Deve criar um novo carro se um novo carro for fornecido', async () => {
        const { sut, saveCarroRepositoryStub } = makeSut();
        const clienteWithNewCar: UpdateClienteParams = { ...mockFakeUpdateClienteParams() };
        clienteWithNewCar.carros.push(makeFakeNewAddCarroModel());
        jest.spyOn(saveCarroRepositoryStub, 'save').mockResolvedValue(makeFakeNewDbCarroModel());
        const cliente = await sut.update(clienteWithNewCar);
        const updated: ClienteModel = mockFakeClienteModel();
        updated.carros.push(makeFakeNewCarroModel());
        // todo quando atualizar endereco remover {...}
        expect(cliente.content).toEqual({
            id: updated.id,
            telefone: updated.telefone,
            cpf: updated.cpf,
            carros: updated.carros,
            nome: updated.nome
        });
    });

    test('Deve remover um carro se um carro nao tiver na lista de carros enviados', async () => {
        const { sut, deleteCarroRepositoryStub } = makeSut();
        const clienteWithOutCar: UpdateClienteParams = { ...mockFakeUpdateClienteParams(), carros: [] };
        const deleteSpy = jest.spyOn(deleteCarroRepositoryStub, 'delete');
        const cliente = await sut.update(clienteWithOutCar);
        const updated: ClienteModel = mockFakeClienteModel();
        // todo quando atualizar endereco remover {...}
        expect(cliente.content).toEqual({
            id: updated.id,
            telefone: updated.telefone,
            cpf: updated.cpf,
            carros: clienteWithOutCar.carros,
            nome: updated.nome
        });
        expect(deleteSpy).toHaveBeenCalledWith(mockFakeDbCarroModelList()[0].id_carro);
        expect(deleteSpy).toHaveBeenCalledWith(mockFakeDbCarroModelList()[1].id_carro);
    });

    test('Deve chamar UpdateCarroRepository com valores corretos', async () => {
        const { sut, loadCarroByClienteIdRepositoryStub } = makeSut();
        const updateSpy = jest.spyOn(loadCarroByClienteIdRepositoryStub, 'loadByClienteId');
        await sut.update(mockFakeUpdateClienteParams());
        expect(updateSpy).toHaveBeenCalledWith(mockFakeUpdateClienteParams().id);
    });
});

const makeUpdateClienteRepository = (): UpdateClienteRepository => {
    class UpdateClienteRepositoryStub implements UpdateClienteRepository {
        async update(): Promise<DbClienteModel> {
            return mockFakeDbClienteModel();
        }
    }
    return new UpdateClienteRepositoryStub();
};

const makeUpdateCarroRepositoryStub = (): UpdateCarroRepository => {
    class UpdateCarroRepositoryStub implements UpdateCarroRepository {
        update(model: UpdateCarroModel): Promise<DbCarroModel> {
            return Promise.resolve(mockFakeDbCarroModel());
        }
    }
    return new UpdateCarroRepositoryStub();
};

const makeSaveCarroRepositoryStub = (): SaveCarroRepository => {
    class SaveCarroRepositoryStub implements SaveCarroRepository {
        save(model: AddCarroModel, clienteId: number): Promise<DbCarroModel> {
            return Promise.resolve(mockFakeDbCarroModel());
        }
    }
    return new SaveCarroRepositoryStub();
};

const makeLoadCarroByClienteIdRepositoryStubStub = (): LoadCarroByClienteIdRepository => {
    class LoadCarroByClienteIdStub implements LoadCarroByClienteIdRepository {
        loadByClienteId(id: number): Promise<DbCarroModel[]> {
            return Promise.resolve(mockFakeDbCarroModelList());
        }
    }
    return new LoadCarroByClienteIdStub();
};

const makeDeleteCarroRepositoryStub = (): DeleteCarroRepository => {
    class DeleteCarroRepositoryStub implements DeleteCarroRepository {
        delete(id: number): Promise<void> {
            return Promise.resolve();
        }
    }
    return new DeleteCarroRepositoryStub();
};

interface SutTypes {
    sut: DbUpdateCliente;
    updateClienteRepositoryStub: UpdateClienteRepository;
    updateCarroRepositoryStub: UpdateCarroRepository;
    saveCarroRepositoryStub: SaveCarroRepository;
    loadCarroByClienteIdRepositoryStub: LoadCarroByClienteIdRepository;
    deleteCarroRepositoryStub: DeleteCarroRepository;
    redisCacheRepositoryStub: RedisCacheRepository;
}

const makeSut = (): SutTypes => {
    const updateClienteRepositoryStub = makeUpdateClienteRepository();
    const updateCarroRepositoryStub = makeUpdateCarroRepositoryStub();
    const saveCarroRepositoryStub = makeSaveCarroRepositoryStub();
    const loadCarroByClienteIdRepositoryStub = makeLoadCarroByClienteIdRepositoryStubStub();
    const deleteCarroRepositoryStub = makeDeleteCarroRepositoryStub();
    const redisCacheRepositoryStub = makeRedisCacheRepository();
    const sut = new DbUpdateCliente(
        updateClienteRepositoryStub,
        updateCarroRepositoryStub,
        saveCarroRepositoryStub,
        loadCarroByClienteIdRepositoryStub,
        deleteCarroRepositoryStub,
        redisCacheRepositoryStub
    );
    return {
        sut,
        updateClienteRepositoryStub,
        updateCarroRepositoryStub,
        saveCarroRepositoryStub,
        loadCarroByClienteIdRepositoryStub,
        deleteCarroRepositoryStub,
        redisCacheRepositoryStub
    };
};

const makeFakeNewAddCarroModel = (): AddCarroModel => ({
    ano: 2020,
    cor: 'any_cor',
    modelo: 'any_modelo',
    placa: 'any_placa',
    quilometragem: 0
});

const makeFakeNewDbCarroModel = (): DbCarroModel => ({
    ...makeFakeNewAddCarroModel(),
    id_carro: 2
});

const makeFakeNewCarroModel = (): CarroModel => ({
    ano: makeFakeNewDbCarroModel().ano,
    id: makeFakeNewDbCarroModel().id_carro,
    cor: makeFakeNewDbCarroModel().cor,
    modelo: makeFakeNewDbCarroModel().modelo,
    placa: makeFakeNewDbCarroModel().placa,
    quilometragem: makeFakeNewDbCarroModel().quilometragem
});
