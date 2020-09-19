import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateContractorService from '@modules/contractors/services/AuthenticateContractorService';
import { classToClass } from 'class-transformer';

class ContractorsSessionsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateContractor = container.resolve(AuthenticateContractorService);

    const { contractor, token } = await authenticateContractor.execute({ email, password });

    return response.json(classToClass({ contractor, token }));
  }
}

export default ContractorsSessionsControllers;
