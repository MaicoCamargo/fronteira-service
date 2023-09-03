import { knexInstance } from './helpers/knex-helper';
import { DbClienteModel } from '../../../data/models/db-cliente-model';
import { ClientePgRepository } from './cliente-pg-repository';
import { DbEnderecoModel } from '../../../data/models/db-endereco-model';
import { mapper } from './helpers/mapper';
import { DbCarroModel } from '../../../data/models/db-carro-model';

const makeSut = () => {
    return new ClientePgRepository();
};

describe('Cliente Postgres Repository', () => {
    beforeAll(async () => {
        await knexInstance('cliente').del();
    });

    afterAll(async () => {
        await knexInstance('cliente').del();
        await knexInstance('endereco').del();
        await knexInstance('carro').del();
        await knexInstance.destroy();
    });
    describe('load()', () => {
        test('Deve retornar todos os clientes em caso de sucesso', async () => {
            const carro = await makePgCarroCreate();
            const endereco = await makePgEnderecoCreate();
            const createdClientes = [
                await makePgClienteCreate(carro, endereco),
                await makePgClienteCreate(carro, endereco)
            ];
            const sut = makeSut();
            const clientes = await sut.load();
            expect(clientes).toBeTruthy();
            expect(clientes.length).toEqual(createdClientes.length);
            expect(clientes[0].id_cliente).toEqual(createdClientes[0].id_cliente);
            expect(clientes[0].cpf).toEqual(createdClientes[0].cpf);
            expect(clientes[0].carro).toEqual(createdClientes[0].carro);
            expect(clientes[0].nome).toEqual(createdClientes[0].nome);
            expect(clientes[0].endereco).toEqual(createdClientes[0].endereco);
            expect(clientes[0].telefone).toEqual(createdClientes[0].telefone);
            expect(clientes[0].last_updated).toEqual(createdClientes[0].last_updated);

            expect(clientes[1].id_cliente).toEqual(createdClientes[1].id_cliente);
            expect(clientes[1].cpf).toEqual(createdClientes[1].cpf);
            expect(clientes[1].carro).toEqual(createdClientes[1].carro);
            expect(clientes[1].nome).toEqual(createdClientes[1].nome);
            expect(clientes[1].endereco).toEqual(createdClientes[1].endereco);
            expect(clientes[1].telefone).toEqual(createdClientes[1].telefone);
            expect(clientes[1].last_updated).toEqual(createdClientes[1].last_updated);
        });
    });
});

const makePgClienteCreate = async (carro: DbCarroModel, endereco: DbEnderecoModel): Promise<DbClienteModel> => {
    const randomStr = (Math.random() + 1).toString(36).substring(7);

    return mapper(
        await knexInstance('cliente')
            .insert({
                nome: randomStr,
                telefone: randomStr,
                cpf: 'any_cpf',
                carro_id: carro.id_carro,
                endereco_id: endereco.id_endereco,
                data_exclusao: null,
                last_updated: null
            })
            .returning('*')
    );
};
const makePgCarroCreate = async (): Promise<DbCarroModel> => {
    const result = mapper(
        await knexInstance('carro')
            .insert({
                ano: 2023,
                cor: 'any_cor',
                kilometragem: 100,
                modelo: 'any_modelo',
                placa: 'any_placa'
            })
            .returning('*')
    );
    return {
        id_carro: result.id_carro,
        ano: result.ano,
        cor: result.cor,
        quilometragem: result.kilometragem,
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
