import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractorsControllers from '../controllers/ContractorsControllers';
import VerifyContractorsEmailController from '../controllers/VerifyContractorsEmailController';

const contractorRouter = Router();
const contractorController = new ContractorsControllers();
const emailVerificationController = new VerifyContractorsEmailController();

contractorRouter.post('/', contractorController.create);
contractorRouter.get('/services/me', ensureAuthenticated, contractorController.index);
contractorRouter.post('/email-verification', emailVerificationController.update);

export default contractorRouter;
