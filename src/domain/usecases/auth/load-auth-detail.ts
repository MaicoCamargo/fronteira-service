import { AuthDetailModel } from '@/domain/models/auth-detail-model';
import { Wrapper } from '@/main/protocols/http-wrapper';

export interface LoadAuthDetail {
    load: (token: string) => Promise<Wrapper<AuthDetailModel>>;
}
