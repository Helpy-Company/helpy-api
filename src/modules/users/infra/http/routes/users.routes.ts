import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersControllers';

const userRouter = Router();
const userController = new UsersController();

userRouter.post('/', userController.create);
userRouter.get('/services/me', ensureAuthenticated, userController.index);

export default userRouter;
