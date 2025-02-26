import { NextFunction, Request } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { ResponseWithLocals } from "../types/express";
import { responseService } from "./responseService";

export const createValidateRequest = () => {
  return (validations: ValidationChain[]) =>
    async (
      req: Request,
      res: ResponseWithLocals,
      next: NextFunction,
    ): Promise<any> => {
      const logger = res.locals.logger;
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      logger.warn({
        message: `Failed request validation on ${req.path}`,
        errors: errors.array(),
      });

      return responseService.badRequest(res);
    };
};

export const validateRequest = createValidateRequest();
