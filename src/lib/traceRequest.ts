import { NextFunction, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { initLogger } from "./logger";

export const traceRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logger = initLogger();
  const requestId = uuidV4();

  logger.trace({
    message: `START OF REQUEST: ${requestId}`,
  });

  res.locals.logger = logger;
  res.locals.requestId = requestId;

  next();
};
