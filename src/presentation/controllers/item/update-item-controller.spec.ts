import { UpdateItem } from '../../../domain/usecases/item/update-item';
import { UpdateItemController } from './update-item-controller';
import { ItemModel } from '../../../domain/models/item-model';
import { mockFakeUpdateItemModel } from '../../../../tests/mock/mock-item';
import { badRequest, ok } from '../../helpers/http';
import { MissingParamError } from '../../errors';

describe('UpdateItemController', () => {
    test('Deve retornar 400 se id nao for enviado', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: mockFakeUpdateItemModel()
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest(new MissingParamError('query param id')));
    });

    test('Deve retornar 200 em caso de sucesso', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            params: {
                id: mockFakeUpdateItemModel().id
            },
            body: mockFakeUpdateItemModel()
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(ok(mockFakeUpdateItemModel()));
    });

    test('Deve chamar UpdateItem com os valores corretos', async () => {
        const { sut, updateItemStub } = makeSut();
        const updateSpy = jest.spyOn(updateItemStub, 'update');
        const httpRequest = {
            params: {
                id: mockFakeUpdateItemModel().id
            },
            body: mockFakeUpdateItemModel()
        };
        await sut.handle(httpRequest);
        expect(updateSpy).toHaveBeenCalledWith(httpRequest.body);
    });
});

interface SutTypes {
    sut: UpdateItemController;
    updateItemStub: UpdateItem;
}

const makeSut = (): SutTypes => {
    const updateItemStub = makeUpdateItem();
    const sut = new UpdateItemController(updateItemStub);
    return {
        sut,
        updateItemStub
    };
};

const makeUpdateItem = (): UpdateItem => {
    class UpdateItemStub implements UpdateItem {
        update(item: ItemModel): Promise<ItemModel> {
            return Promise.resolve(mockFakeUpdateItemModel());
        }
    }
    return new UpdateItemStub();
};
