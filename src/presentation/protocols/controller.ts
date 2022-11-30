import { HttpRequest } from './http/http-request';
import { HttpResponse } from './http/http-response';

export interface Controller {
    handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
