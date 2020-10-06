import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetProviderPasswordService from '@modules/workProviders/domain/services/ResetProviderPasswordService';

class ResetProviderPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetProviderPasswordService = container.resolve(
      ResetProviderPasswordService
    );

    await resetProviderPasswordService.execute({ password, token });

    return response.status(204).json();
  }
}

export default ResetProviderPasswordController;
