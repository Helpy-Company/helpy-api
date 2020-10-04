import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import MaterialListController from '../http/controllers/MaterialListController';

const materialListRouter = Router();

materialListRouter.use(ensureAuthenticated);

const materialListController = new MaterialListController();

materialListRouter.post('/', materialListController.create);

export default materialListRouter;
