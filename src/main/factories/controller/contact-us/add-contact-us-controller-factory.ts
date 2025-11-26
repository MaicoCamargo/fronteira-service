import { Controller } from '@/presentation/protocols';
import { AddContactUsController } from '@/presentation/controllers/contact-us/add-contact-us-controller';
import { makeDbAddContactUs } from '../../usescase/contact-us/db-add-contact-us-factory';

export const makeAddContactUsController = (): Controller => {
    return new AddContactUsController(makeDbAddContactUs());
};
