import { HttpRequest } from '../../presentation/protocols';
import { knexInstance } from '../../infra/db/pg/helpers/knex-helper';
import request from 'supertest';
import app from '../config/app';

describe('/clientes', () => {
    afterAll(async () => {
        await knexInstance('cliente').del();
        await knexInstance.destroy();
    });

    describe('GET', () => {
        test('Deve retornar 200 em caso de sucesso', async () => {
            await request(app).get('/service/clientes').send(makeFakeRequest().body).expect(200);
        });

        const makeFakeRequest = (): HttpRequest => ({});
    });

    describe('POST', () => {
        test('Deve retornar 201 em caso de sucesso', async () => {
            await request(app).post('/service/clientes').send(makeFakeRequest().body).expect(201);
        });
        const makeFakeRequest = (): HttpRequest => ({
            body: {
                nome: 'any_nome',
                telefone: 'any_telefone',
                cpf: 'any_cpf'
            }
        });
    });
});
