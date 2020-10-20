import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ExportListController from '../controller/ExportListController';

const exportListsRouter = Router();
const exportListController = new ExportListController();

const upload = multer(uploadConfig.multer);

exportListsRouter.put(
  '/upload',
  upload.single('file-list'),
  async (request, response) => {
    return response.json({ ok: true });
  }
);

exportListsRouter.post('/', exportListController.create);

export default exportListsRouter;
