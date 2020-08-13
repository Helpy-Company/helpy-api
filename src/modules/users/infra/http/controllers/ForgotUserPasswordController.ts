import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmail from '@shared/services/SendForgotPasswordEmail';

class ForgotUserPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordService = new SendForgotPasswordEmail();

    await sendForgotPasswordService.execute({ email });

    return response.status(204).json();
  }
}

export default ForgotUserPasswordController;
