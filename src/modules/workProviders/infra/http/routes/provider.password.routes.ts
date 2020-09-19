import { Router } from 'express';
import ForgotProviderPasswordController from '../controllers/ForgotProviderPasswordController';
import ResetProviderPasswordController from '../controllers/ResetProviderPasswordController';

const providerPasswordRouter = Router();
const forgotPasswordController = new ForgotProviderPasswordController();
const resetPasswordController = new ResetProviderPasswordController();

providerPasswordRouter.post('/provider-forgot', forgotPasswordController.create);
providerPasswordRouter.post('/provider-reset', resetPasswordController.create);

export default providerPasswordRouter;
