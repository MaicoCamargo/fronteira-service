import { HttpRequest } from '@/presentation/protocols/http/http-request';
import { HttpResponse } from '@/presentation/protocols/http/http-response';

export interface Middleware {
    handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
