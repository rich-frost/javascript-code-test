import { Response } from "express";
import { Logger } from "../lib/logger";

export type ResponseWithLocals = Response & {
  locals: {
    logger: Logger;
    requestId: string;
  };
};
