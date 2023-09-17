import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { AddItem } from '../../../domain/usecases/item/add-item';
import { created, serverError } from '../../helpers/http';

export class SaveItemController implements Controller {
    constructor(private readonly addItem: AddItem) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const itemModel = await this.addItem.add(httpRequest.body);
            return created(itemModel);
        } catch (err) {
            return serverError(err);
        }
    }
}
