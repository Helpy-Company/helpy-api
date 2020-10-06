import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotContractorPasswordEmailService from '@modules/contractors/domain/services/SendForgotContractorPasswordEmailService';

class ForgotContractorsPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordService = container.resolve(
      SendForgotContractorPasswordEmailService
    );

    await sendForgotPasswordService.execute({ email });

    return response.status(204).json();
  }
}

export default ForgotContractorsPasswordController;
