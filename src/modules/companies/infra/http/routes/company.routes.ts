import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CompanyController from '../controllers/CompanyController';
import CompanyServicesController from '../controllers/CompanyServicesController';
import ListServiceByController from '../controllers/ListServiceByController';
import VerifyCompanyEmailController from '../controllers/VerifyCompanyEmailController';

const companyRouter = Router();
const companyController = new CompanyController();
const companyServicesController = new CompanyServicesController();
const emailVerificationController = new VerifyCompanyEmailController();
const listServiceByController = new ListServiceByController();

companyRouter.post('/', companyController.create);
companyRouter.post('/', companyController.create);
companyRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    CEP: Joi.string(),
    phone: Joi.string(),
    fantasyName: Joi.string(),
    documentNumber: Joi.string(),
    bio: Joi.string().allow(''),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  },
}), ensureAuthenticated, companyController.update);

companyRouter.get('/services', ensureAuthenticated, companyServicesController.index);
companyRouter.post('/email-verification', emailVerificationController.update);

companyRouter.get('/services-category', ensureAuthenticated, listServiceByController.index);

export default companyRouter;
