import { Request } from "express";
import { responseService } from "../lib/responseService";
import { ResponseWithLocals } from "../types/express";

export const searchHandler = (req: Request, res: ResponseWithLocals) => {
  responseService.ok(res, {
    message: `Search endpoint good`,
  });
};
