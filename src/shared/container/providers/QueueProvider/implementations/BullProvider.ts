import Bull, { Queue, QueueOptions, ProcessPromiseFunction } from 'bull';

import IQueueProvider from '../models/IQueueProvider';

class BullProvider implements IQueueProvider {
  private queue: Queue;

  constructor(queueConfig: QueueOptions) {
    this.queue = new Bull('mail-queue', queueConfig);
  }

  async add(data: object | object[]): Promise<void> {
    if (Array.isArray(data)) {
      const parsedJobs = data.map((jobData) => ({ data: jobData }));
      await this.queue.addBulk(parsedJobs);

      return;
    }

    await this.queue.add(data);
  }

  process(processFunction: ProcessPromiseFunction<object>): void {
    this.queue.process(150, processFunction);
  }
}

export default BullProvider;

// import Queue, { Queue as IQueue, QueueOptions } from 'bull';

// import * as jobs from '../jobs';

// const queues = Object.values(jobs).map((job) => ({
//   bull: new Queue('sendEmails', {
//     redis: {
//       host: String(process.env.REDIS_HOST),
//       port: Number(process.env.REDIS_PORT),
//       password: String(process.env.REDIS_PASS),
//     },
//   }),
//   name: job.key,
//   handle: job.handle,
// }));

// export default {
//   queues,
//   add(name: string, data: string[]): IQueue<string[]> {
//     const queue = this.queues.find((queueInside) => queueInside.name === name);

//     return queue.bull.add(data);
//   },
//   process(): void {
//     return this.queues.forEach((queue) => {
//       queue.bull.process(queue.handle);
//     });
//   },
// };
