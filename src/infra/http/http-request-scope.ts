import { AsyncLocalStorage } from 'async_hooks';
import { RequestScopeData } from '@/data/protocols/scope/request-scope-repository';

export { RequestScopeData };

export const httpRequestScope = new AsyncLocalStorage<RequestScopeData>();
