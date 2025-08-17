import { DbProfileModel } from '@/data/models/db-profile-model';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { makeProfileCreate } from '../../../../tests/mock/mock-db-profile';
import { DbPositionModel } from '@/data/models/db-position-model';
import { makePositionCreate } from '../../../../tests/mock/mock-db-position';
import { PositionPgRepository } from '@/infra/db/pg/position-pg-repository';

describe('Position Pg Repository', () => {
    let positions: DbPositionModel[];
    let profiles: DbProfileModel[];
    beforeAll(async () => {
        await knexInstance('profile_position').del();
        await knexInstance('position').del();
        await knexInstance('profile').del();
        positions = await makePositionCreate();
        profiles = await makeProfileCreate();
        await makeProfilePositionCreate(profiles[0], positions[0]);
    });

    afterAll(async () => {
        await knexInstance.destroy();
    });

    test('Deve retornar uma position(funcionalidade) buscando pelo id do profile(perfil) em caso de sucesso', async () => {
        const sut = makeSut();
        const positions = await sut.loadByIdProfile(profiles[0].id_profile);
        expect(positions.length).toBe(1);
        expect(positions[0].id_position).toBe(positions[0].id_position);
        expect(positions[0].name).toBe(positions[0].name);
        expect(positions[0].description).toBe(positions[0].description);
    });
});

const makeSut = (): PositionPgRepository => {
    return new PositionPgRepository();
};

const makeProfilePositionCreate = async (profile: DbProfileModel, position: DbPositionModel): Promise<void> => {
    await knexInstance('profile_position').insert({
        profile_id: profile.id_profile,
        position_id: position.id_position
    });
};
