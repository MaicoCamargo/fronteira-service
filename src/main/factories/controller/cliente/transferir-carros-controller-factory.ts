import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { TransferirCarrosController } from '@/presentation/controllers/cliente/transferir-carros-controller';
import { makeDbTransferirCarrosFactory } from '@/main/factories/usescase/carro/db-transferir-carros-factory';

export const makeTransferirCarrosController = (): Controller => {
    return makeLogControllerDecorator(new TransferirCarrosController(makeDbTransferirCarrosFactory()));
};
