import Router from 'express';
import UsersSessionsController from '@modules/users/infra/http/controllers/UsersSessionsController';
import CompaniesSessionsController from '@modules/companies/infra/http/controllers/CompaniesSessionsController';

const sessionRouter = Router();
const usersSessionsController = new UsersSessionsController();
const companiesSessionsController = new CompaniesSessionsController();

sessionRouter.post('/users', usersSessionsController.create);
sessionRouter.post('/companies', companiesSessionsController.create);

export default sessionRouter;
