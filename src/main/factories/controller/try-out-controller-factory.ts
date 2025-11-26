import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { TryOutController } from '@/presentation/controllers/try-out-controller';
import { makeDbSaveTryOut } from '@/main/factories/usescase/db-save-try-out-factory';

export const makeTryOutController = (): Controller => {
    return makeLogControllerDecorator(new TryOutController(makeDbSaveTryOut()));
};
