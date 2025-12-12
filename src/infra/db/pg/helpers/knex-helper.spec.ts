import { ENV } from '@/main/config/env';

describe('Knex Helper', () => {
    test('Deve conectar no ambiente diferente de "test"', async () => {
        ENV.NODE_ENV = 'dev';
        expect((await import('./knex-helper')).KnexHelper).toBeTruthy();
    });
});
