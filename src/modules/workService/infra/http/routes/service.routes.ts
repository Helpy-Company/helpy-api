import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ServiceController from '../controllers/ServicesController';

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.use(ensureAuthenticated);

serviceRouter.post('/', serviceController.create);
serviceRouter.get('/', serviceController.index);
serviceRouter.delete('/:id', serviceController.delete);

export default serviceRouter;
