import { Controller } from '@/presentation/protocols';
import { LoadMechanicsController } from '@/presentation/controllers/mechanic/load-mechanics-controller';
import { makeDbLoadMechanics } from '@/main/factories/usescase/mechanic/db-load-mechanics-factory';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';

export const makeLoadMechanicsController = (): Controller => {
    const loadMechanicsController = new LoadMechanicsController(makeDbLoadMechanics());
    return makeLogControllerDecorator(loadMechanicsController);
};
