import { DoneCallback, Job } from 'bull';
import AudioPlayerQueue from '../queues/AudioPlayerQueue';
import ConnectToChannelQueue from '../queues/ConnectToChannelQueue';
import RemoveCompletedQueue from '../queues/RemoveCompletedQueue';

export default async (job: Job, done: DoneCallback) => {
  const completedAudioPlayerQueues = await AudioPlayerQueue.getCompleted();
  const completedConnectToChannelQueues =
    await ConnectToChannelQueue.getCompleted();
  const completedRemoveCompletedQueues =
    await RemoveCompletedQueue.getCompleted();

  const promises1 = completedAudioPlayerQueues.map(
    async (q) => await q.remove()
  );
  const promises2 = completedConnectToChannelQueues.map(
    async (q) => await q.remove()
  );
  const promises3 = completedRemoveCompletedQueues.map(
    async (q) => await q.remove()
  );

  await Promise.all(promises1.concat(promises2.concat(promises3)));

  await RemoveCompletedQueue.add({}, { delay: 60000 });
  done();
};
