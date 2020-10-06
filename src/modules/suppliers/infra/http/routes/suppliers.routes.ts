import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import SuppliersController from '../controllers/SuppliersController';
import VerifyContractorsEmailController from '../controllers/VerifySuppliersEmailController';

const supplierRouter = Router();
const supplierController = new SuppliersController();
const emailVerificationController = new VerifyContractorsEmailController();

supplierRouter.post('/', supplierController.create);
supplierRouter.delete('/', ensureAuthenticated, supplierController.delete);

supplierRouter.post('/email-verification', emailVerificationController.update);

export default supplierRouter;
