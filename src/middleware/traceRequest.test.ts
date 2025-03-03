import { describe, expect, it, vitest } from "vitest";
import { getMockReq } from "vitest-mock-express";
import { validate } from "uuid";
import { traceRequest } from "./traceRequest";
import { mockExpressResponse } from "../__test__/mockExpressResponse";

describe("traceRequest", () => {
  it("should attach a uuid to every request", () => {
    // given
    const mockRes = mockExpressResponse();
    const req = getMockReq();

    // when
    traceRequest(req as any, mockRes, vitest.fn());

    // then
    const { requestId } = mockRes.locals;
    expect(validate(requestId)).toBeTruthy();
  });

  it("should attach a logger to every request", () => {
    // given
    const mockRes = mockExpressResponse();
    const req = getMockReq();

    // when
    traceRequest(req as any, mockRes, vitest.fn());

    // then
    const { logger } = mockRes.locals;
    // TODO improve logic for checking here
    expect(logger).toHaveProperty("info");
    expect(logger).toHaveProperty("error");
    expect(logger).toHaveProperty("child");
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.error).toBe("function");
    expect(typeof logger.child).toBe("function");
  });
});
