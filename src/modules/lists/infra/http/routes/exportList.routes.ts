import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ExportListController from '../controller/ExportListController';

const exportListsRouter = Router();
const exportListController = new ExportListController();

exportListsRouter.use(ensureAuthenticated);

const upload = multer(uploadConfig.multer);

exportListsRouter.put(
  '/upload',
  upload.single('file-list'),
  async (request, response) => {
    return response.json({ ok: true });
  }
);

exportListsRouter.get('/', exportListController.create);

export default exportListsRouter;
