import { HttpResponse, HttpRequest, Controller, EmailValidator, AddAccount } from './signup-protocols';
import { MissingParamError, InvalidParamError } from '../../errors';
import { badRequest, ok, serverError } from '../../helpers/http';

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator;
    private readonly addAccount: AddAccount;

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator;
        this.addAccount = addAccount;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['name', 'email'];
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field));
                }
            }
            const isValid = this.emailValidator.isValid(httpRequest.body.email);
            if (!isValid) return badRequest(new InvalidParamError('email'));

            const { body } = httpRequest;
            const account = await this.addAccount.add({
                name: body.name,
                email: body.email,
                password: body.password
            });
            return ok(account);
        } catch (err) {
            return serverError(err);
        }
    }
}
