import { knexInstance } from './helpers/knex-helper';
import { DbClienteModel } from '../../../data/models/db-cliente-model';
import { ClientePgRepository } from './cliente-pg-repository';
import { DbEnderecoModel } from '../../../data/models/db-endereco-model';
import { mapper } from './helpers/mapper';
import { DbCarroModel } from '../../../data/models/db-carro-model';
import { PageFilter } from '../../../main/protocols/page-filter';

const makeSut = () => {
    return new ClientePgRepository();
};

describe('Cliente Postgres Repository', () => {
    beforeAll(async () => {
        await knexInstance('cliente_carro').del();
        await knexInstance('cliente').del();
        await knexInstance('endereco').del();
        await knexInstance('carro').del();
    });

    afterAll(async () => {
        await knexInstance('cliente_carro').del();
        await knexInstance('cliente').del();
        await knexInstance('endereco').del();
        await knexInstance('carro').del();
        await knexInstance.destroy();
    });
    describe('load()', () => {
        test('Deve retornar todos os clientes em caso de sucesso', async () => {
            const endereco = await makePgEnderecoCreate();
            const createdClientes = [await makePgClienteCreate(endereco), await makePgClienteCreate(endereco)];
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
            const endereco = await makePgEnderecoCreate();
            await Promise.all([
                await makePgClienteCreate(endereco),
                await makePgClienteCreate(endereco),
                await makePgClienteCreate(endereco),
                await makePgClienteCreate(endereco),
                await makePgClienteCreate(endereco)
            ]);

            const sut = makeSut();
            const pageFilter: PageFilter = { page: 1, size: 6 };
            const wrapper = await sut.load(pageFilter);
            expect(wrapper).toBeTruthy();
            expect(wrapper.content.length).toEqual(pageFilter.size);
            expect(wrapper.pagination.perPage).toEqual(pageFilter.size);
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
            const model = await makePgClienteCreate(await makePgEnderecoCreate());
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
            const model = await makePgClienteCreate(await makePgEnderecoCreate());
            const sut = makeSut();
            const cliente = await sut.update({
                id_cliente: model.id_cliente,
                nome: 'outher_nome',
                telefone: 'outher_telefone',
                cpf: 'any_cpf'
            });
            expect(cliente).toBeTruthy();
            expect(cliente.id_cliente).toEqual(model.id_cliente);
            expect(cliente.cpf).toEqual('any_cpf');
            expect(cliente.nome).toEqual('outher_nome');
            expect(cliente.endereco_id).toEqual(model.endereco_id);
            expect(cliente.telefone).toEqual('outher_telefone');
            expect(cliente.last_updated).toBeTruthy();
        });
    });

    describe('delete()', () => {
        test('Deve deletar um cliente pelo id', async () => {
            const model = await makePgClienteCreate(await makePgEnderecoCreate());
            const sut = makeSut();
            await sut.delete(model.id_cliente);
            const cliente = await sut.loadById(model.id_cliente);
            expect(cliente).toBeNull();
        });
    });
});

const makePgClienteCreate = async (endereco: DbEnderecoModel): Promise<DbClienteModel> => {
    const randomStr = (Math.random() + 1).toString(36).substring(7);

    return mapper(
        await knexInstance('cliente')
            .insert({
                nome: randomStr,
                telefone: randomStr,
                cpf: 'any_cpf',
                endereco_id: endereco.id_endereco,
                last_updated: new Date()
            })
            .returning(['nome', 'telefone', 'cpf', 'endereco_id', 'last_updated', 'id_cliente'])
    );
};
const makePgCarroCreate = async (): Promise<DbCarroModel> => {
    const result = mapper(
        await knexInstance('carro')
            .insert({
                ano: 2023,
                cor: 'any_cor',
                quilometragem: 100,
                modelo: 'any_modelo',
                placa: 'any_placa'
            })
            .returning('*')
    );
    return {
        id_carro: result.id_carro,
        ano: result.ano,
        cor: result.cor,
        quilometragem: result.quilometragem,
        modelo: result.modelo,
        placa: result.placa
    };
};
const makePgEnderecoCreate = async (): Promise<DbEnderecoModel> => {
    return mapper(
        await knexInstance('endereco')
            .insert({
                rua: 'any_rua',
                cidade: 'any_cidade',
                cep: 'any_cep',
                numero: 'any_numero',
                complemento: 'any_complemento'
            })
            .returning('*')
    );
};
