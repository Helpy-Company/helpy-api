import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import ServiceCategory from '../../infra/typeorm/entities/ServiceCategory';
import ICategoryRepository from '../repositories/ICategoryRepository';

@injectable()
class ListCategoriesService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(): Promise<ServiceCategory[]> {
    let categories = await this.cacheProvider.recover<ServiceCategory[]>(
      `categories-list:no-auth`
    );

    if (!categories) {
      categories = await this.categoryRepository.index();
      await this.cacheProvider.save({
        key: `categories-list:no-auth`,
        value: categories,
      });
    }

    return categories;
  }
}

export default ListCategoriesService;
