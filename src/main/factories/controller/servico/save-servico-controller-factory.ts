import { SaveServicoController } from '../../../../presentation/controllers/servico/save-servico-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbAddServico } from '../../usescase/servico/db-save-servico-factory';

export const makeSaveServicoController = (): Controller => {
    return makeLogControllerDecorator(new SaveServicoController(makeDbAddServico()));
};
