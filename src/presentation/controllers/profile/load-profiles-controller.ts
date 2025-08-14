import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { ok, serverError } from '@/presentation/helpers/http';
import { LoadProfiles } from '@/domain/usecases/profile/load-profiles';

export class LoadProfilesController implements Controller {
    constructor(private readonly loadProfiles: LoadProfiles) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const profiles = await this.loadProfiles.load(httpRequest.query);
            return ok(profiles);
        } catch (err) {
            return serverError(err);
        }
    }
}
