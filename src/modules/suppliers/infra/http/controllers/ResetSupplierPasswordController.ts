import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetSupplierPasswordService from '@modules/suppliers/domain/services/ResetSupplierPasswordService';

class ResetSuppliersPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetSupplierPasswordService = container.resolve(
      ResetSupplierPasswordService
    );

    await resetSupplierPasswordService.execute({ password, token });

    return response.status(204).json();
  }
}

export default ResetSuppliersPasswordController;
