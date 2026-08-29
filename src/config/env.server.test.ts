import { describe, expect, it } from "vitest";
import { parseServerEnvironment } from "./env.server";

describe("server environment", () => {
  it("fails closed to mock generation", () => {
    const environment = parseServerEnvironment({ NODE_ENV: "test" });

    expect(environment.REAL_GENERATION).toBe(false);
    expect(environment.MOCK_CHECKOUT).toBe(true);
  });

  it("refuses real generation in the V4 P0 build", () => {
    expect(() =>
      parseServerEnvironment({
        NODE_ENV: "test",
        REAL_GENERATION: "true",
      }),
    ).toThrow(/must remain false/);
  });

  it("still refuses real generation when a key is present", () => {
    expect(() => parseServerEnvironment({ NODE_ENV: "test", REAL_GENERATION: "true", KIE_API_KEY: "server-only-test-key" })).toThrow(/must remain false/);
  });
});
