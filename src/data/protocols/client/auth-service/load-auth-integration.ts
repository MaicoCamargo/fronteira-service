import { Wrapper } from '@/main/protocols/http-wrapper';

export interface CredencialModel {
    login: string;
    password: string;
}

export interface LoadAuthIntegration {
    auth: (credencial: CredencialModel) => Promise<Wrapper<string>>;
}
