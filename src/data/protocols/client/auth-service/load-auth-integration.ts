import { Wrapper } from '@/main/protocols/http-wrapper';

export interface CredencialModel {
    username: string;
    password: string;
}

export interface LoadAuthIntegration {
    auth: (credencial: CredencialModel) => Promise<Wrapper<string>>;
}
