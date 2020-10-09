import ICSVProviderDTO from '../dtos/ICSVProviderDTO';

export default interface ICSVProvider {
  createFile(data: ICSVProviderDTO[]): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
