import { httpRequestScope } from '@/infra/http/http-request-scope';

export const mockSpyHttpRequestScopeAuthorization = (): void => {
    jest.spyOn(httpRequestScope, 'getStore').mockReturnValue({ authorization: 'any_token' });
};
