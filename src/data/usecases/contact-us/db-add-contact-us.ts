import { AddContactUs, AddContactUsParams } from '@/domain/usecases/contact-us/add-contact-us';
import { SaveContactUsRepository } from '../../protocols/db/contact-us/save-contact-us-repository';

export class DbAddContactUs implements AddContactUs {
    constructor(private readonly saveContactUsRepository: SaveContactUsRepository) {}

    async add(params: AddContactUsParams): Promise<void> {
        await this.saveContactUsRepository.save(params);
    }
}
