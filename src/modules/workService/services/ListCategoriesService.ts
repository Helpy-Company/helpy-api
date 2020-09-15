import { inject, injectable } from 'tsyringe';
import ServiceCategory from '../infra/typeorm/entities/ServiceCategory';
import ICategoryRepository from '../repositories/ICategoryRepository';

@injectable()
class ListCategoriesService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) { }

  public async execute(): Promise<ServiceCategory[]> {
    const categories = await this.categoryRepository.index();

    return categories;
  }
}

export default ListCategoriesService;
