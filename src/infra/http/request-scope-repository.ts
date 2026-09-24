import { RequestScopeData, RequestScopeRepository } from '@/data/protocols/scope/request-scope-repository';
import { httpRequestScope } from './http-request-scope';

export class HttpRequestScopeRepository implements RequestScopeRepository {
    getStore(): RequestScopeData | undefined {
        return httpRequestScope.getStore();
    }

    enterWith(data: RequestScopeData): void {
        httpRequestScope.enterWith(data);
    }
}
