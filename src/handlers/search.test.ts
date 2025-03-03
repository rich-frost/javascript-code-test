import { describe, it, vi, expect } from "vitest";
import { GetSearchHandlerDependencies, createSearchHandler } from "./search";
import { Request } from "express";
import { mockExpressResponse } from "../__test__/mockExpressResponse";

describe("search handler", () => {
  const getMocks = (
    overrides?: Partial<GetSearchHandlerDependencies>,
  ): GetSearchHandlerDependencies =>
    ({
      bookSearchClient: vi.fn(async () => Promise.resolve({ hello: "world" })),
      ...overrides,
    }) as any;

  const mockRequest = {
    query: { author: "J.K. Rowling", offset: "0", limit: "10" },
  } as unknown as Request;

  it("should call bookSearchClient and return results", async () => {
    //given
    const mocks = getMocks();
    const getSearchHandler = createSearchHandler(mocks);
    const mockResponse = mockExpressResponse();

    // when
    await getSearchHandler(mockRequest, mockResponse);

    // then
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ hello: "world" });
  });

  it("should handle errors and return internal server error", async () => {
    //given
    const mocks = getMocks({
      bookSearchClient: vi.fn(async () => Promise.reject()),
    });
    const getSearchHandler = createSearchHandler(mocks);
    const mockResponse = mockExpressResponse();

    // when
    await getSearchHandler(mockRequest, mockResponse);

    // then
    expect(mockResponse.locals.logger.error).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });
});
