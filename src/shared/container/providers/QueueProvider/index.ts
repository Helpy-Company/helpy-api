import { container } from 'tsyringe';
import BullProvider from './implementations/BullProvider';
import IQueueProvider from './models/IQueueProvider';

container.registerInstance<IQueueProvider>('QueueProvider', new BullProvider());
