import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListListsService from '@modules/lists/domain/services/ListListsService';
import CreateListsService from '@modules/lists/domain/services/CreateListsService';
import { classToClass } from 'class-transformer';

class ListsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, materials_lists } = request.body;
    const provider_id = request.user.id;

    const createLists = container.resolve(CreateListsService);

    const list = await createLists.execute({
      title,
      description,
      materials_lists,
      provider_id,
    });

    return response.json(list);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const indexLists = container.resolve(ListListsService);

    const list = await indexLists.execute({
      provider_id,
    });

    return response.json(classToClass(list));
  }
}

export default ListsController;
