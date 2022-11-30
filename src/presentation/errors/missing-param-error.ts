export class MissingParamError extends Error {
    constructor(paramName: string) {
        super(`${paramName} é obrigatório`);
        this.name = 'MissingParamError';
    }
}
