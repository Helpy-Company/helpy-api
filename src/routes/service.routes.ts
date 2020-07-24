import { Router } from 'express';
import ServiceController from '../controllers/ServicesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.post('/', ensureAuthenticated, serviceController.create);

export default serviceRouter;
