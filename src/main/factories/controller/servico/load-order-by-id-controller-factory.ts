import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbLoadOrderById } from '@/main/factories/usescase/servico/db-load-order-by-id-factory';
import { LoadOrderByIdController } from '@/presentation/controllers/servico/load-order-by-id-controller';

export const makeLoadOrderByIdController = (): Controller => {
    return makeLogControllerDecorator(new LoadOrderByIdController(makeDbLoadOrderById()));
};
