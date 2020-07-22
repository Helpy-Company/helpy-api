import Router from 'express';
import UsersSessionsController from '../controllers/UsersSessionsController';
import CompaniesSessionsController from '../controllers/CompaniesSessionsController';

const sessionRouter = Router();
const usersSessionsController = new UsersSessionsController();
const companiesSessionsController = new CompaniesSessionsController();

sessionRouter.post('/users', usersSessionsController.create);
sessionRouter.post('/companies', companiesSessionsController.create);

export default sessionRouter;
