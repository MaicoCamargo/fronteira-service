import request from 'supertest';
import app from '../config/app';
import { AuthHelper } from '../../../tests/helper/auth-helper';
import { HttpRequest } from '@/presentation/protocols';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';

describe('/profiles', () => {
    const AUTHORIZATION_HEADER = 'authorization';
    beforeAll(async () => {
        await knexInstance('profile').del();
        await AuthHelper.init();
    });

    afterAll(async () => {
        await AuthHelper.destroy();
        await knexInstance.destroy();
    });

    describe('POST', () => {
        test('Deve retornar 200 em caso de sucesso', async () => {
            await request(app)
                .post('/service/profiles')
                .set(AUTHORIZATION_HEADER, await AuthHelper.authenticate())
                .send(makeFakeRequest().body)
                .expect(200);
        });
    });
});

const makeFakeRequest = (): HttpRequest => ({
    body: {
        username: 'john-doe',
        firstName: 'John',
        lastName: 'Doe',
        mail: 'johndoe@example.com',
        nickname: 'Johnny',
        contact: ['+123456789', '+987654321']
    }
});
