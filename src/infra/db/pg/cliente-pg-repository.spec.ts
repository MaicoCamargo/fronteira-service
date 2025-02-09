import { knexInstance } from './helpers/knex-helper';
import { DbClienteModel } from '../../../data/models/db-cliente-model';
import { ClientePgRepository } from './cliente-pg-repository';
import { PageFilter } from '@/main/protocols/page-filter';
import { makePgClienteCreate } from '../../../../tests/mock/mock-db-cliente';
import { makePgServicoCreate } from '../../../../tests/mock/mock-db-servico';
import { makePgEnderecoCreate } from '../../../../tests/mock/mock-db-endereco';
import { makePgCarroCreate } from '../../../../tests/mock/mock-db-carro';

const makeSut = () => {
    return new ClientePgRepository();
};

describe('Cliente Postgres Repository', () => {
    beforeAll(async () => {
        await knexInstance('servico_peca').del();
        await knexInstance('servico_mecanico').del();
        await knexInstance('servico').del();
        await knexInstance('cliente_carro').del();
        await knexInstance('cliente').del();
        await knexInstance('endereco').del();
        await knexInstance('carro').del();
    });

    afterAll(async () => {
        await knexInstance.destroy();
    });
    describe('load()', () => {
        test('Deve retornar todos os clientes em caso de sucesso', async () => {
            const createdClientes = [await makePgClienteCreate(), await makePgClienteCreate()].sort((a, b) =>
                a.nome.localeCompare(b.nome)
            );
            const sut = makeSut();
            const wrapper = await sut.load();
            expect(wrapper).toBeTruthy();
            expect(wrapper.content.length).toEqual(createdClientes.length);
            expect(wrapper.content[0].id_cliente).toEqual(createdClientes[0].id_cliente);
            expect(wrapper.content[0].cpf).toEqual(createdClientes[0].cpf);
            expect(wrapper.content[0].nome).toEqual(createdClientes[0].nome);
            expect(wrapper.content[0].endereco_id).toEqual(createdClientes[0].endereco_id);
            expect(wrapper.content[0].telefone).toEqual(createdClientes[0].telefone);
            expect(wrapper.content[0].last_updated).toEqual(createdClientes[0].last_updated);

            expect(wrapper.content[1].id_cliente).toEqual(createdClientes[1].id_cliente);
            expect(wrapper.content[1].cpf).toEqual(createdClientes[1].cpf);
            expect(wrapper.content[1].nome).toEqual(createdClientes[1].nome);
            expect(wrapper.content[1].endereco_id).toEqual(createdClientes[1].endereco_id);
            expect(wrapper.content[1].telefone).toEqual(createdClientes[1].telefone);
            expect(wrapper.content[1].last_updated).toEqual(createdClientes[1].last_updated);
        });

        test('Deve retornar os dados paginados em caso de sucesso', async () => {
            await Promise.all([
                await makePgClienteCreate(),
                await makePgClienteCreate(),
                await makePgClienteCreate(),
                await makePgClienteCreate(),
                await makePgClienteCreate()
            ]);

            const sut = makeSut();
            const pageFilter: PageFilter = { page: 1, size: 6 };
            const wrapper = await sut.load({ pageFilter });
            expect(wrapper).toBeTruthy();
            expect(wrapper.content.length).toEqual(pageFilter.size);
            expect(wrapper.pagination.perPage).toEqual(pageFilter.size);
        });

        test('Deve retornar todos os clientes filtrado pelo nome', async () => {
            const createdClientes = [await makePgClienteCreate(), await makePgClienteCreate()];
            const sut = makeSut();
            const wrapper = await sut.load({
                params: {
                    nome: createdClientes[0].nome
                }
            });
            expect(wrapper).toBeTruthy();
            expect(wrapper.content.length).toEqual(1);
            expect(wrapper.content[0].id_cliente).toEqual(createdClientes[0].id_cliente);
            expect(wrapper.content[0].cpf).toEqual(createdClientes[0].cpf);
            expect(wrapper.content[0].nome).toEqual(createdClientes[0].nome);
            expect(wrapper.content[0].endereco_id).toEqual(createdClientes[0].endereco_id);
            expect(wrapper.content[0].telefone).toEqual(createdClientes[0].telefone);
            expect(wrapper.content[0].last_updated).toEqual(createdClientes[0].last_updated);
        });
    });

    describe('save()', () => {
        test('Deve criar e retornar um cliente em caso de sucesso', async () => {
            const carro = await makePgCarroCreate();
            const endereco = await makePgEnderecoCreate();
            const model: DbClienteModel = {
                cpf: 'any_cpf',
                nome: 'any_nome',
                telefone: 'any_telefone',
                endereco_id: endereco.id_endereco
            };
            const sut = makeSut();
            const cliente = await sut.save(model);
            expect(cliente).toBeTruthy();
            expect(cliente.id_cliente).toBeTruthy();
            expect(cliente.cpf).toEqual(model.cpf);
            expect(cliente.nome).toEqual(model.nome);
            expect(cliente.endereco_id).toEqual(model.endereco_id);
            expect(cliente.telefone).toEqual(model.telefone);
            expect(cliente.last_updated).toBeNull();
        });
    });

    describe('loadById()', () => {
        test('Deve retornar um cliente pelo id', async () => {
            const model = await makePgClienteCreate();
            const sut = makeSut();
            const cliente = await sut.loadById(model.id_cliente);
            expect(cliente).toEqual(model);
        });

        test('Deve retornar null caso não encontre o cliente', async () => {
            const sut = makeSut();
            const cliente = await sut.loadById(0);
            expect(cliente).toBeNull();
        });
    });

    describe('update()', () => {
        test('Deve atualizar um cliente pelo id', async () => {
            const model = await makePgClienteCreate();
            const sut = makeSut();
            const cliente = await sut.update({
                id_cliente: model.id_cliente,
                nome: 'other_nome',
                telefone: 'other_telefone',
                cpf: 'any_cpf'
            });
            expect(cliente).toBeTruthy();
            expect(cliente.id_cliente).toEqual(model.id_cliente);
            expect(cliente.cpf).toEqual('any_cpf');
            expect(cliente.nome).toEqual('other_nome');
            expect(cliente.endereco_id).toEqual(model.endereco_id);
            expect(cliente.telefone).toEqual('other_telefone');

            const clienteDb = await knexInstance('cliente').where({ id_cliente: model.id_cliente }).first();
            expect(clienteDb.last_updated).not.toBeNull();
            expect(clienteDb.dh_exclusion).toBeNull();
        });
    });

    describe('delete()', () => {
        test('Deve deletar um cliente pelo id', async () => {
            const model = await makePgClienteCreate();
            const sut = makeSut();
            await sut.delete(model.id_cliente);
            const cliente = await sut.loadById(model.id_cliente);
            expect(cliente).toBeNull();
        });
    });

    describe('loadByIdServico()', () => {
        test('Deve retornar um cliente pelo id do servico', async () => {
            const servico = await makePgServicoCreate();

            const sut = makeSut();
            const cliente = await sut.loadByIdServico(servico[0].id_servico);
            // todo -> realizar consultas pra validar se o cliente encontrado é o certo
            expect(cliente.id_cliente).not.toBeNull();
        });
    });
});
