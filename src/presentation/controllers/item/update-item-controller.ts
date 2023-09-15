import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { UpdateItem } from '../../../domain/usecases/item/update-item';
import { badRequest } from '../../helpers/http';
import { MissingParamError } from '../../errors';

export class UpdateItemController implements Controller {
    constructor(private readonly updateItem: UpdateItem) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const id = httpRequest.params?.id;
        if (!id) return badRequest(new MissingParamError('query param id'));
        return await Promise.resolve(undefined);
    }
}
