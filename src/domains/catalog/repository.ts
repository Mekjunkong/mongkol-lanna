import { catalogSnapshotSchema } from "./schemas";
import type { CatalogSnapshot, SpiritualLevel, SymbolRecord } from "./types";
import { isAutomaticSymbol } from "../culture/policy";

function deepFreeze<T>(value: T): Readonly<T> {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

function assertUnique(values: readonly { id: string }[], label: string): void {
  const ids = values.map(({ id }) => id);
  if (new Set(ids).size !== ids.length) throw new Error(`Duplicate ${label} ID`);
}

export function createCatalogSnapshot(input: unknown): Readonly<CatalogSnapshot> {
  const snapshot = catalogSnapshotSchema.parse(input);
  assertUnique(snapshot.worlds, "world"); assertUnique(snapshot.archetypes, "archetype"); assertUnique(snapshot.symbols, "symbol");
  assertUnique(snapshot.palettes, "palette"); assertUnique(snapshot.compositions, "composition"); assertUnique(snapshot.metaphors, "metaphor");
  const symbols = new Set(snapshot.symbols.map(({ id }) => id));
  const palettes = new Set(snapshot.palettes.map(({ id }) => id));
  const compositions = new Set(snapshot.compositions.map(({ id }) => id));
  const archetypes = new Set(snapshot.archetypes.map(({ id }) => id));
  for (const world of snapshot.worlds) {
    for (const id of world.compatibleSymbolIds) if (!symbols.has(id)) throw new Error(`World ${world.id} references unknown symbol ${id}`);
    for (const id of world.paletteIds) if (!palettes.has(id)) throw new Error(`World ${world.id} references unknown palette ${id}`);
    for (const id of world.compositionIds) if (!compositions.has(id)) throw new Error(`World ${world.id} references unknown composition ${id}`);
  }
  for (const composition of snapshot.compositions) for (const id of composition.archetypeIds) if (!archetypes.has(id)) throw new Error(`Composition ${composition.id} references unknown archetype ${id}`);
  for (const symbol of snapshot.symbols) for (const id of symbol.conflictsWith) if (!symbols.has(id)) throw new Error(`Symbol ${symbol.id} conflicts with unknown symbol ${id}`);
  return deepFreeze(snapshot);
}

export class CatalogRepository {
  readonly snapshot: Readonly<CatalogSnapshot>;
  constructor(input: unknown) { this.snapshot = createCatalogSnapshot(input); }
  world(id: string) { return this.snapshot.worlds.find((record) => record.id === id); }
  archetype(id: string) { return this.snapshot.archetypes.find((record) => record.id === id); }
  palette(id: string) { return this.snapshot.palettes.find((record) => record.id === id); }
  composition(id: string) { return this.snapshot.compositions.find((record) => record.id === id); }
  metaphor(id: string) { return this.snapshot.metaphors.find((record) => record.id === id); }
  symbol(id: string) { return this.snapshot.symbols.find((record) => record.id === id); }
  automaticSymbols(worldId: string, spiritualLevel: SpiritualLevel): readonly SymbolRecord[] {
    return this.snapshot.symbols.filter((symbol) => symbol.compatibleWorldIds.includes(worldId) && isAutomaticSymbol(symbol, spiritualLevel));
  }
}
