import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CompanyController from '../controllers/CompanyController';

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.post('/', companyController.create);
companyRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    CEP: Joi.string(),
    phone: Joi.string(),
    fantasyName: Joi.string(),
    documentNumber: Joi.string(),
    company_category: Joi.string(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  },
}), ensureAuthenticated, companyController.update);

export default companyRouter;
