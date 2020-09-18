import Router from 'express';
import UsersSessionsController from '@modules/users/infra/http/controllers/UsersSessionsController';
import ProvidersSessionsController from '@modules/workProviders/infra/http/controllers/ProvidersSessionsController';

const sessionRouter = Router();
const usersSessionsController = new UsersSessionsController();
const providersSessionsController = new ProvidersSessionsController();

sessionRouter.post('/users', usersSessionsController.create);
sessionRouter.post('/providers', providersSessionsController.create);

export default sessionRouter;
