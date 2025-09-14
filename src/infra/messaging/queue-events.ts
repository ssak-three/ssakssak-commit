import { QueueEvents } from "bullmq";
import { getRedisSubscriber } from "../cache/redis-connection";

const createQueueEvents = (queueName: string) => {
  const connection = getRedisSubscriber();
  return new QueueEvents(queueName, { connection });
};

export default createQueueEvents;
