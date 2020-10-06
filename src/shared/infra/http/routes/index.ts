import { Router } from 'express';
import userRouter from '@modules/contractors/infra/http/routes/contractors.routes';
import providerRouter from '@modules/workProviders/infra/http/routes/provider.routes';
import serviceRouter from '@modules/workService/infra/http/routes/service.routes';
import providerPasswordRouter from '@modules/workProviders/infra/http/routes/provider.password.routes';
import contractorsPasswordRouter from '@modules/contractors/infra/http/routes/contractors.password.routes';
import categoryRouter from '@modules/workService/infra/http/routes/category.routes';
import supplierRouter from '@modules/suppliers/infra/http/routes/suppliers.routes';
import materialRouter from '@modules/materials/infra/routes/material.routes';
import listsRouter from '@modules/lists/infra/http/routes/lists.routes';
import supplierPasswordRouter from '@modules/suppliers/infra/http/routes/suppliers.password.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/contractors', userRouter);
routes.use('/password', contractorsPasswordRouter);

routes.use('/providers', providerRouter);
routes.use('/password', providerPasswordRouter);
routes.use('/materials', materialRouter);
routes.use('/lists', listsRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/services', serviceRouter);

routes.use('/categories', categoryRouter);

routes.use('/suppliers', supplierRouter);
routes.use('/password', supplierPasswordRouter);

export default routes;
