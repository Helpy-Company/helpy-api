import { Request, Response } from 'express';
import VerifyContractorEmailService from '@modules/contractors/services/VerifyContractorEmailService';
import { container } from 'tsyringe';

class VerifyContractorsEmailController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const verifyEmailService = container.resolve(VerifyContractorEmailService);

    await verifyEmailService.execute(token);

    return response.status(200).json();
  }
}

export default VerifyContractorsEmailController;
