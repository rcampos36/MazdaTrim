import type { ModelYear } from "./mazda-models";

/** Wheel diameter and finish by model/trim — sourced from Mazda USA press releases & vehicle pages. */
export type TrimWheelSpecEntry = {
  size: string;
  finish: string;
  note?: string;
};

function spec(
  size: string,
  finish: string,
  note?: string,
): TrimWheelSpecEntry {
  return { size, finish, note };
}

/** `modelId` → trimId → spec (2026 model year unless noted). */
const WHEEL_SPECS_BY_MODEL: Record<string, Record<string, TrimWheelSpecEntry>> = {
  "mazda3-sedan": {
    "25-s": spec('16"', "Silver aluminum-alloy"),
    "25-s-select-sport": spec('18"', "Black aluminum-alloy"),
    "25-s-preferred": spec('18"', "Silver-finish aluminum-alloy"),
    "25-s-carbon": spec('18"', "Black aluminum-alloy"),
    "25-turbo-premium-plus": spec('18"', "Black Metallic alloy"),
  },
  "mazda3-hatchback": {
    "25-s": spec('16"', "Silver aluminum-alloy"),
    "25-s-select-sport": spec('18"', "Black aluminum-alloy"),
    "25-s-preferred": spec('18"', "Gray Metallic aluminum-alloy"),
    "25-s-carbon": spec('18"', "Black aluminum-alloy"),
    "25-s-premium": spec('18"', "Black-finish aluminum-alloy"),
    "25-turbo-premium-plus": spec('18"', "Black Metallic alloy"),
  },
  "cx-30": {
    "25-s": spec('16"', "Gray Metallic aluminum-alloy"),
    "25-s-select-sport": spec('18"', "Black Metallic aluminum-alloy"),
    "25-s-preferred": spec('18"', "Silver Metallic aluminum-alloy"),
    "25-s-aire-edition": spec('18"', "Black Metallic aluminum-alloy"),
    "25-carbon-edition": spec('18"', "Black aluminum-alloy"),
    "25-s-premium": spec('18"', "Silver Metallic aluminum-alloy"),
    "25-turbo-aire-edition": spec('18"', "Black Metallic aluminum-alloy"),
    "25-turbo-premium-plus": spec('18"', "Black Metallic aluminum-alloy"),
  },
  "cx-50": {
    "25-s-select": spec('17"', "Black Metallic alloy"),
    "25-s-preferred": spec(
      '17"',
      "Black Metallic alloy",
      "Same 17-inch wheels as 2.5 S Select; Preferred adds moonroof and liftgate.",
    ),
    "25-s-meridian": spec(
      '18"',
      "Black Metallic alloy",
      "All-terrain tires (Mazda USA).",
    ),
    "25-s-premium": spec(
      '20"',
      "Black Metallic machine-finish alloy",
      "White Interior Option: 20-inch Silver machine-finish alloy.",
    ),
    "25-turbo": spec(
      '20"',
      "Black Metallic machine-finish alloy",
      "White Interior Option: 20-inch Silver machine-finish with chrome badges.",
    ),
    "25-turbo-meridian": spec(
      '18"',
      "Black Metallic alloy",
      "All-terrain tires; black lug nuts (Mazda USA).",
    ),
    "25-turbo-premium-plus": spec(
      '20"',
      "Black Metallic machine-finish alloy",
      "White Interior Option: 20-inch Silver machine-finish alloy.",
    ),
  },
  "cx-50-hybrid": {
    "hybrid-preferred": spec('17"', "Black alloy"),
    "hybrid-premium": spec(
      '17"',
      "Black alloy",
      "Builds on Hybrid Preferred; wheel size unchanged per Mazda USA.",
    ),
    "hybrid-premium-plus": spec(
      '19"',
      "Split Black and machine-polished alloy",
    ),
  },
  "cx-70": {
    "33-turbo-preferred": spec('21"', "Black Metallic aluminum-alloy"),
    "33-turbo-premium": spec(
      '21"',
      "Black Metallic aluminum-alloy",
      "Builds on 3.3 Turbo Preferred.",
    ),
    "33-turbo-premium-plus": spec(
      '21"',
      "Black Metallic aluminum-alloy",
      "Builds on 3.3 Turbo Premium.",
    ),
    "33-turbo-s-premium": spec('21"', "Black Metallic with machine-cut finish"),
    "33-turbo-s-premium-plus": spec(
      '21"',
      "Black Metallic with machine-cut finish",
      "Builds on 3.3 Turbo S Premium.",
    ),
    "phev-sc": spec('19"', "Gray Metallic aluminum-alloy"),
    "phev-sc-plus": spec(
      '19"',
      "Gray Metallic aluminum-alloy",
      "Builds on PHEV SC.",
    ),
  },
  "cx-90": {
    "33-turbo-select": spec('19"', "Silver Metallic aluminum-alloy"),
    "33-turbo-preferred": spec('21"', "Silver Metallic alloy"),
    "33-turbo-premium-sport": spec('21"', "Black Metallic alloy"),
    "33-turbo-premium-plus": spec(
      '21"',
      "Black Metallic alloy",
      "Builds on 3.3 Turbo Premium Sport.",
    ),
    "33-turbo-s-premium-sport": spec('21"', "Black Metallic alloy"),
    "33-turbo-s-premium-plus": spec(
      '21"',
      "Black Metallic alloy",
      "Builds on 3.3 Turbo S Premium Sport.",
    ),
    "phev-preferred": spec(
      '21"',
      "Silver Metallic alloy",
      "2026 PHEV trims use 21-inch wheels (Mazda USA).",
    ),
    "phev-premium-sport": spec('21"', "Black Metallic alloy"),
    "phev-premium-plus": spec('21"', "Machine-cut alloy"),
  },
  "mx-5-miata": {
    sport: spec('16"', "Metallic Black aluminum-alloy"),
    club: spec(
      '17"',
      "Black Metallic alloy",
      "Optional Brembo/BBS/Recaro package: 17-inch Dark Gunmetal BBS forged wheels.",
    ),
    "grand-touring": spec('17"', "Black and machine-finished aluminum-alloy"),
    "grand-touring-at": spec(
      '17"',
      "Black and machine-finished aluminum-alloy",
      "Same wheels as Grand Touring manual.",
    ),
  },
  "mx-5-miata-rf": {
    club: spec(
      '17"',
      "Dark Gunmetal BBS forged",
      "Standard Brembo/BBS/Recaro package on RF Club.",
    ),
    "grand-touring": spec('17"', "Black and machine-finished aluminum-alloy"),
    "grand-touring-at": spec(
      '17"',
      "Black and machine-finished aluminum-alloy",
      "Same wheels as Grand Touring manual.",
    ),
  },
};

const WHEEL_SPECS_CX5_BY_YEAR: Record<ModelYear, Record<string, TrimWheelSpecEntry>> = {
  2026: {
    "25-s": spec('17"', "Gray Metallic alloy"),
    "25-s-select": spec('17"', "Gray Metallic alloy"),
    "25-s-preferred": spec('19"', "Alloy"),
    "25-s-premium": spec('19"', "Black Metallic alloy"),
    "25-s-premium-plus": spec(
      '19"',
      "Black Metallic alloy",
      "Same 19-inch wheels as 2.5 S Premium.",
    ),
  },
  2025: {
    "25-s": spec('17"', "Gray Metallic alloy"),
    "25-s-select": spec('17"', "Gray Metallic alloy"),
    "25-s-preferred": spec(
      '19"',
      "Black Metallic with machine-cut accents",
      "Dec. 2025 production onward; earlier builds used 17-inch Gray Metallic alloy.",
    ),
    "25-s-carbon-edition": spec('19"', "Black Metallic alloy"),
    "25-s-premium-plus": spec('19"', "Gray Metallic alloy"),
    "25-carbon-turbo": spec('19"', "Black Metallic alloy"),
    "25-turbo-premium": spec(
      '19"',
      "Black Metallic alloy",
      "Same 19-inch wheels as 2.5 Carbon Turbo.",
    ),
    "25-turbo-signature": spec('19"', "Silver Metallic alloy"),
  },
};

const FALLBACK: TrimWheelSpecEntry = {
  size: "N/A",
  finish: "Verify on Mazda USA build-and-price",
  note: "Wheel specification varies by package and market.",
};

export function getTrimWheelSpec(
  modelId: string,
  trimId: string,
  year: ModelYear = 2026,
): TrimWheelSpecEntry {
  if (modelId === "cx-5") {
    return WHEEL_SPECS_CX5_BY_YEAR[year][trimId] ?? FALLBACK;
  }
  return WHEEL_SPECS_BY_MODEL[modelId]?.[trimId] ?? FALLBACK;
}
