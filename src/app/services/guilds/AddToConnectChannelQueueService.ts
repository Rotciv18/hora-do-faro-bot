import { JobOptions } from 'bull';
import ConnectToChannelQueue from '../../queues/ConnectToChannelQueue';

class AddToConnectChannelQueue {
  async call(guildId: string) {
    const queueOptions: JobOptions = {
      repeat: {
        every: 1000,
      },
    };

    await ConnectToChannelQueue.add({ guildId }, queueOptions);
  }
}

export default new AddToConnectChannelQueue();
