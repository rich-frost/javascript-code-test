import { Request } from "express";
import { responseService } from "../lib/responseService";
import { ResponseWithLocals } from "../types/express";

export const healthcheckHandler = (req: Request, res: ResponseWithLocals) => {
  responseService.ok(res, {
    message: `Healthcheck good`,
  });
};
