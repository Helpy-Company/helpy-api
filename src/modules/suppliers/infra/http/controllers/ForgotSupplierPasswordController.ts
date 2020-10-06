import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotSupplierPasswordEmailService from '@modules/suppliers/domain/services/SendForgotSupplierPasswordEmailService';

class ForgotSuppliersPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordService = container.resolve(
      SendForgotSupplierPasswordEmailService
    );

    await sendForgotPasswordService.execute({ email });

    return response.status(204).json();
  }
}

export default ForgotSuppliersPasswordController;
