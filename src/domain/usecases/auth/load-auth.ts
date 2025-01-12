import { Wrapper } from '@/main/protocols/http-wrapper';

export interface CredencialParams {
    username: string;
    password: string;
}

export interface LoadAuth {
    auth: (credencial: CredencialParams) => Promise<Wrapper<string>>;
}
