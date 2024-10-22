import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { TransferirCarros, TransferirCarrosParams } from '@/domain/usecases/carro/transferir-carros';
import { badRequest, ok, serverError } from '@/presentation/helpers/http';
import { InvalidParamError } from '@/presentation/errors';

export class TransferirCarrosController implements Controller {
    constructor(private readonly transferirCarros: TransferirCarros) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const cliente = Number(httpRequest.params.id);
            const transfer = httpRequest.body as TransferirCarrosParams;
            if (cliente !== transfer.id) {
                return badRequest(new InvalidParamError('id'));
            }
            const allCars = await this.transferirCarros.transfer(transfer);
            return ok(allCars);
        } catch (err) {
            return serverError(err);
        }
    }
}
