import { Express, Router } from 'express';
import fastGlob from 'fast-glob';
import * as path from 'node:path';

export default (app: Express): void => {
    const router = Router();
    app.use('/service', router);
    const pathRoutes: string = path.join(__dirname, '/../routes/**routes.{ts,js}');
    fastGlob.sync(pathRoutes).map(async (file) => (await import(file)).default(router));
};
