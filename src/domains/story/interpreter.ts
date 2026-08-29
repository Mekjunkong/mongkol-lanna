import { storyInputSchema, storyInterpretationSchema, STORY_INTERPRETATION_VERSION, type StoryInterpretation } from "./schema";
import { INTENTION_DEFAULTS, JOURNEY_RULES, LIFE_THEME_RULES, TONE_RULES, safetyFlags } from "./rules";

function firstMatch<T extends string>(value:string,rules:readonly {value:T;patterns:readonly RegExp[]}[]):T|undefined {
  return rules.find((rule)=>rule.patterns.some((pattern)=>pattern.test(value)))?.value;
}
function matches<T extends string>(value:string,rules:readonly {value:T;patterns:readonly RegExp[]}[]):T[]{
  return rules.filter((rule)=>rule.patterns.some((pattern)=>pattern.test(value))).map((rule)=>rule.value);
}

export function interpretStory(input: unknown): StoryInterpretation {
  const parsed = storyInputSchema.parse(input);
  const normalized = parsed.story.normalize("NFKC").toLocaleLowerCase("en-US");
  const defaults = INTENTION_DEFAULTS[parsed.intention];
  const lifeTheme = firstMatch(normalized, LIFE_THEME_RULES);
  const journey = firstMatch(normalized, JOURNEY_RULES);
  const detectedTones = matches(normalized, TONE_RULES).slice(0, 2);
  const flags = safetyFlags(normalized);

  const interpretation = storyInterpretationSchema.parse({
    lifeTheme: lifeTheme ?? defaults.lifeTheme,
    emotionalTone: detectedTones.length ? detectedTones : [defaults.tone],
    intention: parsed.intention,
    journeyState: journey ?? defaults.journey,
    visualMetaphorIds: defaults.metaphors.slice(0, 2),
    safetyFlags: flags,
    needsConfirmation: !lifeTheme || !journey || flags.length > 0,
    interpretationVersion: STORY_INTERPRETATION_VERSION,
  });

  return interpretation;
}
