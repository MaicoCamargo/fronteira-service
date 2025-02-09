import request from 'supertest';
import app from '../../../src/main/config/app';
import { HttpRequest } from '../../presentation/protocols';
import { knexInstance } from '../../infra/db/pg/helpers/knex-helper';
import { AuthHelper } from '../../../tests/helper/auth-helper';

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
        await knexInstance('cliente_carro').del();
        await knexInstance('cliente').del();
        await knexInstance('endereco').del();
        await AuthHelper.init();
    });

    afterAll(async () => {
        await knexInstance.destroy();
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
