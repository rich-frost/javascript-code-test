import { body, validationResult } from "express-validator";

import { SEARCH_TYPES } from "../constants/searchParameters";
import { ResponseWithLocals } from "../types/express";
import { NextFunction } from "express";

export const validateSearchRequest = [body("type").isIn(SEARCH_TYPES)];

// Error handling middleware
export const searchValidationHandler = async (
  req: Request,
  res: ResponseWithLocals,
  next: NextFunction,
): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
