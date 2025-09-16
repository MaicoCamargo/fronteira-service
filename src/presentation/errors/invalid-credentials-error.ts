export class InvalidCredentialsError extends Error {
    constructor() {
        super('Credenciais Inválidas');
        this.name = 'InvalidCredentialsError';
    }
}
