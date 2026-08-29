import { z } from "zod";
import { detailLevelSchema, formatSchema, intentionSchema, moodSchema, safeZoneTypeSchema, spiritualLevelSchema, traditionLevelSchema } from "../catalog/schemas";
import { storyInterpretationSchema } from "../story/schema";

const zoneSchema=z.object({type:safeZoneTypeSchema,location:z.enum(["TOP","BOTTOM","LEFT","RIGHT","CENTER","PERIMETER"]),x:z.number().min(0).max(1),y:z.number().min(0).max(1),width:z.number().positive().max(1),height:z.number().positive().max(1),reason:z.string().min(3)}).readonly();
const hierarchySchema=z.object({hero:z.string(),secondary:z.array(z.string()).max(4),background:z.array(z.string()).max(4),decoration:z.array(z.string()).max(4)}).readonly();
export const blueprintSchema=z.object({
 id:z.string().min(3),revision:z.number().int().positive(),blueprintVersion:z.literal("1.0.0"),catalogVersion:z.string(),interpreterVersion:z.string(),
 intention:intentionSchema,mood:moodSchema,worldId:z.string(),spiritualLevel:spiritualLevelSchema,detailLevel:detailLevelSchema,traditionLevel:traditionLevelSchema,format:formatSchema,
 title:z.string().min(3).max(80),narrative:z.string().min(10).max(400),metaphorIds:z.array(z.string()).min(1).max(2),archetypeId:z.string(),heroSymbolId:z.string(),supportSymbolIds:z.array(z.string()).max(4),paletteId:z.string(),compositionId:z.string(),hierarchy:hierarchySchema,safeZone:zoneSchema,
 culturalStatements:z.array(z.object({symbolId:z.string(),category:z.enum(["CULTURAL_REFERENCE","ARTISTIC_INTERPRETATION","DECORATIVE"]),confidence:z.enum(["VERIFIED","INSPIRED","DECORATIVE"]),note:z.string().nullable(),interpretation:z.string()})).min(1),
 decisionTrace:z.array(z.object({stage:z.string(),selectedId:z.string(),score:z.number(),reason:z.string()})).min(4),
 contentVersions:z.record(z.string(),z.string()),confirmed:z.literal(true),
}).strict().superRefine((blueprint,ctx)=>{
 if(blueprint.spiritualLevel==="SACRED")ctx.addIssue({code:"custom",message:"SACRED automation is disabled"});
 if(blueprint.hierarchy.hero!==blueprint.heroSymbolId)ctx.addIssue({code:"custom",message:"Hierarchy must contain exactly the selected hero"});
 if(new Set([blueprint.heroSymbolId,...blueprint.supportSymbolIds]).size!==blueprint.supportSymbolIds.length+1)ctx.addIssue({code:"custom",message:"Symbols must be unique"});
}).readonly();
export type ArtworkBlueprint=z.infer<typeof blueprintSchema>;
export const artBrainInputSchema=z.object({requestId:z.string().min(3),revision:z.number().int().positive(),intention:intentionSchema,mood:moodSchema,worldId:z.string(),heroSymbolId:z.string(),supportSymbolIds:z.array(z.string()).max(4).default([]),detailLevel:detailLevelSchema,traditionLevel:traditionLevelSchema,spiritualLevel:spiritualLevelSchema,format:formatSchema,safeZoneType:safeZoneTypeSchema,storyInterpretation:storyInterpretationSchema}).strict();
export type ArtBrainInput=z.input<typeof artBrainInputSchema>;

export function immutableBlueprint(input:unknown):Readonly<ArtworkBlueprint>{
 const parsed=blueprintSchema.parse(input);
 const freeze=(value:unknown):void=>{if(value&&typeof value==="object"&&!Object.isFrozen(value)){Object.freeze(value);Object.values(value).forEach(freeze);}};
 freeze(parsed); return parsed;
}
