import { describe, expect, it } from "vitest";
import { responseService } from "./responseService";
import { mockExpressResponse } from "../__test__/mockExpressResponse";

describe("responseService", () => {
  const mockBody = {
    hello: "world",
  };

  it("should return 200 response from 'ok'", async () => {
    // given
    const expressResponse = mockExpressResponse();

    // when
    responseService.ok(expressResponse);

    // then
    expect(expressResponse.status).toHaveBeenCalledWith(200);
    expect(expressResponse.json).toHaveBeenCalledWith({});
  });

  it("should return 200 response with body from 'ok'", async () => {
    // given
    const expressResponse = mockExpressResponse();

    // when
    responseService.ok(expressResponse, mockBody);

    // then
    expect(expressResponse.status).toHaveBeenCalledWith(200);
    expect(expressResponse.json).toHaveBeenCalledWith(mockBody);
  });

  it("should return 404 response from 'notFound'", async () => {
    // given
    const expressResponse = mockExpressResponse();

    // when
    responseService.notFound(expressResponse);

    // then
    expect(expressResponse.status).toHaveBeenCalledWith(404);
    expect(expressResponse.json).toHaveBeenCalledWith({
      message: "Not found",
    });
  });

  it("should return 500 response from 'internalServerError'", async () => {
    // given
    const expressResponse = mockExpressResponse();

    // when
    responseService.internalServerError(expressResponse);

    // then
    expect(expressResponse.status).toHaveBeenCalledWith(500);
    expect(expressResponse.json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });
  it("should return 500 response with body from 'internalServerError'", async () => {
    // given
    const expressResponse = mockExpressResponse();

    // when
    responseService.internalServerError(expressResponse, mockBody);

    // then
    expect(expressResponse.status).toHaveBeenCalledWith(500);
    expect(expressResponse.json).toHaveBeenCalledWith({
      message: "Something went wrong",
      ...mockBody,
    });
  });
});
