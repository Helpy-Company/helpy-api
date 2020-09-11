import './MailTemplateProvider';
import './MailProvider';
import './CacheProvider';
import './QueueProvider';

import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider,
);
