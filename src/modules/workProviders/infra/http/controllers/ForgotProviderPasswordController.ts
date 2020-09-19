import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotProviderPasswordEmail from '@modules/workProviders/services/SendForgotProviderPasswordEmail';

class ForgotProviderPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordService = container.resolve(SendForgotProviderPasswordEmail);

    await sendForgotPasswordService.execute({ email });

    return response.status(204).json();
  }
}

export default ForgotProviderPasswordController;
