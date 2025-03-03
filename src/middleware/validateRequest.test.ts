import { createValidateRequest } from "./validateRequest";
import { mockExpressResponse } from "../__test__/mockExpressResponse";
import { afterEach, describe, expect, it, vi, vitest } from "vitest";

describe("validateRequest", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call the next function in the request stack if there are no validation errors", async () => {
    // given
    const validateRequest = createValidateRequest();
    const expressResponse = mockExpressResponse();
    const nextFn = vitest.fn();

    // when
    const validateRequestMiddlewareFn = validateRequest([
      { run: () => {} } as any,
    ]);
    await validateRequestMiddlewareFn({} as any, expressResponse, nextFn);

    // then
    expect(nextFn).toHaveBeenCalled();
  });

  it.skip("should respond with 400 if validation fails", async () => {
    // given
    // vi.mock("express-validator", async (importOriginal) => {
    //   const actual = await importOriginal();
    //   return {
    //     ...(actual as any),
    //     validationResult: () => ({
    //       isEmpty: () => false, // Make validation fail
    //       array: () => [{ msg: "Name is required" }],
    //     }),
    //   };
    // });

    const validateRequest = createValidateRequest();
    const expressResponse = mockExpressResponse();
    const nextFn = vitest.fn();

    // when
    const validateRequestMiddlewareFn = validateRequest([
      { run: () => {} } as any,
    ]);
    await validateRequestMiddlewareFn({} as any, expressResponse, nextFn);

    // then
    expect(expressResponse.status).toHaveBeenCalledWith(400);
    expect(nextFn).not.toHaveBeenCalled();
  });
});
