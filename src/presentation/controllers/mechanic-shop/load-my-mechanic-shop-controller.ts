import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { LoadMechanicShopByOwnerId } from '@/domain/usecases/mechanic-shop/load-mechanic-shop-by-owner-id';
import { noContent, ok, serverError, unauthorized } from '@/presentation/helpers/http';

export class LoadMyMechanicShopController implements Controller {
    constructor(private readonly loadByOwnerId: LoadMechanicShopByOwnerId) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const auth = httpRequest.headers?.authorization;
            if (!auth) return unauthorized('unauthorized');

            const shop = await this.loadByOwnerId.load();
            if (!shop) return noContent();
            return ok(shop);
        } catch (error) {
            return serverError(error);
        }
    }
}
