import { Router } from 'express';
import ForgotCompanyPasswordController from '../controllers/ForgotCompanyPasswordController';
import ResetCompanyPasswordController from '../controllers/ResetCompanyPasswordController';

const companyPasswordRouter = Router();
const forgotPasswordController = new ForgotCompanyPasswordController();
const resetPasswordController = new ResetCompanyPasswordController();

companyPasswordRouter.post('/company-forgot', forgotPasswordController.create);
companyPasswordRouter.post('/company-reset', resetPasswordController.create);

export default companyPasswordRouter;
