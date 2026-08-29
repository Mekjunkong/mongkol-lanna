import { describe, expect, it } from "vitest";
import { parseServerEnvironment } from "./env.server";

describe("server environment", () => {
  it("fails closed to mock generation", () => {
    const environment = parseServerEnvironment({ NODE_ENV: "test" });

    expect(environment.REAL_GENERATION).toBe(false);
    expect(environment.MOCK_CHECKOUT).toBe(true);
  });

  it("refuses real generation without a server-side provider key", () => {
    expect(() =>
      parseServerEnvironment({
        NODE_ENV: "test",
        REAL_GENERATION: "true",
      }),
    ).toThrow(/KIE_API_KEY/);
  });

  it("allows explicit real generation only with a provider key", () => {
    const environment = parseServerEnvironment({
      NODE_ENV: "test",
      REAL_GENERATION: "true",
      KIE_API_KEY: "server-only-test-key",
    });

    expect(environment.REAL_GENERATION).toBe(true);
  });
});
