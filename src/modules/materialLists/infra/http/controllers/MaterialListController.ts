import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateMaterialListService from '@modules/materialLists/domain/services/CreateMaterialListService';

class MaterialListsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { materials } = request.body;
    const provider_id = request.user.id;

    const createMaterialList = container.resolve(CreateMaterialListService);
    const materailLists = await createMaterialList.execute({
      provider_id,
      materials,
    });

    return response.json(materailLists);
  }
}

export default MaterialListsController;
