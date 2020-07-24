import { Router } from 'express';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import companyRouter from './company.routes';
import serviceRouter from './service.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/companies', companyRouter);
routes.use('/services', serviceRouter);

export default routes;
