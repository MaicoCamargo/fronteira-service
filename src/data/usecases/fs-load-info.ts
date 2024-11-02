import { LoadInfo } from '@/domain/usecases/load-info';
import { FsInfoModel } from '@/data/models/fs-info-model';
import { InfoRepository } from '@/data/protocols/info-repository';

export class FsLoadInfo implements LoadInfo {
    constructor(private readonly infoRepository: InfoRepository) {}

    async load(): Promise<FsInfoModel> {
        return await this.infoRepository.load();
    }
}
