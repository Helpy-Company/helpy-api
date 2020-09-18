import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import providerRouter from '@modules/workProviders/infra/http/routes/provider.routes';
import serviceRouter from '@modules/workService/infra/http/routes/service.routes';
import providerPasswordRouter from '@modules/workProviders/infra/http/routes/provider.password.routes';
import usersPasswordRouter from '@modules/users/infra/http/routes/users.password.routes';
import categoryRouter from '@modules/workService/infra/http/routes/category.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/providers', providerRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/services', serviceRouter);
routes.use('/categories', categoryRouter);
routes.use('/password', providerPasswordRouter);
routes.use('/password', usersPasswordRouter);

export default routes;
