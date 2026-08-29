import { describe, expect, it } from "vitest";
import { interpretStory } from "./interpreter";
import { STORY_FIXTURES } from "./fixtures";
import { storyInputSchema } from "./schema";

describe("Story Interpreter",()=>{
 it.each(STORY_FIXTURES)("deterministically handles: $story",(fixture)=>{
   const first=interpretStory(fixture);
   const second=interpretStory(fixture);
   expect(first).toEqual(second);
   expect(first.safetyFlags).toEqual(fixture.flags);
   expect(first.visualMetaphorIds.length).toBeLessThanOrEqual(2);
   expect(first.emotionalTone.length).toBeLessThanOrEqual(2);
 });
 it("uses an explicit confirmation fallback without inventing sensitive meaning",()=>{
   const story="I have something important on my mind";
   const result=interpretStory({story,intention:"HARMONY"});
   expect(result.needsConfirmation).toBe(true);
   expect(result).not.toHaveProperty("diagnosis");
   expect(result).not.toHaveProperty("sensitiveTraits");
   expect(JSON.stringify(result)).not.toContain(story);
 });
 it("never emits names, dates, or raw prose",()=>{
   const raw="My name is Ada and the date is 2030-01-01. I remember home.";
   const serialized=JSON.stringify(interpretStory({story:raw,intention:"REMEMBRANCE"}));
   expect(serialized).not.toContain("Ada");
   expect(serialized).not.toContain("2030");
   expect(serialized).not.toContain(raw);
 });
 it("returns the complete deterministic V4 Art Direction shape",()=>{
   const result=interpretStory({story:"We are beginning a calm new chapter.",chapter:"NEW_BEGINNING",collection:"MOUNTAIN_MIST",mood:"QUIET"});
   expect(result).toMatchObject({chapter:"NEW_BEGINNING",centralIntention:"NEW_BEGINNING",collection:"MOUNTAIN_MIST",suggestedHero:"layered mountain ridge"});
   expect(result.visualMetaphor).toBeTruthy();
   expect(result.narrativeMovement).toBeTruthy();
   expect(result.palette).toBeTruthy();
   expect(result.composition).toBeTruthy();
   expect(result.supportingElements.length).toBeGreaterThan(0);
 });
 it("allows an omitted story without inventing personal meaning",()=>{
   const result=interpretStory({chapter:"HOME_FAMILY",collection:"NORTHERN_GARDEN",mood:"WARM"});
   expect(result.needsConfirmation).toBe(false);
   expect(result.lifeTheme).toBe("HOME");
 });
 it("rejects more than five sentences and control characters",()=>{
   expect(storyInputSchema.safeParse({story:"One. Two. Three. Four. Five. Six.",intention:"GROWTH"}).success).toBe(false);
   expect(storyInputSchema.safeParse({story:"quiet\u0000story",intention:"GROWTH"}).success).toBe(false);
 });
});
