import { describe, expect, it } from "vitest";
import { compileStructuredPrompt } from "./compiler";

const direction = {
  chapter: "NEW_BEGINNING",
  emotionalTone: "QUIET",
  centralIntention: "NEW_BEGINNING",
  visualMetaphor: "opening-horizon",
  narrativeMovement: "opening toward a new field",
  suggestedHero: "layered mountain ridge",
  supportingElements: ["quiet mist", "observed teak leaves"],
  collection: "MOUNTAIN_MIST",
  palette: "mist jade, charcoal, and aged paper",
  composition: "low horizon with an open upper field",
} as const;

const prohibitedValues = [
  "Ada birthday 2030-01-01",
  "fake Lanna script",
  "Buddha yantra sacred text",
  "customer raw story",
  "copy living artist style",
];

describe("structured prompt compiler", () => {
  it("is deterministic and contains only approved catalog fragments", () => {
    expect(compileStructuredPrompt(direction)).toEqual(compileStructuredPrompt(direction));
    expect(JSON.stringify(compileStructuredPrompt(direction))).not.toContain("customer story");
  });

  it.each(["rawStory", "name", "specialDate", "birthday"])("rejects personal field %s", (field) => {
    expect(() => compileStructuredPrompt({ ...direction, [field]: "private-value" })).toThrow();
  });

  it.each(prohibitedValues)("rejects prohibited content in every creative field: %s", (value) => {
    for (const field of ["centralIntention", "visualMetaphor", "narrativeMovement", "suggestedHero", "palette", "composition"] as const) {
      expect(() => compileStructuredPrompt({ ...direction, [field]: value })).toThrow();
    }
    expect(() => compileStructuredPrompt({ ...direction, supportingElements: [value] })).toThrow();
  });
});
