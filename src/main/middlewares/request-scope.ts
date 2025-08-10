import { Request, Response, NextFunction } from 'express';
import { httpRequestScope } from '@/infra/http/http-request-scope';

export const requestScope = (req: Request, res: Response, next: NextFunction): void => {
    const store = {
        authorization: req.headers.authorization,
        clientId: req.headers['x-client-id'] as string
    };
    httpRequestScope.run(store, () => {
        next();
    });
};
