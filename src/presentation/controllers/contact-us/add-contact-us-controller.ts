import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { AddContactUs } from '@/domain/usecases/contact-us/add-contact-us';
import { noContent, serverError } from '../../helpers/http';

export class AddContactUsController implements Controller {
    constructor(private readonly addContactUs: AddContactUs) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            await this.addContactUs.add(httpRequest.body);
            return noContent();
        } catch (err) {
            return serverError(err);
        }
    }
}
