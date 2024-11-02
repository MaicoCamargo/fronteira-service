import { FsInfoModel } from '@/data/models/fs-info-model';

export interface InfoRepository {
    load: () => Promise<FsInfoModel>;
}
