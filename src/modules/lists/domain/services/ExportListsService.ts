import ISuppliersRepository from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICSVProviderDTO from '@modules/lists/providers/CSVProvider/dtos/ICSVProviderDTO';
import ICSVProvider from '@modules/lists/providers/CSVProvider/models/ICSVProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IListsRepository from '../repositories/IListsRepository';

interface IRequestDTO {
  list_id: string;
}

@injectable()
class ExportListsService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('ListsRepository')
    private listsRepository: IListsRepository,

    @inject('CSVStringifyProvider')
    private csvStringifyProvider: ICSVProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ list_id }: IRequestDTO): Promise<string> {
    const list = await this.listsRepository.findById(list_id);

    if (!list) {
      throw new AppError('List does not exists');
    }

    const { email } = list.provider;

    // montaro objeto com para fazer o file.csv
    const fileData = list.materials_lists.map<ICSVProviderDTO>(
      material_list => {
        return {
          desc: material_list.material.description,
          quant: material_list.material.quantity,
          price: '',
          email,
        };
      }
    );

    const localFile = await this.csvStringifyProvider.createFile(fileData);

    const file = await this.storageProvider.saveFile(localFile);

    // await this.csvStringifyProvider.deleteFile(localFile);

    return file;
  }
}

export default ExportListsService;
