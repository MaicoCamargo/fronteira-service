import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { AddEnderecoController } from '../../../../presentation/controllers/endereco/add-endereco-controller';
import { makeDbAddEndereco } from '../../usescase/db-add-endereco-factory';

export const makeAddEnderecoController = (): Controller => {
    return makeLogControllerDecorator(new AddEnderecoController(makeDbAddEndereco()));
};
