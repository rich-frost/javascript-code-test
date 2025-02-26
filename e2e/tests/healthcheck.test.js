import { describe, expect, it } from "vitest";

describe("/healthcheck", () => {
  it("should ping the healthcheck and get a 200 response", async () => {
    // when
    const result = await fetch(`http://localhost:3080/v1/healthcheck`);

    // then
    expect(result.status).toEqual(200);
  });
});
