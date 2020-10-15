import stringify from 'csv-stringify';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import path from 'path';
import ICSVProviderDTO from '../dtos/ICSVProviderDTO';
import ICSVProvider from '../models/ICSVProvider';

class CSVStringifyProvider implements ICSVProvider {
  public async createFile(data: ICSVProviderDTO[]): Promise<string> {
    const file = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'tmp',
      `${data[0].email}-${uuid()}.csv`
    );

    const writeStream = fs.createWriteStream(file);

    const parsedData = data.map(d => {
      return {
        DESCRICAO: d.desc,
        QUANTIDADE: d.quant,
        PRECO: d.price,
      };
    });

    stringify(
      parsedData,
      {
        columns: ['DESCRICAO', 'QUANTIDADE', 'PRECO'],
        header: true,
      },
      (err, output) => {
        writeStream.write(output, 'utf-8');
        writeStream.on('finish', () => {});
        writeStream.end();
      }
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    fs.unlinkSync(file);
  }
}

export default CSVStringifyProvider;
