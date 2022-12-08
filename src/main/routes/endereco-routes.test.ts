import request from 'supertest';
import app from '../../../src/main/config/app';
import { HttpRequest } from '../../presentation/protocols';
import { knexInstance } from '../../infra/db/pg/helpers/knex-helper';

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
    afterAll(async () => {
        await knexInstance('endereco').del();
        await knexInstance.destroy();
    });
    test('Deve retornar 201 em caso de sucesso', async () => {
        await request(app).post('/service/endereco').send(makeFakeRequest().body).expect(201);
    });
});
