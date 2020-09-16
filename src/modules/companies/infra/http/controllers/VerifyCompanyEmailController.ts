import { Request, Response } from 'express';
import VerifyCompanyEmailService from '@modules/companies/services/VerifyCompanyEmailService';
import { container } from 'tsyringe';

class VerifyCompanyEmailController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const verifyEmailService = container.resolve(VerifyCompanyEmailService);

    await verifyEmailService.execute(token);

    return response.status(200).json();
  }
}

export default VerifyCompanyEmailController;
