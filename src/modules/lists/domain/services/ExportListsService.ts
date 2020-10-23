import ISuppliersRepository from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IExcelDTO from '@modules/lists/providers/ExcelProvider/dtos/IExcelDTO';
import IExcelProvider from '@modules/lists/providers/ExcelProvider/models/IExcelProvider';
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

    @inject('ExcelProvider')
    private excelProvider: IExcelProvider,

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
    const fileData = list.materials_lists.map<IExcelDTO>(material_list => {
      return {
        desc: material_list.material.description,
        quant: material_list.material.quantity,
        price: '',
        email,
      };
    });

    const localFile = await this.excelProvider.createFile(fileData);

    const file = await this.storageProvider.saveFile(localFile);

    await this.excelProvider.deleteFile(localFile);

    return file;
  }
}

export default ExportListsService;
