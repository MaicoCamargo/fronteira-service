import { LoadAuthDetailIntegrationModel } from '@/data/protocols/client/auth-service/load-auth-detail-integration';

export const makeLoadAuthDetailIntegrationModel = (): LoadAuthDetailIntegrationModel => ({
    username: 'any_username',
    email: 'any_email@gmail.com',
    displayName: 'any_displayName',
    fullName: 'any_fullName',
    roles: ['any_role'],
    expires: 1747502517
});
