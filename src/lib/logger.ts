import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";
const isWorker = process.env.WORKER === "1";

let logger: pino.Logger;

if (isProduction || isWorker) {
  logger = pino({
    level: isProduction ? "info" : "debug",
    base: undefined,
  });
} else {
  const pretty = await import("pino-pretty");
  const stream = pretty.default({
    colorize: true,
    translateTime: "SYS:standard",
    ignore: "pid,hostname",
    singleLine: false,
  });

  logger = pino(
    {
      level: "debug",
      base: undefined,
    },
    stream,
  );
}

export { logger };
