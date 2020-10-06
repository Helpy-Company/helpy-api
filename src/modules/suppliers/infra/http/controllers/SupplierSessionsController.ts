import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateSupplierService from '@modules/suppliers/domain/services/AuthenticateSupplierService';
import { classToClass } from 'class-transformer';

class SuppliersSessionsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateSupplier = container.resolve(AuthenticateSupplierService);

    const { supplier, token } = await authenticateSupplier.execute({
      email,
      password,
    });

    return response.json(classToClass({ supplier, token }));
  }
}

export default SuppliersSessionsControllers;
