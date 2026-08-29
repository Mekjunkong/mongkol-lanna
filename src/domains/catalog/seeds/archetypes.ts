import type { Archetype } from "../types";
const base = { version:"1.0.0", region:"THAI_LANNA" as const, status:"PUBLISHED" as const, active:true };
const make = (id:string,name:string,intentionWeights:Record<string,number>,worldWeights:Record<string,number>,heroPlacement:Archetype["heroPlacement"],density:Archetype["density"],negativeSpacePreference:Archetype["negativeSpacePreference"],hierarchyGrammar:string):Archetype => ({...base,id,name,intentionWeights,worldWeights,heroPlacement,density,negativeSpacePreference,hierarchyGrammar});
export const ARCHETYPE_SEEDS: readonly Archetype[] = Object.freeze([
 make("open-horizon","Open Horizon",{NEW_BEGINNING:5,GROWTH:2},{"mountain-dawn":4,"rice-terraces":2},"LOWER_THIRD","SERENE","TOP","one grounded hero opening toward a spacious layered horizon"),
 make("sheltered-courtyard","Sheltered Courtyard",{HARMONY:4,BELONGING:4},{"teak-courtyard":5,"earthen-village":3},"CENTER","BALANCED","PERIMETER","one calm hero held by an enclosing secular courtyard rhythm"),
 make("rising-path","Rising Path",{COURAGE:5,GROWTH:3},{"rice-terraces":4,"mountain-dawn":3},"LOWER_THIRD","BALANCED","TOP","one clear hero with a diagonal path rising through supporting layers"),
 make("quiet-vessel","Quiet Vessel",{RESTORATION:5,REMEMBRANCE:2},{"botanical-atelier":3,"teak-courtyard":2},"CENTER","SERENE","PERIMETER","one still hero surrounded by sparse botanical breathing room"),
 make("flowing-return","Flowing Return",{RESTORATION:4,BELONGING:3},{"forest-stream":5,"mist-valley":3},"LEFT_THIRD","BALANCED","RIGHT","one hero anchoring a gentle current that returns through the field"),
 make("garden-gathering","Garden Gathering",{GRATITUDE:5,HARMONY:3},{"northern-garden":5,"botanical-atelier":3},"CENTER","GRAND","PERIMETER","one botanical hero with grouped supports and a readable central silhouette"),
 make("rooted-field","Rooted Field",{BELONGING:4,GROWTH:4},{"rice-terraces":4,"earthen-village":4},"LOWER_THIRD","BALANCED","TOP","one grounded hero repeated softly through an orderly cultivated field"),
 make("mist-threshold","Mist Threshold",{NEW_BEGINNING:4,REMEMBRANCE:3},{"mist-valley":5,"mountain-dawn":3},"RIGHT_THIRD","SERENE","LEFT","one distinct hero at the edge of layered mist and open space"),
 make("woven-continuity","Woven Continuity",{HARMONY:5,GRATITUDE:3},{"teak-courtyard":4,"earthen-village":3},"CENTER","GRAND","PERIMETER","one hero connected by plain unmarked linear bands and balanced supports"),
 make("steadfast-ridge","Steadfast Ridge",{COURAGE:5,REMEMBRANCE:2},{"mountain-dawn":5,"mist-valley":4},"UPPER_THIRD","GRAND","BOTTOM","one commanding natural hero above broad quiet landscape layers"),
]);
