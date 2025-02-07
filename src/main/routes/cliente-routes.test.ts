import { HttpRequest } from '../../presentation/protocols';
import { knexInstance } from '../../infra/db/pg/helpers/knex-helper';
import request from 'supertest';
import app from '../config/app';
import { ClientePgRepository } from '../../infra/db/pg/cliente-pg-repository';
import { EnderecoPgRepository } from '../../infra/db/pg/endereco-pg-repository';
import { AddEnderecoParams } from '../../domain/usecases/endereco/add-endereco';
import { DbEnderecoModel } from '../../data/models/db-endereco-model';
import { AddClienteModel } from '../../data/protocols/db/cliente/save-cliente-repository';
import { AuthHelper } from '../../../tests/helper/auth-helper';

describe('/clientes', () => {
    const AUTHORIZATION_HEADER = 'authorization';
    beforeAll(async () => {
        await knexInstance('cliente_carro').del();
        await knexInstance('servico_mecanico').del();
        await knexInstance('servico_peca').del();
        await knexInstance('servico').del();
        await knexInstance('cliente').del();
        await knexInstance('endereco').del();
        await knexInstance('carro').del();
        await AuthHelper.init();
    });

    afterAll(async () => {
        await knexInstance.destroy();
        await AuthHelper.destroy();
    });

    describe('GET', () => {
        test('Deve retornar 200 em caso de sucesso', async () => {
            await request(app)
                .get('/service/clientes')
                .set(AUTHORIZATION_HEADER, await AuthHelper.authenticate())
                .expect(200);
        });
    });

    describe('POST', () => {
        test('Deve retornar 201 em caso de sucesso', async () => {
            await request(app)
                .post('/service/clientes')
                .set(AUTHORIZATION_HEADER, await AuthHelper.authenticate())
                .send(makeFakeRequest().body)
                .expect(201);
        });
        const makeFakeRequest = (): HttpRequest => ({
            body: {
                nome: 'any_nome',
                telefone: 'any_telefone',
                cpf: 'any_cpf'
            }
        });
    });

    describe('PUT', () => {
        test('Deve retornar 200 em caso de sucesso', async () => {
            const clientePgRepository = new ClientePgRepository();
            const dbClienteModel: AddClienteModel = {
                nome: 'any_nome',
                cpf: 'any_cpf',
                last_updated: new Date(),
                endereco_id: (await makeCreateEndereco()).id_endereco,
                telefone: 'any_telefone'
            };
            const created = await clientePgRepository.save(dbClienteModel);
            const httpRequest: HttpRequest = {
                body: {
                    id: created.id_cliente,
                    nome: 'outher_nome',
                    telefone: 'outher_telefone',
                    cpf: 'any_cpf'
                }
            };
            await request(app)
                .put(`/service/clientes/${created.id_cliente}`)
                .set(AUTHORIZATION_HEADER, await AuthHelper.authenticate())
                .send(makeFakeRequest(httpRequest).body)
                .expect(200);
        });
    });

    describe('DELETE', () => {
        test('Deve retornar 204 em caso de sucesso', async () => {
            const clientePgRepository = new ClientePgRepository();
            const dbClienteModel: AddClienteModel = {
                nome: 'any_nome',
                cpf: 'any_cpf',
                last_updated: new Date(),
                endereco_id: (await makeCreateEndereco()).id_endereco,
                telefone: 'any_telefone'
            };
            const created = await clientePgRepository.save(dbClienteModel);
            const httpRequest: HttpRequest = { params: { id: created.id_cliente } };
            await request(app)
                .delete(`/service/clientes/${created.id_cliente}`)
                .set(AUTHORIZATION_HEADER, await AuthHelper.authenticate())
                .send(makeFakeRequest(httpRequest).params)
                .expect(204);
        });
    });
});

const makeFakeRequest = (request: HttpRequest): HttpRequest => ({ ...request });

const makeCreateEndereco = async (): Promise<DbEnderecoModel> => {
    const model: AddEnderecoParams = {
        cep: 'any_cep',
        numero: 'any_numero',
        rua: 'any_rua',
        complemento: 'any_complemento',
        cidade: 'any_cidade'
    };
    const enderecoPgRepository = new EnderecoPgRepository();
    return await enderecoPgRepository.save(model);
};
