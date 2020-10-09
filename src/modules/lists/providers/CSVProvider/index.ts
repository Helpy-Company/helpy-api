import { container } from 'tsyringe';
import CSVStringifyProvider from './implementations/CSVStringifyProvider';
import ICSVProvider from './models/ICSVProvider';

const provider = {
  csv: container.resolve(CSVStringifyProvider),
};

container.registerInstance<ICSVProvider>('CSVStringifyProvider', provider.csv);
