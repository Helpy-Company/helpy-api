import { getRepository, Repository } from 'typeorm';

import ISupplierTokensRepository from '@modules/suppliers/domain/repositories/ISuppliersTokensRepository';

import SupplierToken from '../entities/SupplierToken';

class SuppliersTokensRepository implements ISupplierTokensRepository {
  private ormRepository: Repository<SupplierToken>;

  constructor() {
    this.ormRepository = getRepository(SupplierToken);
  }

  public async generate(supplier_id: string): Promise<SupplierToken> {
    const supplierToken = this.ormRepository.create({ supplier_id });

    await this.ormRepository.save(supplierToken);

    return supplierToken;
  }

  public async findByToken(token: string): Promise<SupplierToken | undefined> {
    const supplierToken = await this.ormRepository.findOne({
      where: { token },
    });

    return supplierToken;
  }
}

export default SuppliersTokensRepository;
