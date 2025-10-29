import { JobsOptions, Queue } from "bullmq";
import { getRedisSubscriber } from "../cache/redis-connection";

const connection = getRedisSubscriber();

type QueueCreationParams = {
  queueName: string;
  jobName: string;
  options: JobsOptions;
};

const createQueue = <T>({
  queueName,
  jobName,
  options,
}: QueueCreationParams) => {
  const queue = new Queue(queueName, { connection });

  const addJob = async (data: T) => {
    return await queue.add(jobName, data, {
      ...options,
    });
  };

  return { queue, addJob };
};

export default createQueue;
