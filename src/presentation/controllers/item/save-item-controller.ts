import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { AddItem } from '../../../domain/usecases/item/add-item';

export class SaveItemController implements Controller {
    constructor(private readonly addItem: AddItem) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        await this.addItem.add(httpRequest.body);
        return await Promise.resolve(undefined);
    }
}
