import { DbAddEndereco } from './db-add-endereco';
import { SaveEnderecoRepository, DbAddEnderecoModel } from '../../protocols/db/endereco/save-endereco-repository';
import { AddEnderecoParams } from '../../../domain/usecases/endereco/add-endereco';
import { EnderecoModel } from '../../../domain/models/endereco-model';
import { DbEnderecoModel } from '../../models/db-endereco-model';
import { throwError } from '../../../../tests/helper/test-helper';

const makeFakeEnderecoModel = (): EnderecoModel => ({
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero',
    cep: 'any_cep',
    cidade: 'any_cidade',
    id: 1
});
const makeFakeAddEnderecoParams = (): AddEnderecoParams => ({
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero',
    cep: 'any_cep',
    cidade: 'any_cidade'
});

const makeFakeDbEnderecoModel = (): DbEnderecoModel => ({
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero',
    cep: 'any_cep',
    cidade: 'any_cidade',
    id_endereco: 1
});

const makeSaveEnderecoRepository = (): SaveEnderecoRepository => {
    class SaveEnderecoRepositoryStub implements SaveEnderecoRepository {
        save(endereco: DbAddEnderecoModel): Promise<DbEnderecoModel> {
            return Promise.resolve(makeFakeDbEnderecoModel());
        }
    }
    return new SaveEnderecoRepositoryStub();
};
interface SutTypes {
    sut: DbAddEndereco;
    saveEnderecoRepositoryStubStub: SaveEnderecoRepository;
}
const makeSut = (): SutTypes => {
    const saveEnderecoRepositoryStubStub = makeSaveEnderecoRepository();
    const sut = new DbAddEndereco(saveEnderecoRepositoryStubStub);
    return { sut, saveEnderecoRepositoryStubStub };
};

describe('DBAddEndereco UseCase', () => {
    test('Deve chamar o SaveEnderecoRepository com valores corretos', async () => {
        const { sut, saveEnderecoRepositoryStubStub } = makeSut();
        const spy = jest.spyOn(saveEnderecoRepositoryStubStub, 'save');
        await sut.add(makeFakeAddEnderecoParams());
        expect(spy).toHaveBeenCalledWith(makeFakeAddEnderecoParams());
    });

    test('Deve retornar o endereco em caso de sucesso', async () => {
        const { sut } = makeSut();
        const endereco = await sut.add(makeFakeAddEnderecoParams());
        expect(endereco).toEqual(makeFakeEnderecoModel());
    });

    test('Deve jogar a excessão se o AddEnderecoRepository retornar uma excessão', async () => {
        const { sut, saveEnderecoRepositoryStubStub } = makeSut();
        jest.spyOn(saveEnderecoRepositoryStubStub, 'save').mockImplementationOnce(throwError);
        const promise = sut.add(makeFakeAddEnderecoParams());
        await expect(promise).rejects.toThrow();
    });
});
