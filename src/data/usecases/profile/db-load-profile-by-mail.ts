import { LoadPositionByProfileIdRepository } from '@/data/protocols/db/position/load-position-by-profile-id-repository';
import { LoadProfileByMailRepository } from '@/data/protocols/db/profile/load-profile-by-mail-repository';
import { PositionModel } from '@/domain/models/position-model';
import { ProfileModel } from '@/domain/models/profile-model';
import { LoadProfileByMail } from '@/domain/usecases/profile/load-profile-by-mail';

export class DbLoadProfileByMail implements LoadProfileByMail {
    constructor(
        private readonly loadProfileByMailRepository: LoadProfileByMailRepository,
        private readonly loadPositionByProfileIdRepository: LoadPositionByProfileIdRepository
    ) {}

    async load(mail: string): Promise<ProfileModel> {
        const profile = await this.loadProfileByMailRepository.loadByMail(mail);
        const positions = await this.loadPositions(profile.id_profile);
        return {
            id: profile.id_profile,
            username: profile.username,
            firstName: profile.firstName,
            lastName: profile.lastName,
            mail: profile.mail,
            birthday: profile.birthday,
            nickname: profile.nickname,
            contacts: profile.contact ? profile.contact.split('::') : [],
            positions
        };
    }

    private async loadPositions(profile: number): Promise<PositionModel[]> {
        const model = await this.loadPositionByProfileIdRepository.loadByIdProfile(profile);
        return model.map((position) => ({ id: position.id_position, name: position.name }));
    }
}
