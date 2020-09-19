import { Router } from 'express';
import ForgotProviderPasswordController from '../controllers/ForgotProviderPasswordController';
import ResetProviderPasswordController from '../controllers/ResetProviderPasswordController';

const providerPasswordRouter = Router();
const forgotPasswordController = new ForgotProviderPasswordController();
const resetPasswordController = new ResetProviderPasswordController();

providerPasswordRouter.post('/providers-forgot', forgotPasswordController.create);
providerPasswordRouter.post('/providers-reset', resetPasswordController.create);

export default providerPasswordRouter;
