import { describe, expect, it } from "vitest";

describe("/search", () => {
  it("should return 200 response with correct query parameters", async () => {
    // when
    const result = await fetch(
      `http://localhost:3080/v1/search?author=frank&offset=0&limit=10`,
    );

    // then
    expect(result.status).toEqual(200);
  });

  it("should return 400 response without any query parameters", async () => {
    // when
    const result = await fetch(`http://localhost:3080/v1/search`);

    // then
    expect(result.status).toEqual(400);
  });

  it("should return 400 response with incorrect limit query parameter", async () => {
    // when
    const result = await fetch(
      `http://localhost:3080/v1/search?author=frank&offset=0&limit=11`,
    );

    // then
    expect(result.status).toEqual(400);
  });
});
