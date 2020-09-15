import { Router } from 'express';
import CategoryController from '../controllers/CategoriesController';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get('/', categoryController.index);

export default categoryRouter;
