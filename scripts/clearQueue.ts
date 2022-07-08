import 'dotenv/config';
import * as redis from 'redis';
import { promisify } from 'util';

async function clearQueue() {
  const REDIS_HOST = process.env.REDIS_HOST;
  const REDIS_PORT = process.env.REDIS_PORT;
  const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

  if (!REDIS_HOST || !REDIS_PASSWORD || !REDIS_PORT) return;

  const options = {
    // host: REDIS_HOST,
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    // port: REDIS_PORT,
    password: REDIS_PASSWORD,
  };

  const client = redis.createClient(options);
  await client.connect();

  await client
    .flushAll()
    .then(() => console.log('Queue cleaned'))
    .catch((error: any) => console.error(error));
}

clearQueue();
