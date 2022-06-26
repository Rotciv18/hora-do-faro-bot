import { Job } from 'bull';

export default interface IConnectToChannelQueue extends Job {
  data: {
    guildId: string;
  };
}
