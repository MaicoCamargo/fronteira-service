import request from 'supertest';
import app from '../config/app';
import { AuthHelper } from '../../../tests/helper/auth-helper';
import { HttpRequest } from '@/presentation/protocols';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { makeProfileCreate } from '../../../tests/mock/mock-db-profile';
import { DbProfileModel } from '@/data/models/db-profile-model';

describe('/profiles', () => {
    const AUTHORIZATION_HEADER = 'authorization';
    beforeAll(async () => {
        await KnexHelper.forTenant().table('profile_position').del();
        await KnexHelper.forTenant().table('position').del();
        await KnexHelper.forTenant().table('profile').del();
        await AuthHelper.init();
    });

    afterAll(async () => {
        await AuthHelper.destroy();
        await KnexHelper.destroy();
    });

    describe.skip('POST', () => {
        test('Deve retornar 200 em caso de sucesso', async () => {
            await request(app)
                .post('/service/profiles')
                .set(AUTHORIZATION_HEADER, await AuthHelper.authenticate())
                .send(makeFakeRequest().body)
                .expect(200);
        });
    });

    describe.skip('GET', () => {
        let profiles: DbProfileModel[];

        beforeAll(async () => {
            profiles = await makeProfileCreate();
        });
        test('Deve retornar 200 em caso de sucesso', async () => {
            const nickname = profiles[0].nickname;
            const response = await request(app)
                .get(`/service/profiles?nickname=${nickname}`)
                .set(AUTHORIZATION_HEADER, await AuthHelper.authenticate())
                .expect(200);

            const { content } = response.body;
            expect(content[0].nickname).toEqual(profiles[0].nickname);
            expect(content[0].mail).toEqual(profiles[0].mail);
            expect(content[0].username).toEqual(profiles[0].username);
            expect(content[0].firstName).toEqual(profiles[0].firstName);
            expect(content[0].lastName).toEqual(profiles[0].lastName);
            expect(content).toHaveLength(1);
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
