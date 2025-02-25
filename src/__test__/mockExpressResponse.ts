import { Response } from "express";
import { vitest } from "vitest";

export const mockExpressResponse = (): Response => {
  const expressResponse = {
    json: vitest.fn(() => expressResponse),
    status: vitest.fn(() => expressResponse),
    type: vitest.fn(() => expressResponse),
    send: vitest.fn(() => expressResponse),
    set: vitest.fn(() => expressResponse),
  } as unknown as Response;

  return expressResponse;
};
