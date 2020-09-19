import Router from 'express';
import ContractorsSessionsController from '@modules/contractors/infra/http/controllers/ContractorsSessionsController';
import ProvidersSessionsController from '@modules/workProviders/infra/http/controllers/ProvidersSessionsController';

const sessionRouter = Router();
const contractorsSessionsController = new ContractorsSessionsController();
const providersSessionsController = new ProvidersSessionsController();

sessionRouter.post('/contractors', contractorsSessionsController.create);
sessionRouter.post('/providers', providersSessionsController.create);

export default sessionRouter;
