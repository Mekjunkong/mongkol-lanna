// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArtworkComposition } from "./artwork-composition";
import { dictionaries } from "@/content/dictionaries";

describe("customer UI foundation", () => {
  it("keeps Thai and English dictionaries aligned", () => {
    expect(Object.keys(dictionaries.th.nav)).toEqual(Object.keys(dictionaries.en.nav));
    expect(dictionaries.th.home.cta).toBeTruthy();
    expect(dictionaries.en.home.cta).toBeTruthy();
  });

  it("labels the in-house artwork composition accessibly", () => {
    render(<ArtworkComposition title="งานทดสอบ" safeZone />);
    expect(screen.getByRole("img", { name: "งานทดสอบ" })).toBeInTheDocument();
    expect(screen.getByLabelText("พื้นที่ว่างที่สงวนไว้")).toBeInTheDocument();
  });
});
