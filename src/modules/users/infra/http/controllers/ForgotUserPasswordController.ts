import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotUserPasswordEmail from '@modules/users/services/SendForgotUserPasswordEmail';

class ForgotUserPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordService = container.resolve(SendForgotUserPasswordEmail);

    await sendForgotPasswordService.execute({ email });

    return response.status(204).json();
  }
}

export default ForgotUserPasswordController;
