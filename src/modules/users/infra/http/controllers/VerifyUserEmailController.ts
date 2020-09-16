import { Request, Response } from 'express';
import VerifyUserEmailService from '@modules/users/services/VerifyUserEmailService';
import { container } from 'tsyringe';

class VerifyUserEmailController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const verifyEmailService = container.resolve(VerifyUserEmailService);

    await verifyEmailService.execute(token);

    return response.status(200).json();
  }
}

export default VerifyUserEmailController;
