import AudioPlayerQueue from '../queues/AudioPlayerQueue';
import ConnectToChannelQueue from '../queues/ConnectToChannelQueue';
import RemoveCompletedQueue from '../queues/RemoveCompletedQueue';

export default async () => {
  const completedAudioPlayerQueues = await AudioPlayerQueue.getCompleted();
  const completedConnectToChannelQueues =
    await ConnectToChannelQueue.getCompleted();
  const completedRemoveCompletedQueues =
    await RemoveCompletedQueue.getCompleted();

  const promises1 = completedAudioPlayerQueues.map((q) => q.remove());
  const promises2 = completedConnectToChannelQueues.map((q) => q.remove());
  const promises3 = completedRemoveCompletedQueues.map((q) => q.remove());

  await Promise.all(promises1.concat(promises2.concat(promises3)));

  RemoveCompletedQueue.add({}, { delay: 1800000 });
};
