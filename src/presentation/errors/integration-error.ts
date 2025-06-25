import { HttpStatusCode } from 'axios';

export class IntegrationError extends Error {
    statusCode: number;
    message: any;
    constructor(statusCode: number, stack: string, response: any) {
        super('Integration Error');
        this.name = 'Integration Error';
        this.stack = stack;
        this.statusCode = this.mapper(statusCode, response).status;
        this.message = this.mapper(statusCode, response).message;
    }

    private mapper(statusCode: number, response: any): { status: number; message: any } {
        if (HttpStatusCode.Unauthorized === statusCode) {
            return { message: 'Credenciais Inválidas', status: HttpStatusCode.Unauthorized };
        }
        if (HttpStatusCode.Forbidden === statusCode) {
            return { message: 'Acesso Negado', status: HttpStatusCode.Forbidden };
        }
        if (HttpStatusCode.BadRequest === statusCode) {
            return { message: response.content, status: HttpStatusCode.BadRequest };
        }
        if (HttpStatusCode.InternalServerError === statusCode) {
            return { message: 'Bad Gateway', status: HttpStatusCode.BadGateway };
        }
        if (HttpStatusCode.NotFound === statusCode) {
            return { message: 'Recurso não encontrado', status: HttpStatusCode.NotFound };
        }
    }
}
