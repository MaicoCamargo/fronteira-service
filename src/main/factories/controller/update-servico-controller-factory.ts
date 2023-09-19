import { UpdateServicoController } from '../../../presentation/controllers/servico/update-servico-controller';
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory';
import { makeDbUpdateServico } from '../usescase/servico/db-update-servico-factory';
import { Controller } from '../../../presentation/protocols';

export const makeUpdateServicoController = (): Controller => {
    return makeLogControllerDecorator(new UpdateServicoController(makeDbUpdateServico()));
};
