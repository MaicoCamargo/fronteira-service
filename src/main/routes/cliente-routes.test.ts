import { HttpRequest } from '../../presentation/protocols';
import { knexInstance } from '../../infra/db/pg/helpers/knex-helper';
import request from 'supertest';
import app from '../config/app';

const makeFakeRequest = (): HttpRequest => ({});

describe('GET /clientes', () => {
    afterAll(async () => {
        await knexInstance('cliente').del();
        await knexInstance.destroy();
    });
    test('Deve retornar 200 em caso de sucesso', async () => {
        await request(app).get('/service/clientes').send(makeFakeRequest().body).expect(200);
    });
});
