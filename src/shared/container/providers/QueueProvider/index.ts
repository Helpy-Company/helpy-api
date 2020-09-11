import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import BullProvider from './implementations/BullProvider';
import IQueueProvider from './models/IQueueProvider';

container.registerInstance<IQueueProvider>(
  'QueueProvider',
  new BullProvider({
    ...mailConfig.queue,
    redis: {
      host: String(process.env.REDIS_HOST),
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS,
      db: 2,

    },
  }),
);
