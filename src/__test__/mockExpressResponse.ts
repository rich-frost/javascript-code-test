import { vitest } from "vitest";
import { getMockRes } from "vitest-mock-express";
import { ResponseWithLocals } from "../types/express";

export const mockExpressResponse = (): ResponseWithLocals => {
  const { res } = getMockRes({ locals: { logger: { trace: vitest.fn() } } });

  return res as any;
};
