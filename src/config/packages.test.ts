import { describe, expect, it } from "vitest";
import { PACKAGE_CONFIG, packageConfigSchema } from "./packages";

describe("P0 package configuration", () => {
  it("keeps editable test ranges and bounded adjustment entitlements", () => {
    expect(PACKAGE_CONFIG.map((item) => item.name)).toEqual(["Essential", "Signature", "Collector"]);
    expect(PACKAGE_CONFIG.find((item) => item.id === "signature")?.artDirectionAdjustments).toBe(1);
    expect(PACKAGE_CONFIG.find((item) => item.id === "collector")?.artDirectionAdjustments).toBe(1);
    expect(PACKAGE_CONFIG.every((item) => item.range.min < item.range.max)).toBe(true);
  });

  it("rejects unlimited or missing premium adjustments", () => {
    const signature = PACKAGE_CONFIG[1];
    expect(packageConfigSchema.safeParse({ ...signature, artDirectionAdjustments: 2 }).success).toBe(false);
    expect(packageConfigSchema.safeParse({ ...signature, artDirectionAdjustments: 0 }).success).toBe(false);
  });
});
