import request from 'supertest';
import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';

describe('/contact-us', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        const collection = await MongoHelper.getCollection('contact-us');
        await collection.deleteMany({});
    });

    describe('POST /contact-us', () => {
        test('Deve retornar 204 em caso de sucesso', async () => {
            await request(app)
                .post('/service/contact-us')
                .send({
                    firstName: 'any_first_name',
                    lastName: 'any_last_name',
                    contact: 'any_contact',
                    message: 'any_message'
                })
                .expect(204);
        });
    });
});
