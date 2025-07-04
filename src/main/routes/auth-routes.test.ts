import { AuthHelper } from '../../../tests/helper/auth-helper';
import request from 'supertest';
import app from '@/main/config/app';
import { HttpRequest } from '@/presentation/protocols';

describe('/auth', () => {
    const AUTHORIZATION_HEADER = 'authorization';
    beforeAll(async () => {
        await AuthHelper.init();
    });

    afterAll(async () => {
        await AuthHelper.destroy();
    });

    describe('GET', () => {
        test('Deve retornar 200 em caso de sucesso', async () => {
            await request(app)
                .get('/service/auth')
                .set(AUTHORIZATION_HEADER, await AuthHelper.authenticate())
                .expect(200);
        });
    });

    describe('POST', () => {
        const makeFakeRequest = (): HttpRequest => ({
            body: {
                username: 'any_username',
                password: 'any_password'
            }
        });

        test('Deve retornar 200 em caso de sucesso', async () => {
            await request(app).get('/service/auth').send(makeFakeRequest().body).expect(200);
        });
    });
});
