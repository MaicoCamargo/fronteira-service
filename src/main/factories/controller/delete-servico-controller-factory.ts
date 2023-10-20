import { Controller } from '../../../presentation/protocols';
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory';
import { DeleteServicoController } from '../../../presentation/controllers/servico/delete-servico-controller';
import { makeDbDelServico } from '../usescase/servico/db-del-servico-factory';

export const makeDeleteServicoController = (): Controller => {
    return makeLogControllerDecorator(new DeleteServicoController(makeDbDelServico()));
};
