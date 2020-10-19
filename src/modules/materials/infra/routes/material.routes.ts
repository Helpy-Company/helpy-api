import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import MaterialController from '../http/controllers/MaterialController';

const materialRouter = Router();

materialRouter.use(ensureAuthenticated);

const materialController = new MaterialController();

materialRouter.post('/', materialController.create);
materialRouter.put('/', materialController.update);
materialRouter.delete('/:id', materialController.delete);

export default materialRouter;
