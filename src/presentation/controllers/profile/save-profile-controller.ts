import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { ok, serverError } from '@/presentation/helpers/http';
import { AddProfile } from '@/domain/usecases/profile/add-profile';

export class SaveProfileController implements Controller {
    constructor(private readonly addProfile: AddProfile) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const profile = await this.addProfile.add(httpRequest.body);
            return ok(profile);
        } catch (err) {
            return serverError(err);
        }
    }
}
