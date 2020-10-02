import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IContractorRepository from '../repositories/IContractorsRepository';

@injectable()
class DeleteContractorService {
  constructor(
    @inject('ContractorsRepository')
    private contractorRepository: IContractorRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const contractor = await this.contractorRepository.findById(id);

    if (!contractor) {
      throw new AppError('Contractor does not exists.');
    }

    await this.contractorRepository.delete(id);
  }
}

export default DeleteContractorService;
