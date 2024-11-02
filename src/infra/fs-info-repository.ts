import { InfoRepository } from '@/data/protocols/info-repository';
import { FsInfoModel } from '@/data/models/fs-info-model';
// @ts-expect-error
import { version } from '../../package.json';

export class FsInfoRepository implements InfoRepository {
    async load(): Promise<FsInfoModel> {
        return {
            service: 'fronteira-service',
            description: 'API backend mecânica fronteira',
            version,
            timestamp: new Date()
        };
    }
}
