import { v4 as uuid } from 'uuid';
import Contractor from '@modules/contractors/infra/typeorm/entities/Contractor';
import IContractorRepository from '../IContractorsRepository';
import ICreateContractorsDTO from '../../dtos/ICreateContractorsDTO';

class FakeContractorsRepository implements IContractorRepository {
  private contractors: Contractor[] = [];

  public async findByEmail(email: string): Promise<Contractor | undefined> {
    const findContractor = this.contractors.find(
      contractor => contractor.email === email
    );

    return findContractor;
  }

  public async findById(id: string): Promise<Contractor | undefined> {
    const findContractor = this.contractors.find(
      contractor => contractor.id === id
    );

    return findContractor;
  }

  public async create(
    contractorData: ICreateContractorsDTO
  ): Promise<Contractor> {
    const contractor = new Contractor();

    Object.assign(contractor, { id: uuid() }, contractorData);

    this.contractors.push(contractor);

    return contractor;
  }

  public async save(contractor: Contractor): Promise<Contractor> {
    const findIndex = this.contractors.findIndex(
      findContractor => findContractor.id === contractor.id
    );

    this.contractors[findIndex] = contractor;

    return contractor;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.contractors.findIndex(
      findContractor => findContractor.id === id
    );

    this.contractors.splice(0, findIndex);
  }
}

export default FakeContractorsRepository;
