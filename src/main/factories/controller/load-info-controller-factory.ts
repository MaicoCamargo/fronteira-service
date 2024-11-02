import { Controller } from '@/presentation/protocols';
import { LoadInfoController } from '@/presentation/controllers/load-info-controller';
import { makeFsHealthRepository } from '@/main/factories/usescase/fs-info-factory';

export const makeLoadInfoController = (): Controller => {
    return new LoadInfoController(makeFsHealthRepository());
};
