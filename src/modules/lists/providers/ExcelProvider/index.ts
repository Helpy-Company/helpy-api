import { container } from 'tsyringe';
import ExcelProvider from './implementations/ExcelProvider';
import IExcelProvider from './models/IExcelProvider';

const provider = {
  csv: container.resolve(ExcelProvider),
};

container.registerInstance<IExcelProvider>('ExcelProvider', provider.csv);
