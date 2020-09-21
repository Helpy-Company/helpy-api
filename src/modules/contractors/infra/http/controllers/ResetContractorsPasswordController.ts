import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetContractorPasswordService from '@modules/contractors/services/ResetContractorPasswordService';

class ResetContractorsPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetContractorPasswordService = container.resolve(
      ResetContractorPasswordService
    );

    await resetContractorPasswordService.execute({ password, token });

    return response.status(204).json();
  }
}

export default ResetContractorsPasswordController;
