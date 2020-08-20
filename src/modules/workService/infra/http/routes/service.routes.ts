import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ServiceController from '../controllers/ServicesController';

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.post('/', ensureAuthenticated, serviceController.create);
serviceRouter.get('/', serviceController.index);

export default serviceRouter;
