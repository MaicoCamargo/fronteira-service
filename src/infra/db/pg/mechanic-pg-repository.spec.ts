import { makePgServicoCreate } from '../../../../tests/mock/mock-db-servico';
import { DbServicoModel } from '@/data/models/db-servico-model';
import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { MechanicPgRepository } from '@/infra/db/pg/mechanic-pg-repository';

describe('Mechanic Pg Repository', () => {
    let servicos: DbServicoModel[];
    let mecanicos: DbMechanicModel[];

    beforeAll(async () => {
        await knexInstance('servico_mecanico').del();
        await knexInstance('servico_peca').del();
        await knexInstance('servico').del();
        await knexInstance('mecanico').del();
        mecanicos = await makePgMechanicCreate();
    });

    afterAll(async () => {
        await knexInstance.destroy();
    });

    describe('loadByIdServico()', () => {
        beforeAll(async () => {
            servicos = await makePgServicoCreate();
        });

        test('Deve retornar todos os mecânicos "ativos" de um serviço em caso de sucesso', async () => {
            await makePgServicoMecanicoCreate(servicos, mecanicos);
            const sut = makeSut();
            const wrapper = await sut.loadByIdServico(servicos[0].id_servico);
            expect(wrapper).toBeTruthy();
            expect(wrapper.content.length).toEqual(1);
            expect(wrapper.content[0].id_mecanico).toEqual(mecanicos[0].id_mecanico);
            expect(wrapper.content[0].nome).toEqual(mecanicos[0].nome);
        });
    });
});

const makeSut = () => {
    return new MechanicPgRepository();
};

const makePgMechanicCreate = async (): Promise<DbMechanicModel[]> => {
    return knexInstance('mecanico')
        .insert([{ nome: 'any_nome' }, { nome: 'other_nome', dh_exclusion: new Date() }])
        .returning('*');
};

const makePgServicoMecanicoCreate = async (servicos: DbServicoModel[], mechanics: DbMechanicModel[]): Promise<void> => {
    await knexInstance('servico_mecanico').insert([
        { servico_id: servicos[0].id_servico, mecanico_id: mechanics[0].id_mecanico },
        { servico_id: servicos[0].id_servico, mecanico_id: mechanics[1].id_mecanico, dh_exclusion: new Date() },
        { servico_id: servicos[1].id_servico, mecanico_id: mechanics[0].id_mecanico }
    ]);
};
