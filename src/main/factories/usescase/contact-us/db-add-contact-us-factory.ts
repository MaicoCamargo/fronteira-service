import { DbAddContactUs } from '@/data/usecases/contact-us/db-add-contact-us';
import { AddContactUs } from '@/domain/usecases/contact-us/add-contact-us';
import { ContactUsMongoRepository } from '@/infra/db/mongodb/contact-us/contact-us-mogo-repository';

export const makeDbAddContactUs = (): AddContactUs => {
    const contactUsMongoRepository = new ContactUsMongoRepository();
    return new DbAddContactUs(contactUsMongoRepository);
};
