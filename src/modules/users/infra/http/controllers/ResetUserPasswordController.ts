import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetUserPasswordService from '@modules/users/services/ResetUserPasswordService';

class ResetUserPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetUserPasswordService = container.resolve(ResetUserPasswordService);

    await resetUserPasswordService.execute({ password, token });

    return response.status(204).json();
  }
}

export default ResetUserPasswordController;
