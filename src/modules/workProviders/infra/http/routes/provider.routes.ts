import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ProviderController from '../controllers/ProviderController';
import ProvidersServicesController from '../controllers/ProvidersServicesController';
import ListServiceByController from '../controllers/ListServiceByController';
import VerifyProviderEmailController from '../controllers/VerifyProviderEmailController';
import ListProvidersListsController from '../controllers/ListProvidersListsController';

const providerRouter = Router();
const providerController = new ProviderController();
const providerServicesController = new ProvidersServicesController();
const emailVerificationController = new VerifyProviderEmailController();
const listServiceByController = new ListServiceByController();
const listProvidersListsController = new ListProvidersListsController();

// const upload = multer(uploadConfig);

providerRouter.post('/', providerController.create);
providerRouter.post('/', providerController.create);
providerRouter.put(
  '/',
  celebrate({
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
      service_categories: Joi.array(),
    },
  }),
  ensureAuthenticated,
  providerController.update
);

providerRouter.get(
  '/lists-me',
  ensureAuthenticated,
  listProvidersListsController.index
);

providerRouter.get(
  '/services',
  ensureAuthenticated,
  providerServicesController.index
);
providerRouter.post('/email-verification', emailVerificationController.update);

providerRouter.get(
  '/services-category',
  ensureAuthenticated,
  listServiceByController.index
);

providerRouter.delete('/', ensureAuthenticated, providerController.delete);

export default providerRouter;
