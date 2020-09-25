import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateProviderProfileService from '@modules/workProviders/services/UpdateProviderProfileService';
import CreateProviderService from '../../../services/CreateProviderService';

class ProviderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      fantasyName,
      email,
      password,
      CEP,
      documentNumber,
      phone,
    } = request.body;

    const createProvider = container.resolve(CreateProviderService);

    const provider = await createProvider.execute({
      name,
      fantasyName,
      CEP,
      email,
      password,
      documentNumber,
      phone,
    });

    return response.json(classToClass(provider));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const {
      name,
      fantasyName,
      email,
      password,
      CEP,
      documentNumber,
      old_password,
      phone,
      bio,
      service_categories,
    } = request.body;

    const updateProfile = container.resolve(UpdateProviderProfileService);

    const provider = await updateProfile.execute({
      provider_id,
      name,
      fantasyName,
      email,
      password,
      CEP,
      old_password,
      documentNumber,
      phone,
      bio,
      service_categories,
    });

    return response.json(classToClass(provider));
  }
}

export default ProviderController;
