import { HttpRequest } from '@/presentation/protocols';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import request from 'supertest';
import app from '../config/app';
import { ClientePgRepository } from '@/infra/db/pg/cliente-pg-repository';
import { EnderecoPgRepository } from '@/infra/db/pg/endereco-pg-repository';
import { AddEnderecoParams } from '@/domain/usecases/endereco/add-endereco';
import { DbEnderecoModel } from '@/data/models/db-endereco-model';
import { AddClienteModel } from '@/data/protocols/db/cliente/save-cliente-repository';
import { AuthHelper } from '../../../tests/helper/auth-helper';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { httpRequestScope } from '@/infra/http/http-request-scope';

describe('/clientes', () => {
    const AUTHORIZATION_HEADER = 'authorization';
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
        await KnexHelper.forTenant().table('cliente_carro').del();
        await KnexHelper.forTenant().table('servico_mecanico').del();
        await KnexHelper.forTenant().table('servico_peca').del();
        await KnexHelper.forTenant().table('servico').del();
        await KnexHelper.forTenant().table('cliente').del();
        await KnexHelper.forTenant().table('endereco').del();
        await KnexHelper.forTenant().table('carro').del();
        await AuthHelper.init();
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
        await KnexHelper.destroy();
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
            const { created, httpRequest } = await httpRequestScope.run({}, async () => {
                const clientePgRepository = new ClientePgRepository();
                const dbClienteModel: AddClienteModel = {
                    nome: 'any_nome',
                    cpf: 'any_cpf',
                    last_updated: new Date(),
                    endereco_id: (await makeCreateEndereco()).id_endereco,
                    telefone: 'any_telefone'
                };
                const created = await clientePgRepository.save(dbClienteModel);
                return {
                    created,
                    httpRequest: {
                        body: {
                            id: created.id_cliente,
                            nome: 'outher_nome',
                            telefone: 'outher_telefone',
                            cpf: 'any_cpf'
                        }
                    }
                };
            });
            await request(app)
                .put(`/service/clientes/${created.id_cliente}`)
                .set(AUTHORIZATION_HEADER, await AuthHelper.authenticate())
                .send(makeFakeRequest(httpRequest).body)
                .expect(200);
        });
    });

    describe('DELETE', () => {
        test('Deve retornar 204 em caso de sucesso', async () => {
            const { created } = await httpRequestScope.run({}, async () => {
                const clientePgRepository = new ClientePgRepository();
                const dbClienteModel: AddClienteModel = {
                    nome: 'any_nome',
                    cpf: 'any_cpf',
                    last_updated: new Date(),
                    endereco_id: (await makeCreateEndereco()).id_endereco,
                    telefone: 'any_telefone'
                };
                const created = await clientePgRepository.save(dbClienteModel);
                return { created };
            });
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
