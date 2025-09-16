import { DbProfileModel } from '../../src/data/models/db-profile-model';
import { ProfileModel } from '@/domain/models/profile-model';

export const mockFakeDbProfileModel = (): DbProfileModel => ({
    id_profile: 1,
    username: 'any_username',
    firstName: 'any_first_name',
    lastName: 'any_last_name',
    mail: 'any_mail@any_mail.com',
    birthday: new Date('2000-01-01'),
    nickname: 'any_nickname',
    contact: 'any_contact::another_contact'
});

export const mockFakeProfileModel = (): ProfileModel => ({
    id: mockFakeDbProfileModel().id_profile,
    mail: mockFakeDbProfileModel().mail,
    birthday: mockFakeDbProfileModel().birthday,
    firstName: mockFakeDbProfileModel().firstName,
    username: mockFakeDbProfileModel().username,
    lastName: mockFakeDbProfileModel().lastName,
    contacts: mockFakeDbProfileModel().contact.split('::'),
    nickname: mockFakeDbProfileModel().nickname,
    positions: []
});
