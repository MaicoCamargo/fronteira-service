import { Wrapper } from '@/main/protocols/http-wrapper';
import { AuthModel } from '@/domain/models/auth-model';

export interface CredencialParams {
    username: string;
    password: string;
}

export interface LoadAuth {
    auth: (credencial: CredencialParams) => Promise<Wrapper<AuthModel>>;
}
