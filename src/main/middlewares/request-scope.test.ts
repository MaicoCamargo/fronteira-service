import app from '@/main/config/app';
import request from 'supertest';
import { httpRequestScope } from '@/infra/http/http-request-scope';

describe('Request Scope Middleware', function () {
    beforeAll(() => {
        app.get('/test-scope', (req, res) => {
            const scope = httpRequestScope.getStore();
            res.json(scope);
        });
    });

    test('Deve popular authorization e x-client-id no httpRequestScope', async () => {
        const token = 'Bearer any_token';
        const clientId = 'any_client_id';

        const response = await request(app)
            .get('/test-scope')
            .set('Authorization', token)
            .set('x-client-id', clientId)
            .expect(200);

        expect(response.body).toEqual({
            authorization: token,
            clientId
        });
    });

    test('Deve retornar undefined se headers não forem enviados', async () => {
        const response = await request(app).get('/test-scope').expect(200);

        expect(response.body).toEqual({
            authorization: undefined,
            clientId: undefined
        });
    });
});
