import AudioPlayerQueue from '../../../queues/AudioPlayerQueue';
import IConnectToChannelQueue from '../../../interfaces/IConnectToChannelQueue';

class RemoveByGuildId {
  async call(guildId: string) {
    const queues = await AudioPlayerQueue.getDelayed();

    try {
      queues.forEach(async (queue: IConnectToChannelQueue) => {
        if (queue.data.guildId === guildId) {
          await queue.remove();
          throw new Error('Found and removed the queue. Leaving the loop.');
        }
      });
    } catch (e) {
      // does nothing
    }
  }
}

export default new RemoveByGuildId();
