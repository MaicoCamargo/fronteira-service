import { Express } from 'express';
import { BodyParser, Cors, ContentType, Prometheus, requestScope } from '../middlewares';

export default (app: Express): void => {
    app.use(BodyParser);
    app.use(Cors);
    app.use(ContentType);
    app.use(Prometheus);
    app.use(requestScope);
};
