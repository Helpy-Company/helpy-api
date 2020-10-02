import { Router } from 'express';
import ForgotContractorsPasswordController from '../controllers/ForgotContractorsPasswordController';
import ResetContractorsPasswordController from '../controllers/ResetContractorsPasswordController';

const contractorPasswordRouter = Router();
const forgotPasswordController = new ForgotContractorsPasswordController();
const resetPasswordController = new ResetContractorsPasswordController();

contractorPasswordRouter.post(
  '/contractors-forgot',
  forgotPasswordController.create
);
contractorPasswordRouter.post(
  '/contractors-reset',
  resetPasswordController.create
);

export default contractorPasswordRouter;
