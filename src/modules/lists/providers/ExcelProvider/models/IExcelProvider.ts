import IExcelDTO from '../dtos/IExcelDTO';

export default interface IExcelProvider {
  createFile(data: IExcelDTO[]): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
