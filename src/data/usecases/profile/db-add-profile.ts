import { AddProfile, AddProfileParams } from '@/domain/usecases/profile/add-profile';
import { ProfileModel } from '@/domain/models/profile-model';
import { SaveProfileRepository } from '@/data/protocols/db/profile/save-profile-repository';

export class DbAddProfile implements AddProfile {
    constructor(private readonly saveProfileRepository: SaveProfileRepository) {}

    async add(params: AddProfileParams): Promise<ProfileModel> {
        let contact: string = null;
        if (params.contacts) {
            contact = params.contacts.join('::');
        }
        const model = await this.saveProfileRepository.save({ ...params, contact });
        return {
            id: model.id_profile,
            birthday: model.birthday,
            contacts: model.contact ? model.contact.split('::') : null,
            mail: model.mail,
            lastName: model.lastName,
            firstName: model.firstName,
            nickname: model.nickname,
            username: model.username,
            positions: []
        };
    }
}
