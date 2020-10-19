import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ListsController from '../controller/ListsController';

const listsRouter = Router();
const listsController = new ListsController();

listsRouter.post('/', ensureAuthenticated, listsController.create);
listsRouter.get('/', listsController.index);
listsRouter.delete('/:list_id', ensureAuthenticated, listsController.delete);

export default listsRouter;
