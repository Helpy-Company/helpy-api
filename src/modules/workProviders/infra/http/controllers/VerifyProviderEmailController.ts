import { Request, Response } from 'express';
import VerifyProviderEmailService from '@modules/workProviders/domain/services/VerifyProviderEmailService';
import { container } from 'tsyringe';

class VerifyProviderEmailController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const verifyEmailService = container.resolve(VerifyProviderEmailService);

    await verifyEmailService.execute(token);

    return response.status(200).json();
  }
}

export default VerifyProviderEmailController;
