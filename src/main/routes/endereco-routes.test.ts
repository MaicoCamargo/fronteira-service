import request from 'supertest';
import app from '../../../src/main/config/app';
import { HttpRequest } from '../../presentation/protocols';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { AuthHelper } from '../../../tests/helper/auth-helper';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';

const makeFakeRequest = (): HttpRequest => ({
    body: {
        rua: 'ernesto becker',
        complemento: 'apt 203',
        cidade: 'SM',
        cep: '97010140',
        numero: '230'
    }
});
describe('POST /endereco', () => {
    const AUTHORIZATION_HEADER = 'authorization';
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
        await KnexHelper.forTenant().table('cliente_carro').del();
        await KnexHelper.forTenant().table('cliente').del();
        await KnexHelper.forTenant().table('endereco').del();
        await AuthHelper.init();
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
        await KnexHelper.destroy();
        await AuthHelper.destroy();
    });

    test('Deve retornar 201 em caso de sucesso', async () => {
        await request(app)
            .post('/service/endereco')
            .set(AUTHORIZATION_HEADER, await AuthHelper.authenticate())
            .send(makeFakeRequest().body)
            .expect(201);
    });
});
