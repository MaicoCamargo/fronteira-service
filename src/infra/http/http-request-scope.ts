import { AsyncLocalStorage } from 'async_hooks';

export interface RequestScopeData {
    authorization?: string;
    clientId?: string;
}

export const httpRequestScope = new AsyncLocalStorage<RequestScopeData>();
