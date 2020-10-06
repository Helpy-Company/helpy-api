import { getRepository, Repository } from 'typeorm';

import ISuppliersRepository from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import ICreateSuppliersDTO from '@modules/suppliers/domain/dtos/ICreateSuppliersDTO';

import Supplier from '../entities/Supplier';

class SuppliersRepository implements ISuppliersRepository {
  private ormRepository: Repository<Supplier>;

  constructor() {
    this.ormRepository = getRepository(Supplier);
  }

  public async findById(id: string): Promise<Supplier | undefined> {
    const supplier = await this.ormRepository.findOne(id);

    return supplier;
  }

  public async findByEmail(email: string): Promise<Supplier | undefined> {
    const supplier = await this.ormRepository.findOne({ where: { email } });

    return supplier;
  }

  public async create({
    fantasyName,
    email,
    password,
    CEP,
    documentNumber,
    phone,
    accept_terms,
  }: ICreateSuppliersDTO): Promise<Supplier> {
    const supplier = this.ormRepository.create({
      fantasyName,
      email,
      password,
      CEP,
      documentNumber,
      phone,
      accept_terms,
    });
    await this.ormRepository.save(supplier);

    return supplier;
  }

  public async save(supplier: Supplier): Promise<Supplier> {
    return this.ormRepository.save(supplier);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByDocumentNumber(
    documentNumber: string
  ): Promise<Supplier | undefined> {
    const supplier = await this.ormRepository.findOne({
      where: { documentNumber },
    });

    return supplier;
  }
}

export default SuppliersRepository;
