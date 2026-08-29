import { describe, expect, it } from "vitest";
import { symbolSchema } from "./schemas";
import { CatalogRepository, createCatalogSnapshot } from "./repository";
import { CATALOG_SEED } from "./seeds";
import { guardCustomerRequest } from "../culture/guards";

const repository = new CatalogRepository(CATALOG_SEED);

describe("curated catalog", () => {
  it("contains the required P0 catalog and resolves every reference", () => {
    const snapshot = createCatalogSnapshot(CATALOG_SEED);
    expect(snapshot.worlds).toHaveLength(8);
    expect(snapshot.archetypes).toHaveLength(10);
    expect(snapshot.palettes).toHaveLength(7);
    expect(snapshot.compositions).toHaveLength(8);
    expect(snapshot.symbols.length).toBeGreaterThanOrEqual(10);
  });

  it("is immutable", () => {
    expect(Object.isFrozen(repository.snapshot)).toBe(true);
    expect(Object.isFrozen(repository.snapshot.worlds[0])).toBe(true);
  });

  it("keeps mythological and sacred-adjacent seeds out of automatic selection", () => {
    const automatic = repository.automaticSymbols("mountain-dawn", "SYMBOLIC").map(({ id }) => id);
    expect(automatic).not.toContain("naga-figure");
    expect(automatic).not.toContain("sacred-hall");
    expect(repository.automaticSymbols("mountain-dawn", "SACRED")).toEqual([]);
  });

  it("rejects unknown confidence, vague regions, generated writing, and sacred publication", () => {
    const valid = CATALOG_SEED.symbols[0];
    expect(symbolSchema.safeParse({ ...valid, confidence: "TRADITIONAL" }).success).toBe(false);
    expect(symbolSchema.safeParse({ ...valid, region: "ASIAN" }).success).toBe(false);
    expect(symbolSchema.safeParse({ ...valid, promptFragment: "ornamental pseudo-script glyphs" }).success).toBe(false);
    expect(symbolSchema.safeParse({ ...valid, spiritualMin: "SACRED", spiritualMax: "SACRED", status: "PUBLISHED" }).success).toBe(false);
  });

  it.each(["make it Asian", "add a mantra", "ใส่ยันต์และคาถา", "copy this artist's signature", "Buddha centerpiece"])("blocks adversarial request: %s", (request) => {
    expect(guardCustomerRequest(request, "SYMBOLIC").allowed).toBe(false);
  });

  it("fails closed on sacred automation", () => {
    expect(guardCustomerRequest("quiet mountain", "SACRED")).toEqual({ allowed: false, reasons: ["SACRED_AUTOMATION_DISABLED"] });
  });
});
