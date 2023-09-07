import { Controller, HttpRequest } from '../../presentation/protocols';
import { Request, Response } from 'express';

export const expressRouterAdapter = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params
        };
        const httpResponse = await controller.handle(httpRequest);
        if (httpResponse.statusCode <= 400) {
            res.status(httpResponse.statusCode).json(httpResponse.body);
        } else {
            res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
        }
    };
};
