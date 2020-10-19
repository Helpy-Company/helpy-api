import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ExportListService from '@modules/lists/domain/services/ExportListsService';
import uploadConfig from '@config/upload';

class ExportListController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { list_id } = request.body;
    const supplier_id = request.user.id;

    const exportList = container.resolve(ExportListService);

    const file = await exportList.execute({
      list_id,
      supplier_id,
    });

    if (uploadConfig.driver === 's3') {
      return response.json({
        download_file_link: `https://app-helpy.s3.us-east-2.amazonaws.com/${file}`,
      });
    }

    return response.json({
      download_file_link: file,
    });
  }
}

export default ExportListController;
