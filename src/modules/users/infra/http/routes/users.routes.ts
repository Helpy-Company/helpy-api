import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersControllers';
import VerifyUserEmailController from '../controllers/VerifyUserEmailController';

const userRouter = Router();
const userController = new UsersController();
const emailVerificationController = new VerifyUserEmailController();

userRouter.post('/', userController.create);
userRouter.get('/services/me', ensureAuthenticated, userController.index);
userRouter.post('/email-verification', emailVerificationController.update);

export default userRouter;
