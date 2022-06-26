import Queue from 'bull';

export default new Queue('ConnectToChannelQueue', {
  redis: {
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
  },
});
