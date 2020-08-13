import { container } from 'tsyringe';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider,
);
