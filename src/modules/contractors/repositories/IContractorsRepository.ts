import Contractor from '../infra/typeorm/entities/Contractor';
import ICreateContractorsDTO from '../dtos/ICreateContractorsDTO';

export default interface IContractorsRepository {
  findById(id: string): Promise<Contractor | undefined>;
  findByEmail(id: string): Promise<Contractor | undefined>;
  create(data: ICreateContractorsDTO): Promise<Contractor>;
  save(contractors: Contractor): Promise<Contractor>;

}
