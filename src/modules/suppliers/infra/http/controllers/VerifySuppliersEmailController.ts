import { Request, Response } from 'express';
import VerifySupplierEmailService from '@modules/suppliers/domain/services/VerifySupplierEmailService';
import { container } from 'tsyringe';

class VerifySuppliersEmailController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const verifyEmailService = container.resolve(VerifySupplierEmailService);

    await verifyEmailService.execute(token);

    return response.status(200).json();
  }
}

export default VerifySuppliersEmailController;
