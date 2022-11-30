import app from '../config/app';
import request from 'supertest';

describe('Cors Middleware', function () {
    test('Deve retornar CORS habilitado', async () => {
        app.get('/cors', (req, res) => {
            res.send(req.body);
        });
        await request(app)
            .get('/cors')
            .expect('access-control-allow-origin', '*')
            .expect('access-control-allow-headers', '*')
            .expect('access-control-allow-methods', '*');
    });
});
