import app from '../config/app';
import request from 'supertest';

describe('Body Parser Middleware', function () {
    test('Deve retornar body JSON', async () => {
        app.post('/test-body-parser', (req, res) => {
            res.send(req.body);
        });
        await request(app).post('/test-body-parser').send({ name: 'Maico' }).expect({ name: 'Maico' });
    });
});
