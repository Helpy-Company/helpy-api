import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotCompanyPasswordEmail from '@modules/companies/services/SendForgotCompanyPasswordEmail';

class ForgotCompanyPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordService = container.resolve(SendForgotCompanyPasswordEmail);

    await sendForgotPasswordService.execute({ email });

    return response.status(204).json();
  }
}

export default ForgotCompanyPasswordController;
