import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import companyRouter from '@modules/companies/infra/http/routes/company.routes';
import serviceRouter from '@modules/workService/infra/http/routes/service.routes';
import companyPasswordRouter from '@modules/companies/infra/http/routes/company.password.routes';
import usersPasswordRouter from '@modules/users/infra/http/routes/users.password.routes';
import categoryRouter from '@modules/workService/infra/http/routes/category.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/companies', companyRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/services', serviceRouter);
routes.use('/categories', categoryRouter);
routes.use('/password', companyPasswordRouter);
routes.use('/password', usersPasswordRouter);

export default routes;
