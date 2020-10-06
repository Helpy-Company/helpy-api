import { Router } from 'express';
import ForgotSuppliersPasswordController from '../controllers/ForgotSupplierPasswordController';
import ResetSuppliersPasswordController from '../controllers/ResetSupplierPasswordController';

const supplierPasswordRouter = Router();
const forgotPasswordController = new ForgotSuppliersPasswordController();
const resetPasswordController = new ResetSuppliersPasswordController();

supplierPasswordRouter.post(
  '/suppliers-forgot',
  forgotPasswordController.create
);
supplierPasswordRouter.post('/suppliers-reset', resetPasswordController.create);

export default supplierPasswordRouter;
