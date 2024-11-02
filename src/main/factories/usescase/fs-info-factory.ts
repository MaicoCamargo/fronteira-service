import { FsInfoRepository } from '@/infra/fs-info-repository';
import { FsLoadInfo } from '@/data/usecases/fs-load-info';

export const makeFsHealthRepository = (): FsLoadInfo => {
    const fsInfoRepository = new FsInfoRepository();
    return new FsLoadInfo(fsInfoRepository);
};
