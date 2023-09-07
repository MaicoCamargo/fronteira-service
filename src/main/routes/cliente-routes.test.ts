import { HttpRequest } from '../../presentation/protocols';
import { knexInstance } from '../../infra/db/pg/helpers/knex-helper';
import request from 'supertest';
import app from '../config/app';
import { ClientePgRepository } from '../../infra/db/pg/cliente-pg-repository';
import { EnderecoPgRepository } from '../../infra/db/pg/endereco-pg-repository';
import { AddEnderecoParams } from '../../domain/usecases/endereco/add-endereco';
import { DbEnderecoModel } from '../../data/models/db-endereco-model';
import { AddClienteModel } from '../../data/protocols/db/cliente/save-cliente-repository';

describe('/clientes', () => {
    afterAll(async () => {
        await knexInstance('cliente').del();
        await knexInstance('endereco').del();
        await knexInstance('carro').del();
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

    describe('PUT', () => {
        test('Deve retornar 200 em caso de sucesso', async () => {
            const clientePgRepository = new ClientePgRepository();
            const dbClienteModel: AddClienteModel = {
                nome: 'any_nome',
                cpf: 'any_cpf',
                last_updated: new Date(),
                carro_id: (await makeCreateCarro()).id,
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
            await request(app).put('/service/clientes').send(makeFakeRequest(httpRequest).body).expect(200);
        });
    });

    describe('DELETE', () => {
        test('Deve retornar 204 em caso de sucesso', async () => {
            const clientePgRepository = new ClientePgRepository();
            const dbClienteModel: AddClienteModel = {
                nome: 'any_nome',
                cpf: 'any_cpf',
                last_updated: new Date(),
                carro_id: (await makeCreateCarro()).id,
                endereco_id: (await makeCreateEndereco()).id_endereco,
                telefone: 'any_telefone'
            };
            const created = await clientePgRepository.save(dbClienteModel);
            const httpRequest: HttpRequest = { params: { id: created.id_cliente } };
            await request(app)
                .delete(`/service/clientes/${created.id_cliente}`)
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

const makeCreateCarro = async (): Promise<{ id: number }> => {
    const result = await knexInstance('carro')
        .insert({ modelo: 'any_modelo', placa: 'any_placa' })
        .returning('id_carro');
    return result[0];
};
