import { AddEnderecoController } from './add-endereco-controller';
import { AddEndereco, AddEnderecoParams } from '../../../domain/usecases/endereco/add-endereco';
import { EnderecoModel } from '../../../domain/models/endereco-model';
import { HttpRequest } from '../../protocols';
import { badRequest, created, serverError } from '../../helpers/http';

const makeFakeHttpRequest = (): HttpRequest => ({
    body: makeFakeAddEnderecoParams()
});
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
const makeAddEndereco = (): AddEndereco => {
    class AddEnderecoStub implements AddEndereco {
        add(params: AddEnderecoParams): Promise<EnderecoModel> {
            return Promise.resolve(makeFakeEndereco());
        }
    }
    return new AddEnderecoStub();
};

interface SutTypes {
    sut: AddEnderecoController;
    addEnderecoStub: AddEndereco;
}

const makeSut = (): SutTypes => {
    const addEnderecoStub = makeAddEndereco();
    const sut = new AddEnderecoController(addEnderecoStub);
    return { sut, addEnderecoStub };
};
describe('AddEnderecoController', () => {
    test('Deve Chamar AddEndereco com valores corretos', async () => {
        const { sut, addEnderecoStub } = makeSut();
        const spy = jest.spyOn(addEnderecoStub, 'add');
        await sut.handle(makeFakeHttpRequest());
        expect(spy).toHaveBeenCalledWith(makeFakeHttpRequest().body);
    });

    test('Deve retornar 500 se AddEndereço falhar', async () => {
        const { sut, addEnderecoStub } = makeSut();
        jest.spyOn(addEnderecoStub, 'add').mockReturnValueOnce(Promise.reject(new Error()));
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Deve retornar 201 em caso de sucesso', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(created(makeFakeEndereco()));
    });
});
