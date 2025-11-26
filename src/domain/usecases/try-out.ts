import { Wrapper } from '@/main/protocols/http-wrapper';
import { AuthModel } from '@/domain/models/auth-model';

export interface TryOutParams {
    name: string;
    contact: string;
}

export interface TryOut {
    try: (tryOutParams: TryOutParams) => Promise<Wrapper<AuthModel>>;
}
