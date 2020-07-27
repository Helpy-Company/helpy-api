import { Router } from 'express';
import ServiceController from '../controllers/ServicesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.post('/', ensureAuthenticated, serviceController.create);
serviceRouter.get('/:id', ensureAuthenticated, serviceController.index);
export default serviceRouter;
