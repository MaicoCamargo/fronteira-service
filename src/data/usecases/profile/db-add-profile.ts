import { AddProfile, AddProfileParams } from '@/domain/usecases/profile/add-profile';
import { ProfileModel } from '@/domain/models/profile-model';
import { SaveProfileRepository } from '@/data/protocols/db/profile/save-profile-repository';
import { ENV } from '@/main/config/env';

export class DbAddProfile implements AddProfile {
    MECHANIC_POSITION_ID: number;
    constructor(private readonly saveProfileRepository: SaveProfileRepository) {
        this.MECHANIC_POSITION_ID = Number(ENV.MECHANIC_POSITION_ID);
    }

    async add(params: AddProfileParams): Promise<ProfileModel> {
        let contact: string = null;
        if (params.contacts) {
            contact = params.contacts.join('::');
        }
        const model = await this.saveProfileRepository.save({ ...params, contact }, [this.MECHANIC_POSITION_ID]);
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
