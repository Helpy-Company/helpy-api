import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderListService from '@modules/workProviders/domain/services/ListProviderListService';
import { classToClass } from 'class-transformer';

class ListProvidersListsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const indexLists = container.resolve(ListProviderListService);

    const lists = await indexLists.execute({
      provider_id,
    });

    return response.json(classToClass({ lists }));
  }
}

export default ListProvidersListsController;
