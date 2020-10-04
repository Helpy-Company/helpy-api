import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ListsController from '../controller/ListsController';

const listsRouter = Router();
const listsController = new ListsController();

listsRouter.use(ensureAuthenticated);

listsRouter.post('/', listsController.create);
listsRouter.get('/', listsController.index);

export default listsRouter;
