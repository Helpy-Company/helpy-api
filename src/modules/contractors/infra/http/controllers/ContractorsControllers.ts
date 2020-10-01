import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateContractorServices from '@modules/contractors/services/CreateContractorService';
import ListContractorServices from '@modules/contractors/services/ListContractorServices';
import { classToClass } from 'class-transformer';
import DeleteContractorService from '@modules/contractors/services/DeleteContractorService';

class ContractorsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, password, accept_terms } = request.body;

    const createContractor = container.resolve(CreateContractorServices);

    const contractor = await createContractor.execute({
      name,
      email,
      phone,
      password,
      accept_terms,
    });

    return response.json(classToClass(contractor));
  }

  // TODO change this method to another controller UsersServicesControllers.ts

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listServices = container.resolve(ListContractorServices);

    const services = await listServices.execute(id);

    return response.json(services);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteContractor = container.resolve(DeleteContractorService);
    await deleteContractor.execute(id);
    return response.status(200).send();
  }
}

export default ContractorsControllers;
