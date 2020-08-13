import { Router } from 'express';
import ForgotUserPasswordController from '../controllers/ForgotUserPasswordController';
import ResetPasswordController from '../controllers/ResetUserPasswordController';

const userPasswordRouter = Router();
const forgotPasswordController = new ForgotUserPasswordController();
const resetPasswordController = new ResetPasswordController();

userPasswordRouter.post('/users-forgot', forgotPasswordController.create);
userPasswordRouter.post('/users-reset', resetPasswordController.create);

export default userPasswordRouter;
