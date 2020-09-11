import { QueueOptions } from 'bull';

interface IMailConfig {
  driver: 'ethereal' | 'ses';
  default: {
    from: {
      email: string;
      name: string;
    };
  };

  queue: QueueOptions;
}

export default {
  driver: String(process.env.MAIL_DRIVER) || 'ethereal',

  queue: {
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    },
    limiter: {
      max: 150,
      duration: 1000,
    },
  },

  default: {
    from: {
      email: 'team@helpy.com.br',
      name: 'Equipe Helpy',
    },
  },
} as IMailConfig;
