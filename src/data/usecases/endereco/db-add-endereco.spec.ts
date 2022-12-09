import { DbAddEndereco } from './db-add-endereco';
import { AddEnderecoRepository, DbAddEnderecoParams } from '../../protocols/db/endereco/add-endereco-repository';
import { AddEnderecoParams } from '../../../domain/usecases/endereco/add-endereco';
import { EnderecoModel } from '../../../domain/models/endereco-model';
import { DbEnderecoModel } from '../../models/db-endereco-model';

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

const makeAddEnderecoRepository = (): AddEnderecoRepository => {
    class AddEnderecoRepositoryStub implements AddEnderecoRepository {
        save(endereco: DbAddEnderecoParams): Promise<DbEnderecoModel> {
            return Promise.resolve(makeFakeDbEnderecoModel());
        }
    }
    return new AddEnderecoRepositoryStub();
};
interface SutTypes {
    sut: DbAddEndereco;
    addEnderecoRepositoryStub: AddEnderecoRepository;
}
const makeSut = (): SutTypes => {
    const addEnderecoRepositoryStub = makeAddEnderecoRepository();
    const sut = new DbAddEndereco(addEnderecoRepositoryStub);
    return { sut, addEnderecoRepositoryStub };
};

// never -> usar quando uma funcão retornar throws
export const throwError = (): never => {
    throw new Error();
};

describe('DBAddEndereco UseCase', () => {
    test('Deve chamar o AddEnderecoRepository com valores corretos', async () => {
        const { sut, addEnderecoRepositoryStub } = makeSut();
        const spy = jest.spyOn(addEnderecoRepositoryStub, 'save');
        await sut.add(makeFakeAddEnderecoParams());
        expect(spy).toHaveBeenCalledWith(makeFakeAddEnderecoParams());
    });

    test('Deve retornar o endereco em caso de sucesso', async () => {
        const { sut } = makeSut();
        const endereco = await sut.add(makeFakeAddEnderecoParams());
        expect(endereco).toEqual(makeFakeEnderecoModel());
    });

    test('Deve jogar a excessão se o AddEnderecoRepository retornar uma excessão', async () => {
        const { sut, addEnderecoRepositoryStub } = makeSut();
        jest.spyOn(addEnderecoRepositoryStub, 'save').mockImplementationOnce(throwError);
        const promise = sut.add(makeFakeAddEnderecoParams());
        await expect(promise).rejects.toThrow();
    });
});
