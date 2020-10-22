import fs from 'fs';
import { v4 as uuid } from 'uuid';
import path from 'path';
import ExcelJS from 'exceljs';
import wbConfig from '@config/wb';
import ICSVProviderDTO from '../dtos/ICSVProviderDTO';
import ICSVProvider from '../models/ICSVProvider';

class CSVStringifyProvider implements ICSVProvider {
  public async createFile(data: ICSVProviderDTO[]): Promise<string> {
    const wb = new ExcelJS.Workbook();
    wb.creator = wbConfig.creator;

    const ws = wb.addWorksheet(`${data[0].email}-${uuid()}`, {
      headerFooter: {
        firstHeader: 'Bem-vindo Helpy',
        firstFooter: 'teste',
      },
    });

    ws.columns = [
      {
        header: 'Descrição',
        key: 'desc',
        width: 20,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
          border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          },
        },
      },
      {
        header: 'Quantidade',
        key: 'quant',
        width: 20,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
          border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          },
        },
      },
      {
        header: 'Preço',
        key: 'price',
        width: 20,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
          border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          },
          numFmt: '"R$"#,##0.00;[Red]-"R$"#,##0.00',
        },
      },
    ];

    ws.getCell('A1').style.alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    ws.getCell('A1').style.font = {
      size: 16,
      bold: true,
      color: { argb: '04d361' },
    };
    ws.getCell('A1').style.fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: '542ea6' },
      bgColor: { argb: '542ea6' },
    };

    ws.getCell('B1').style.alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    ws.getCell('B1').style.font = {
      size: 16,
      bold: true,
      color: { argb: '04d361' },
    };
    ws.getCell('B1').style.fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: '542ea6' },
      bgColor: { argb: '542ea6' },
    };

    ws.getCell('C1').style.alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    ws.getCell('C1').style.font = {
      size: 16,
      bold: true,
      color: { argb: '04d361' },
    };
    ws.getCell('C1').style.fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: '542ea6' },
      bgColor: { argb: '542ea6' },
    };

    for (let i = 2; i < data.length; i += 1) {
      ws.insertRow(i, {
        id: i,
        desc: data[i].desc,
        quant: data[i].quant,
        price: data[i].price,
      });
    }

    const file = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'tmp',
      `${data[0].email}-${uuid()}.xls`
    );

    await wb.xlsx.writeFile(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    fs.unlinkSync(file);
  }
}

export default CSVStringifyProvider;
