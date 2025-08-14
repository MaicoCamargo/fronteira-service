import { DbProfileModel } from '@/data/models/db-profile-model';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';
import { SaveProfileModel } from '@/data/protocols/db/profile/save-profile-repository';
import { makeProfileCreate } from '../../../../tests/mock/mock-db-profile';

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

    describe('save()', () => {
        test('Deve criar um novo profile em caso de sucesso', async () => {
            const sut = makeSut();
            const randomStr = (Math.random() + 1).toString(36).substring(7);
            const model: SaveProfileModel = {
                mail: randomStr,
                birthday: new Date('01-01-2025'),
                nickname: randomStr,
                contact: randomStr,
                firstName: 'any_first_name',
                lastName: 'any_last_name',
                username: randomStr
            };
            const data = await sut.save(model);
            expect(data.mail).toEqual(model.mail);
            expect(data.birthday).toEqual(new Date('01-01-2025'));
            expect(data.nickname).toEqual(model.nickname);
            expect(data.contact).toEqual(model.contact);
            expect(data.firstName).toEqual(model.firstName);
            expect(data.firstName).toEqual(model.firstName);
            expect(data.lastName).toEqual(model.lastName);
            expect(data.username).toEqual(model.username);
            expect(data.id_profile).toBeTruthy();
        });
    });

    describe('load()', () => {
        test('Deve buscar o profile pelos parâmetros em caso de sucesso', async () => {
            const sut = makeSut();

            const wrapper = await sut.load({
                params: {
                    nickname: 'any'
                }
            });

            const found = profiles.find((profile) => profile.nickname.includes('any'));
            expect(wrapper.content).toHaveLength(1);
            expect(found).toBeTruthy();
            expect(wrapper.content).toEqual([found]);
        });
    });
});

const makeSut = (): ProfilePgRepository => {
    return new ProfilePgRepository();
};
