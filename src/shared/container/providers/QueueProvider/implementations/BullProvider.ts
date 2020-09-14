import Bull, { Queue, ProcessPromiseFunction } from 'bull';
import mailConfig from '@config/mail';
import IQueueProvider from '../models/IQueueProvider';

class BullProvider implements IQueueProvider {
  private queue: Queue;

  async add(data: object | object[]): Promise<void> {
    this.queue = new Bull('mail-queue', {
      ...mailConfig.queue,
      redis: {
        host: String(process.env.REDIS_HOST),
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASS,
        db: 2,
      },
    });
    if (Array.isArray(data)) {
      const parsedJobs = data.map((jobData) => ({ data: jobData }));

      await this.queue.addBulk(parsedJobs);

      return;
    }

    await this.queue.add(data);
    this.queue.clean(0, 'completed');
  }

  process(processFunction: ProcessPromiseFunction<object>): void {
    this.queue.process(150, processFunction);
  }
}

export default BullProvider;
