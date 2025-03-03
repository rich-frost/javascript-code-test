import { describe, expect, it } from "vitest";
import { healthcheckHandler } from "./healthcheck";
import { ResponseWithLocals } from "../types/express";
import { mockExpressResponse } from "../__test__/mockExpressResponse";

describe("healthcheck handler", () => {
  it("should return a success message", () => {
    // given
    const expressResponse = mockExpressResponse();

    // when
    healthcheckHandler({} as any, expressResponse as any as ResponseWithLocals);

    // then
    expect(expressResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) }),
    );
  });
});
