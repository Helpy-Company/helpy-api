import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.post('/', companyController.create);

export default companyRouter;
