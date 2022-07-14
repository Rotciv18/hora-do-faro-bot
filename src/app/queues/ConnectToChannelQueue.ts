import Queue from 'bull';

export default new Queue('ConnectToChannelQueue', {
  redis: {
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
  },
  settings: {
    lockDuration: 12000000,
    lockRenewTime: 600000,
    maxStalledCount: 0,
  },
});
