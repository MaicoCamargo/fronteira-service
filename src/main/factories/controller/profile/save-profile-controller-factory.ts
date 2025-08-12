import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { SaveProfileController } from '@/presentation/controllers/profile/save-profile-controller';
import { makeDbAddProfile } from '@/main/factories/usescase/profile/db-add-profile-factory';

export const makeSaveProfileController = (): Controller => {
    return makeLogControllerDecorator(new SaveProfileController(makeDbAddProfile()));
};
