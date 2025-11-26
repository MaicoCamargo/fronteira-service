import { AddContactUsModel, SaveContactUsRepository } from '@/data/protocols/db/contact-us/save-contact-us-repository';
import { MongoHelper } from '../helpers/mongo-helper';

export class ContactUsMongoRepository implements SaveContactUsRepository {
    async save(contactUs: AddContactUsModel): Promise<void> {
        const collection = await MongoHelper.getCollection('contact-us');
        await collection.insertOne(contactUs);
    }
}
