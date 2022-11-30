export class InvalidParamError extends Error {
    constructor(paramName: string) {
        super(`${paramName} invalido`);
        this.name = 'InvalidParamError';
    }
}
