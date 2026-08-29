import { catalogSnapshotSchema } from "../schemas";
import { ARCHETYPE_SEEDS } from "./archetypes";
import { COMPOSITION_SEEDS } from "./compositions";
import { METAPHOR_SEEDS } from "./metaphors";
import { PALETTE_SEEDS } from "./palettes";
import { SYMBOL_SEEDS } from "./symbols";
import { WORLD_SEEDS } from "./worlds";

export const CATALOG_VERSION = "1.0.0";
export const CATALOG_SEED = catalogSnapshotSchema.parse({ version: CATALOG_VERSION, worlds: WORLD_SEEDS, archetypes: ARCHETYPE_SEEDS, symbols: SYMBOL_SEEDS, palettes: PALETTE_SEEDS, compositions: COMPOSITION_SEEDS, metaphors: METAPHOR_SEEDS });
