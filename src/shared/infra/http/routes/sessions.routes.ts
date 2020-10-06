import Router from 'express';
import ContractorsSessionsController from '@modules/contractors/infra/http/controllers/ContractorsSessionsController';
import ProvidersSessionsController from '@modules/workProviders/infra/http/controllers/ProvidersSessionsController';
import SupplierSessionsController from '@modules/suppliers/infra/http/controllers/SupplierSessionsController';

const sessionRouter = Router();
const contractorsSessionsController = new ContractorsSessionsController();
const providersSessionsController = new ProvidersSessionsController();
const suppliersSessionsController = new SupplierSessionsController();

sessionRouter.post('/contractors', contractorsSessionsController.create);
sessionRouter.post('/providers', providersSessionsController.create);
sessionRouter.post('/suppliers', suppliersSessionsController.create);

export default sessionRouter;
