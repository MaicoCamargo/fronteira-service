import { DbAddEndereco } from './db-add-endereco';
import { AddEnderecoRepository } from '../../protocols/db/cliente/add-endereco-repository';
import { AddEnderecoParams } from '../../../domain/usecases/cliente/add-endereco';
import { EnderecoModel } from '../../../domain/models/endereco-model';

const makeFakeAddEnderecoParams = (): AddEnderecoParams => ({
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero',
    cep: 'any_cep',
    cidade: 'any_cidade'
});

const makeFakeEndereco = (): EnderecoModel => ({
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero',
    cep: 'any_cep',
    cidade: 'any_cidade',
    id: 1
});

const makeAddEnderecoRepository = (): AddEnderecoRepository => {
    class AddEnderecoRepositoryStub implements AddEnderecoRepository {
        add(endereco: AddEnderecoParams): Promise<EnderecoModel> {
            return Promise.resolve(makeFakeEndereco());
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

describe('DBAddEndereco UseCase', () => {
    test('Deve chamar o AddEnderecoRepository com valores corretos', async () => {
        const { sut, addEnderecoRepositoryStub } = makeSut();
        const spy = jest.spyOn(addEnderecoRepositoryStub, 'add');
        await sut.add(makeFakeAddEnderecoParams());
        expect(spy).toHaveBeenCalledWith(makeFakeAddEnderecoParams());
    });
});
