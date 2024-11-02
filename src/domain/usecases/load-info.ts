import { InfoModel } from '@/domain/models/info-model';

export interface LoadInfo {
    load: () => Promise<InfoModel>;
}
