import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { DeleteItem } from '../../../domain/usecases/item/delete-item';
import { badRequest, noContent } from '../../helpers/http';
import { MissingParamError } from '../../errors';

export class DeleteItemController implements Controller {
    constructor(private readonly deleteItem: DeleteItem) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const id = httpRequest.params?.id;
        if (!id) return badRequest(new MissingParamError('query param id'));
        await this.deleteItem.delete(id);
        return noContent();
    }
}
