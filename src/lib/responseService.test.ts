import { describe, expect, it } from "vitest";
import { responseService } from "./responseService";
import { getMockRes } from "vitest-mock-express";

describe("responseService", () => {
  const mockBody = {
    hello: "world",
  };

  it("should return 200 response from 'ok'", async () => {
    // given
    const { res } = getMockRes();

    // when
    responseService.ok(res as any);

    // then
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({});
  });

  it("should return 200 response with body from 'ok'", async () => {
    // given
    const { res } = getMockRes();

    // when
    responseService.ok(res as any, mockBody);

    // then
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBody);
  });

  it("should return 404 response from 'notFound'", async () => {
    // given
    const { res } = getMockRes();

    // when
    responseService.notFound(res as any);

    // then
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Not found",
    });
  });

  it("should return 500 response from 'internalServerError'", async () => {
    // given
    const { res } = getMockRes();

    // when
    responseService.internalServerError(res as any);

    // then
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });
  it("should return 500 response with body from 'internalServerError'", async () => {
    // given
    const { res } = getMockRes();

    // when
    responseService.internalServerError(res, mockBody);

    // then
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something went wrong",
      ...mockBody,
    });
  });
});
