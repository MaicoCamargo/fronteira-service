import { DbProfileModel } from '@/data/models/db-profile-model';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';

describe('Profile Postgres Repository', () => {
    let profiles: DbProfileModel[];
    beforeAll(async () => {
        await mockDateAdapter.set(new Date());
        await knexInstance('profile').del();
        profiles = await makeProfileCreate();
    });

    afterAll(async () => {
        await mockDateAdapter.reset();
        await knexInstance.destroy();
    });

    describe('loadByMail()', () => {
        test('Deve retornar o profile filtrado pelo email', async () => {
            const sut = makeSut();
            const wrapper = await sut.loadByMail(profiles[0].mail);
            expect(wrapper).toEqual(profiles[0]);
        });
    });
});

const makeSut = (): ProfilePgRepository => {
    return new ProfilePgRepository();
};

const makeProfileCreate = async (): Promise<DbProfileModel[]> => {
    let created: DbProfileModel[] = [];
    let result = await knexInstance('profile')
        .insert({
            username: 'any_username',
            firstName: 'any_first_name',
            lastName: 'any_last_name',
            mail: 'any_mail',
            birthday: new Date(),
            nickname: 'any_nickname',
            contact: 'any_contact'
        })
        .returning(['id_profile', 'username', 'firstName', 'lastName', 'mail', 'birthday', 'nickname', 'contact']);
    created.push(result[0]);
    result = await knexInstance('profile')
        .insert({
            username: 'other_username',
            firstName: 'other_first_name',
            lastName: 'other_last_name',
            mail: 'other_mail',
            birthday: new Date(),
            nickname: 'other_nickname',
            contact: 'other_contact'
        })
        .returning(['id_profile', 'username', 'firstName', 'lastName', 'mail', 'birthday', 'nickname', 'contact']);
    created.push(result[0]);
    return created;
};
