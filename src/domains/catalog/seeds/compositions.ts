import type { Composition } from "../types";
const base={version:"1.0.0",region:"THAI_LANNA" as const,status:"PUBLISHED" as const,active:true};
const make=(id:string,name:string,grammar:string,heroPlacements:Composition["heroPlacements"],safeZoneTypes:Composition["safeZoneTypes"],formats:Composition["formats"],negativeSpace:Composition["negativeSpace"],archetypeIds:string[]):Composition=>({...base,id,name,grammar,heroPlacements,safeZoneTypes,formats,negativeSpace,archetypeIds});
export const COMPOSITION_SEEDS: readonly Composition[]=Object.freeze([
 make("low-horizon","Low Horizon","low horizon with a clear upper field and layered atmospheric recession",["LOWER_THIRD"],["NONE","LOCK_SCREEN","HOME_SCREEN"],["PORTRAIT","LANDSCAPE","SQUARE"],"TOP",["open-horizon","rising-path","rooted-field"]),
 make("central-sanctum","Central Stillness","central secular focal area held by balanced framing elements",["CENTER"],["NONE","LOCK_SCREEN"],["PORTRAIT","SQUARE"],"PERIMETER",["sheltered-courtyard","quiet-vessel","garden-gathering","woven-continuity"]),
 make("left-anchor","Left Anchor","left-third hero balanced by open atmospheric space to the right",["LEFT_THIRD"],["NONE","HOME_SCREEN"],["LANDSCAPE","SQUARE"],"RIGHT",["flowing-return"]),
 make("right-threshold","Right Threshold","right-third hero at a soft boundary with an open field to the left",["RIGHT_THIRD"],["NONE","HOME_SCREEN"],["PORTRAIT","LANDSCAPE"],"LEFT",["mist-threshold"]),
 make("upper-ridge","Upper Ridge","upper-third natural silhouette counterweighted by a broad quiet lower field",["UPPER_THIRD"],["NONE","HOME_SCREEN"],["PORTRAIT","LANDSCAPE"],"BOTTOM",["steadfast-ridge"]),
 make("diagonal-ascent","Diagonal Ascent","measured diagonal movement through horizontal landscape layers",["LOWER_THIRD","LEFT_THIRD"],["NONE","LOCK_SCREEN"],["PORTRAIT","LANDSCAPE"],"TOP",["rising-path","flowing-return"]),
 make("garden-orbit","Garden Orbit","asymmetric botanical supports orbit one readable central hero",["CENTER"],["NONE","LOCK_SCREEN"],["PORTRAIT","SQUARE"],"PERIMETER",["garden-gathering","quiet-vessel"]),
 make("layered-field","Layered Field","shallow repeating landscape bands with one dominant silhouette",["LOWER_THIRD","UPPER_THIRD"],["NONE","HOME_SCREEN"],["LANDSCAPE","SQUARE"],"TOP",["rooted-field","steadfast-ridge","open-horizon"]),
]);
