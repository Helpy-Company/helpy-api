import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetCompanyPassword from '@modules/companies/services/ResetCompanyPasswordService';

class ResetCompanyPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetCompanyPasswordService = container.resolve(ResetCompanyPassword);

    await resetCompanyPasswordService.execute({ password, token });

    return response.status(204).json();
  }
}

export default ResetCompanyPasswordController;
