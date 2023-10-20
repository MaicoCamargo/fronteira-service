import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { LoadServicosController } from '../../../../presentation/controllers/servico/load-servicos-controller';
import { makeDbLoadServicos } from '../../usescase/servico/db-load-servicos-factory';

export const makeLoadServicosController = (): Controller => {
    return makeLogControllerDecorator(new LoadServicosController(makeDbLoadServicos()));
};
