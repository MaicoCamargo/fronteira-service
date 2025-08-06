import { AuthServiceIntegration } from '@/infra/integration/auth-service-integration';
import { AxiosHelper } from '@/infra/integration/axios-helper';
import { ENV } from '@/main/config/env';
import { makeLoadAuthDetailIntegrationModel } from '../../../tests/mock/mock-load-auth-detail-integration';
import { throwError } from '../../../tests/helper/test-helper';

describe('Auth Service Integration', () => {
    const AUTHORIZATION_HEADER = { headers: { Authorization: 'valid_token' } };

    test('Deve chamar AxiosHelper com valores corretos', async () => {
        const { sut, axiosHelperStub } = makeSut();
        const payload = { content: makeLoadAuthDetailIntegrationModel() };
        jest.spyOn(axiosHelperStub, 'get').mockResolvedValueOnce(payload);
        await sut.load('valid_token');
        const spyOn = jest.spyOn(axiosHelperStub, 'get');
        expect(spyOn).toBeCalledWith('/auth', null, AUTHORIZATION_HEADER);
    });

    test('Deve retornar os detalhes do usuário autenticado em caso de sucesso', async () => {
        const { sut, axiosHelperStub } = makeSut();
        const payload = { content: makeLoadAuthDetailIntegrationModel() };
        jest.spyOn(axiosHelperStub, 'get').mockResolvedValueOnce(payload);
        const wrapper = await sut.load('valid_token');
        expect(wrapper.content).toBeDefined();
        expect(wrapper.content.displayName).toEqual(makeLoadAuthDetailIntegrationModel().displayName);
    });

    test('Deve retornar uma exceção caso token invalido for enviado', async () => {
        const { sut, axiosHelperStub } = makeSut();
        jest.spyOn(axiosHelperStub, 'get').mockImplementationOnce(throwError);
        const promise = sut.load('invalid_token');
        await expect(promise).rejects.toThrow();
    });

    describe('Header X-Client-ID', () => {
        let mockAxiosHelper: jest.Mocked<AxiosHelper>;
        let authService: AuthServiceIntegration;

        beforeEach(() => {
            // instância mockada do AxiosHelper
            mockAxiosHelper = {
                setHeader: jest.fn(),
                get: jest.fn(),
                post: jest.fn()
            } as unknown as jest.Mocked<AxiosHelper>;

            // Instanciamos a nossa classe de serviço, injetando o mock da dependência.
            // O construtor da AuthServiceIntegration será executado aqui.
            authService = new AuthServiceIntegration(mockAxiosHelper);
        });

        test('Deve setar o X-Client-ID header corretamente no construtor', () => {
            expect(mockAxiosHelper.setHeader).toHaveBeenCalledTimes(1);
            expect(mockAxiosHelper.setHeader).toHaveBeenCalledWith('X-Client-ID', ENV.AUTH_SERVICE_CLIENT_ID);
        });
    });
});

interface SutTypes {
    axiosHelperStub: AxiosHelper;
    sut: AuthServiceIntegration;
}

const makeAxiosHelperStub = (): AxiosHelper => {
    return AxiosHelper.getInstance(ENV.AUTH_SERVICE_HOST, 'Auth Service test');
};

const makeSut = (): SutTypes => {
    const axiosHelperStub = makeAxiosHelperStub();
    const sut = new AuthServiceIntegration(axiosHelperStub);
    return { axiosHelperStub, sut };
};
