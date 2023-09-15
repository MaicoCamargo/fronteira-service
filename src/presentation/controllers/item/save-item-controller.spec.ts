import { SaveItemController } from './save-item-controller';
import { ItemModel } from '../../../domain/models/item-model';
import { HttpRequest } from '../../protocols';
import { AddItem, AddItemParams } from '../../../domain/usecases/item/add-item';
import { mockFakeItemModel } from '../../../../tests/mock/mock-item';
import { throwError } from '../../../../tests/helper/test-helper';
import { serverError } from '../../helpers/http';

describe('SaveItemController', () => {
    test('Deve chamar AddItem com valores corretos', async () => {
        const { sut, addItemStub } = makeSut();
        const saveSpy = jest.spyOn(addItemStub, 'add');
        const body: AddItemParams = mockFakeItemModel();
        await sut.handle(makeFakeHttpRequest({ body }));
        expect(saveSpy).toHaveBeenCalled();
    });

    test('Deve retornar 201 em caso de sucesso', async () => {
        const { sut } = makeSut();
        const body: AddItemParams = mockFakeItemModel();
        const httpResponse = await sut.handle(makeFakeHttpRequest({ body }));
        expect(httpResponse.statusCode).toBe(201);
        expect(httpResponse.body).toEqual(mockFakeItemModel());
    });

    test('Deve retornar 500 se AddItem falhar', async () => {
        const { sut, addItemStub } = makeSut();
        jest.spyOn(addItemStub, 'add').mockImplementationOnce(throwError);
        const body: AddItemParams = mockFakeItemModel();
        const httpResponse = await sut.handle(makeFakeHttpRequest({ body }));
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});

interface SutTypes {
    sut: SaveItemController;
    addItemStub: AddItem;
}

const makeSut = (): SutTypes => {
    const addItemStub = makeAddItem();
    const sut = new SaveItemController(addItemStub);
    return {
        sut,
        addItemStub
    };
};

const makeAddItem = (): AddItem => {
    class AddItemStub implements AddItem {
        async add(item: AddItemParams): Promise<ItemModel> {
            return Promise.resolve(mockFakeItemModel());
        }
    }
    return new AddItemStub();
};

const makeFakeHttpRequest = (httpRequest?: HttpRequest): HttpRequest => httpRequest;
