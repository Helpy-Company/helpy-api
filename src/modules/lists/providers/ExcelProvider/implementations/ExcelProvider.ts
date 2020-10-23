import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import wbConfig from '@config/wb';
import crypto from 'crypto';
import IExcelDTO from '../dtos/IExcelDTO';
import IExcelProvider from '../models/IExcelProvider';

class ExcelProvider implements IExcelProvider {
  public async createFile(data: IExcelDTO[]): Promise<string> {
    const wb = new ExcelJS.Workbook();
    wb.creator = wbConfig.creator;

    const ws = wb.addWorksheet(
      `${data[0].email}-${crypto.randomBytes(4).toString('hex')}`,
      {
        headerFooter: {
          firstHeader: 'Bem-vindo Helpy',
          firstFooter: 'teste',
        },
      }
    );

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

    let j = 0;
    for (let i = 2; i < data.length + 2; i += 1) {
      ws.insertRow(i, {
        id: j,
        desc: data[j].desc,
        quant: data[j].quant,
        price: data[j].price,
      });
      j += 1;
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
      `${data[0].email}-${crypto.randomBytes(4).toString('hex')}.xlsx`
    );

    await wb.xlsx.writeFile(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    fs.unlinkSync(file);
  }
}

export default ExcelProvider;
