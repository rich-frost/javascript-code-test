import pino from "pino";

export const initLogger = () => {
  const logger = pino({ level: process.env.PINO_LOG_LEVEL || "info" });

  return logger;
};

export type Logger = ReturnType<typeof initLogger>;
