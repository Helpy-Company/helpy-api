import { Router } from 'express';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import companyRouter from './company.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/companies', companyRouter);

export default routes;
