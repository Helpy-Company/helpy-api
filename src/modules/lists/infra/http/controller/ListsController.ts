import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListListsService from '@modules/lists/domain/services/ListListsService';
import CreateListsService from '@modules/lists/domain/services/CreateListsService';
import DeleteListsService from '@modules/lists/domain/services/DeleteListsService';
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
    const indexLists = container.resolve(ListListsService);

    const lists = await indexLists.execute();

    return response.json(classToClass({ lists }));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { list_id } = request.params;
    const provider_id = request.user.id;

    const deleteList = container.resolve(DeleteListsService);

    await deleteList.execute({ provider_id, list_id });

    return response.status(200).send();
  }
}

export default ListsController;
