import "server-only";
import { Queue } from "bullmq";
import { getRedisClient } from "../cache/redis-connection";

const connection = getRedisClient();
const reportCreationQueue = new Queue("reportCreation", { connection });

const addJobs = async (data: unknown) => {
  return await reportCreationQueue.add("createReportJob", data, {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: {
      age: 3600,
      count: 1000,
    },
    removeOnFail: {
      age: 24 * 3600,
    },
  });
};

export { addJobs };
