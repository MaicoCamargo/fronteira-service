import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { LoadProfilesController } from '@/presentation/controllers/profile/load-profiles-controller';
import { makeDbLoadProfiles } from '@/main/factories/usescase/profile/db-load-profiles-factory';

export const makeLoadProfilesController = (): Controller => {
    return makeLogControllerDecorator(new LoadProfilesController(makeDbLoadProfiles()));
};
