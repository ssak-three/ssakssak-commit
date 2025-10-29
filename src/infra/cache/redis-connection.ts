import Redis from "ioredis";
import { logger } from "@/lib/logger";
import { AppError } from "@/errors";

declare global {
  var __redis: Redis | undefined;
  var __redisSub: Redis | undefined;
}

const getUrl = (): string => {
  const url = process.env.REDIS_URL;
  if (!url) {
    logger.fatal("ENV REDIS_URL is missing");
    throw new AppError({
      status: 500,
      message: "ENV REDIS_URL is missing",
    });
  }
  return url;
};

const getRedisClient = (): Redis => {
  if (!globalThis.__redis) {
    const redisClient = new Redis(getUrl(), {
      maxRetriesPerRequest: 1,
      commandTimeout: 5000,
    });
    redisClient.on("connect", () => {
      logger.info("Redis 연결 성공");
    });

    redisClient.on("error", (err) => {
      logger.fatal(`Redis 연결 오류: ${err.message}`);
    });

    globalThis.__redis = redisClient;
  }

  return globalThis.__redis;
};

const getRedisSubscriber = (): Redis => {
  if (!globalThis.__redisSub) {
    const sub = new Redis(getUrl(), {
      maxRetriesPerRequest: null,
    });
    sub.on("error", (error) =>
      logger.fatal(`Redis(Sub) 오류: ${error.message}`),
    );
    globalThis.__redisSub = sub;
  }
  return globalThis.__redisSub;
};

export { getRedisClient, getRedisSubscriber };
