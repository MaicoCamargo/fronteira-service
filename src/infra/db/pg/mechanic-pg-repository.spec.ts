import { makePgServicoCreate } from '../../../../tests/mock/mock-db-servico';
import { DbServicoModel } from '@/data/models/db-servico-model';
import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { MechanicPgRepository } from '@/infra/db/pg/mechanic-pg-repository';
import { makeProfilePositionCreate } from '../../../../tests/mock/mock-db-profile-position';
import { makePositionCreate } from '../../../../tests/mock/mock-db-position';
import { makeProfileCreate } from '../../../../tests/mock/mock-db-profile';
import { ENV } from '@/main/config/env';

describe('Mechanic Pg Repository', () => {
    let servicos: DbServicoModel[];
    let mecanicos: DbMechanicModel[];

    beforeAll(async () => {
        await knexInstance('servico_mecanico').del();
        await knexInstance('profile_position').del();
        await knexInstance('servico_peca').del();
        await knexInstance('nota_fiscal').del();
        await knexInstance('servico').del();
        await knexInstance('position').del();
        await knexInstance('profile').del();
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
            expect(wrapper.content[0].firstName).toEqual(mecanicos[0].firstName);
        });
    });

    describe('load()', () => {
        test('Deve retornar todos os mecânicos em caso de sucesso', async () => {
            const sut = makeSut();
            const wrapper = await sut.load();
            expect(wrapper).toBeTruthy();
            expect(wrapper.content.length).toEqual(mecanicos.length);
            expect(wrapper.content[0].id_mecanico).toEqual(mecanicos[0].id_mecanico);
            expect(wrapper.content[0].firstName).toEqual(mecanicos[0].firstName);
        });
    });

    describe('save()', () => {
        beforeAll(async () => {
            await knexInstance('servico_mecanico').del();
        });

        test('Deve salvar e retornar os mecânicos atuais de um serviço', async () => {
            const sut = makeSut();
            const mechanics = await sut.save(
                servicos[0].id_servico,
                mecanicos.map((mechanic) => mechanic.id_mecanico)
            );
            expect(mechanics.length).toEqual(mecanicos.length);
            expect(mechanics[0].id_mecanico).toEqual(mecanicos[0].id_mecanico);
            expect(mechanics[1].id_mecanico).toEqual(mecanicos[1].id_mecanico);
        });

        test('Deve retornar uma lista vazia se null for enviado na lista de mecânicos', async () => {
            const sut = makeSut();
            const dbMechanicModels = await sut.save(servicos[0].id_servico, null);
            expect(dbMechanicModels.length).toEqual(0);
        });
    });

    describe('update()', () => {
        beforeAll(async () => {
            await knexInstance('servico_mecanico').del();
        });

        test('Deve atualizar os mecânicos de um serviço e trazer os mecânicos atuais', async () => {
            await knexInstance('servico_mecanico').insert([
                { servico_id: servicos[0].id_servico, mecanico_id: mecanicos[0].id_mecanico },
                { servico_id: servicos[0].id_servico, mecanico_id: mecanicos[1].id_mecanico }
            ]);

            const sut = makeSut();
            const mechanicModels = await sut.update(servicos[0].id_servico, [mecanicos[0].id_mecanico]);
            expect(mechanicModels.length).toEqual(1);
            expect(mechanicModels[0].id_mecanico).toEqual(mecanicos[0].id_mecanico);
        });

        test('Deve criar os mecânicos de um serviço e trazer os mecânicos atuais', async () => {
            await knexInstance('servico_mecanico').del();
            const sut = makeSut();
            const mechanicModels = await sut.update(servicos[0].id_servico, [
                mecanicos[0].id_mecanico,
                mecanicos[1].id_mecanico
            ]);
            expect(mechanicModels.length).toEqual(2);
            expect(mechanicModels[0].id_mecanico).toEqual(mecanicos[0].id_mecanico);
            expect(mechanicModels[1].id_mecanico).toEqual(mecanicos[1].id_mecanico);
        });
    });
});

const makeSut = () => {
    return new MechanicPgRepository();
};

const makePgMechanicCreate = async (): Promise<DbMechanicModel[]> => {
    const profiles = await makeProfileCreate();
    const positions = await makePositionCreate();
    const mechanicProfileOne = profiles[0];
    const mechanicProfileTwo = profiles[1];
    const mechanicPosition = positions[0];
    await makeProfilePositionCreate(mechanicProfileOne, mechanicPosition);
    await makeProfilePositionCreate(mechanicProfileTwo, mechanicPosition);
    ENV.MECHANIC_POSITION_ID = mechanicPosition.id_position;
    return [
        { ...mechanicProfileOne, id_mecanico: mechanicProfileOne.id_profile },
        { ...mechanicProfileTwo, id_mecanico: mechanicProfileTwo.id_profile }
    ];
};

const makePgServicoMecanicoCreate = async (servicos: DbServicoModel[], mechanics: DbMechanicModel[]): Promise<void> => {
    await knexInstance('servico_mecanico').insert([
        { servico_id: servicos[0].id_servico, mecanico_id: mechanics[0].id_mecanico },
        { servico_id: servicos[0].id_servico, mecanico_id: mechanics[1].id_mecanico, dh_exclusion: new Date() },
        { servico_id: servicos[1].id_servico, mecanico_id: mechanics[0].id_mecanico }
    ]);
};
