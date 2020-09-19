import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotContractorPasswordEmail from '@modules/contractors/services/SendForgotContractorPasswordEmail';

class ForgotContractorsPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordService = container.resolve(SendForgotContractorPasswordEmail);

    await sendForgotPasswordService.execute({ email });

    return response.status(204).json();
  }
}

export default ForgotContractorsPasswordController;
