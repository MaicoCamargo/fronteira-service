import { Wrapper } from '@/main/protocols/http-wrapper';

export interface LoadAuthDetailIntegrationModel {
    username: string;
    email: string;
    displayName: string;
    fullName: string;
    roles: string[];
    // @fixme verificar se expires não deve ser string
    expires: number;
}

export interface LoadAuthDetailIntegration {
    load: (token: string) => Promise<Wrapper<LoadAuthDetailIntegrationModel>>;
}
