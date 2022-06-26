import ConnectToChannelQueue from '../../queues/ConnectToChannelQueue';

class AddToConnectChannelQueue {
  async call(guildId: string) {
    return await ConnectToChannelQueue.add({ guildId });
  }
}

export default new AddToConnectChannelQueue();
