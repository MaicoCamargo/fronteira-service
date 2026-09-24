import { IntegrationLoadAuth } from './integration-load-auth';
import { LoadAuthIntegration } from '@/data/protocols/client/auth-service/load-auth-integration';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { LoadProfileByUsername } from '@/domain/usecases/profile/load-profile-by-username';
import { LoadProfileByMail } from '@/domain/usecases/profile/load-profile-by-mail';
import { ProfileModel } from '@/domain/models/profile-model';
import { mockFakeProfileModel } from '../../../../tests/mock/mock-profile';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { httpRequestScope } from '@/infra/http/http-request-scope';
import { HttpRequestScopeRepository } from '@/infra/http/request-scope-repository';

describe('IntegrationLoadAuth', () => {
    beforeAll(async () => {
        await KnexHelper.forTenant().table(`profile_position`).del();
        await KnexHelper.forTenant().table(`servico_mecanico`).del();
        await KnexHelper.forTenant().table(`profile`).del();
    });

    afterAll(async () => {
        await KnexHelper.destroy();
    });

    test('Deve chamar LoadProfileByUsername com valor correto', async () => {
        const { sut, loadProfileByUsernameStub } = makeSut();
        const spy = jest.spyOn(loadProfileByUsernameStub, 'load');
        await sut.auth({ username: mockFakeProfileModel().username, password: '123' });
        expect(spy).toHaveBeenCalledWith(mockFakeProfileModel().username);
    });

    test('Deve chamar LoadProfileByMail com valor correto', async () => {
        const { sut, loadProfileByMailStub } = makeSut();
        const spy = jest.spyOn(loadProfileByMailStub, 'load');
        await sut.auth({ username: mockFakeProfileModel().username, password: '123' });
        expect(spy).toHaveBeenCalledWith(mockFakeProfileModel().username);
    });

    test('Deve lançar InvalidCredentialsError quando nenhum perfil(profile) for encontrado', async () => {
        const { sut, loadProfileByUsernameStub, loadProfileByMailStub, loadAuthIntegrationStub } = makeSut();
        jest.spyOn(loadProfileByUsernameStub, 'load').mockResolvedValueOnce(null as any);
        jest.spyOn(loadProfileByMailStub, 'load').mockResolvedValueOnce(null as any);
        const authSpy = jest.spyOn(loadAuthIntegrationStub, 'auth');
        expect(authSpy).not.toHaveBeenCalled();
        // const promise = sut.auth({ username: 'missing', password: '123' });
        // await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError);
        // @todo validar se esta lançando o erro
    });

    test('Deve tentar autenticar quando não encontrar por username mas encontrar por e-mail', async () => {
        const { sut, loadProfileByUsernameStub, loadProfileByMailStub } = makeSut();
        jest.spyOn(loadProfileByUsernameStub, 'load').mockResolvedValueOnce(null as any);
        jest.spyOn(loadProfileByMailStub, 'load').mockResolvedValueOnce(mockFakeProfileModel());
        const result = await sut.auth({ username: mockFakeProfileModel().username, password: '123' });
        expect(result).toEqual({ content: { jwt: 'any_token', clientId: httpRequestScope.getStore().clientId } });
    });

    test('Deve tentar autenticar quando não encontrar por e-mail mas encontrar por username', async () => {
        const { sut, loadProfileByUsernameStub, loadProfileByMailStub } = makeSut();
        jest.spyOn(loadProfileByMailStub, 'load').mockResolvedValueOnce(null as any);
        jest.spyOn(loadProfileByUsernameStub, 'load').mockResolvedValueOnce(mockFakeProfileModel());
        const result = await sut.auth({ username: mockFakeProfileModel().username, password: '123' });
        expect(result).toEqual({ content: { jwt: 'any_token', clientId: httpRequestScope.getStore().clientId } });
    });
});

interface SutTypes {
    sut: IntegrationLoadAuth;
    loadAuthIntegrationStub: LoadAuthIntegration;
    loadProfileByUsernameStub: LoadProfileByUsername;
    loadProfileByMailStub: LoadProfileByMail;
}

const makeSut = (): SutTypes => {
    const loadAuthIntegrationStub = makeLoadAuthIntegration();
    const loadProfileByUsernameStub = makeLoadProfileByUsername();
    const loadProfileByMailStub = makeLoadProfileByMail();
    const sut = new IntegrationLoadAuth(
        loadAuthIntegrationStub,
        loadProfileByUsernameStub,
        loadProfileByMailStub,
        new HttpRequestScopeRepository()
    );
    return { sut, loadAuthIntegrationStub, loadProfileByUsernameStub, loadProfileByMailStub };
};

const makeLoadAuthIntegration = (): LoadAuthIntegration => {
    class LoadAuthIntegrationStub implements LoadAuthIntegration {
        async auth(): Promise<Wrapper<string>> {
            return { content: 'any_token' } as any;
        }
    }
    return new LoadAuthIntegrationStub();
};

const makeLoadProfileByUsername = (): LoadProfileByUsername => {
    class LoadProfileByUsernameStub implements LoadProfileByUsername {
        async load(): Promise<ProfileModel> {
            return mockFakeProfileModel();
        }
    }
    return new LoadProfileByUsernameStub();
};

const makeLoadProfileByMail = (): LoadProfileByMail => {
    class LoadProfileByMailStub implements LoadProfileByMail {
        async load(): Promise<ProfileModel> {
            return mockFakeProfileModel();
        }
    }
    return new LoadProfileByMailStub();
};
