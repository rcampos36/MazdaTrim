/** Body style used for the SVG fallback illustration. */
export type ModelBodyStyle =
  | "sedan"
  | "hatchback"
  | "suv-subcompact"
  | "suv-compact"
  | "suv-mid"
  | "suv-large"
  | "roadster"
  | "roadster-rf";

export type ModelYear = 2025 | 2026;

export interface MazdaModel {
  id: string;
  name: string;
  shortName: string;
  bodyStyle: ModelBodyStyle;
  category: string;
}

/** Vehicle pages on Mazda USA (for reference / future deep links). */
export const MAZDA_USA_ORIGIN = "https://www.mazdausa.com";

/**
 * One PNG per model from mazdausa.com (model-selector / hero sprites).
 * `?w=` is appended at runtime for sharper display when scaled.
 */
const MAZDA_USA_IMAGE_PATH: Record<string, string> = {
  "mazda3-sedan":
    "/siteassets/vehicles/2025/mazda3-sedan/04_btv/002_sprites/model/my25-m3-sedan-turbo-premium-plus-polymental-gray-ms.png",
  "mazda3-hatchback":
    "/siteassets/vehicles/2026/mazda3-hatchback/04_btv/002_sprites/model-selector/2.5-s-turbo-premium-plus---soul-red-crystal/my25-m3hb-2-5-turbo-premium-plus-soulredcrystal-metallic-animatedms.png",
  "cx-30":
    "/siteassets/vehicles/2026/cx-30/04_btv/002_sprites/model-selector/trim---hero-color/my26-cx30-2-5-turbo-premium-plus-polymetal-gray-animatedms.png",
  "cx-50":
    "/siteassets/vehicles/2026/cx-50/04_btv/002_sprites/model-selector/new-12.18-premium-plus/my26-cx50-2-5-turbo-premiumplus-polymetalgray-animatedms.png",
  "cx-5":
    "/siteassets/vehicles/2026/cx-5/04_btv/002_sprites/model-selector/trim---hero-color/my26-2-5-premiumplus-soulred-animatedms.png",
  "cx-70":
    "/siteassets/vehicles/2026/cx-70/04_btv/002_sprites/model-selector/turbo-3-premium---jetblack/my26-cx70-3-3-turbo-s-premium-plus-jetblack-animatedms.png",
  "cx-90":
    "/siteassets/vehicles/2025/cx-90--cx-90-phev/06_btv/cx-90-inline/002_sprites/model-selector/my25-cx90-inline-turbo-s-premium-plus-artisan-red-ms.png",
  "mx-5-miata":
    "/siteassets/vehicles/2026/mx-5-st/04_btv/002_sprites/model-selector/grand-touring---aero-gray/my26-mx-5-st-gt-aerogray-animatedms.png",
  "mx-5-miata-rf":
    "/siteassets/vehicles/2026/mx-5-rf/04_btv/002_sprites/model-selector/grand-touring---soul-red/2026-mx5-rf-gt-soulred-animatedms.png",
  "cx-50-hybrid":
    "/siteassets/vehicles/2025/cx-50-hybrid/04_btv/002_sprites/model-selector/hybrid-premium-plus/2025-cx50-hybrid-premium-plus-wind-chill-pearl-animatedms.png",
};

const IMAGE_WIDTH = 960;

export function getMazdaUsaImageUrl(modelId: string): string {
  const path = MAZDA_USA_IMAGE_PATH[modelId];
  if (!path) {
    throw new Error(`No Mazda USA image path for model "${modelId}"`);
  }
  return `${MAZDA_USA_ORIGIN}${path}?w=${IMAGE_WIDTH}`;
}

const MODELS_2025: MazdaModel[] = [
  {
    id: "mazda3-sedan",
    name: "Mazda3 Sedan",
    shortName: "Mazda3",
    bodyStyle: "sedan",
    category: "Car",
  },
  {
    id: "mazda3-hatchback",
    name: "Mazda3 Hatchback",
    shortName: "Mazda3",
    bodyStyle: "hatchback",
    category: "Car",
  },
  {
    id: "cx-30",
    name: "CX-30",
    shortName: "CX-30",
    bodyStyle: "suv-subcompact",
    category: "SUV",
  },
  {
    id: "cx-50",
    name: "CX-50",
    shortName: "CX-50",
    bodyStyle: "suv-compact",
    category: "SUV",
  },
  {
    id: "cx-5",
    name: "CX-5",
    shortName: "CX-5",
    bodyStyle: "suv-compact",
    category: "SUV",
  },
  {
    id: "cx-70",
    name: "CX-70",
    shortName: "CX-70",
    bodyStyle: "suv-mid",
    category: "SUV",
  },
  {
    id: "cx-90",
    name: "CX-90",
    shortName: "CX-90",
    bodyStyle: "suv-large",
    category: "SUV",
  },
  {
    id: "mx-5-miata",
    name: "MX-5 Miata",
    shortName: "MX-5",
    bodyStyle: "roadster",
    category: "Sports car",
  },
  {
    id: "mx-5-miata-rf",
    name: "MX-5 Miata RF",
    shortName: "MX-5 RF",
    bodyStyle: "roadster-rf",
    category: "Sports car",
  },
];

/** 2026 adds the CX-50 Hybrid; other nameplates match the 2025 list for this app. */
const MODELS_2026: MazdaModel[] = [
  ...MODELS_2025,
  {
    id: "cx-50-hybrid",
    name: "CX-50 Hybrid",
    shortName: "CX-50 Hybrid",
    bodyStyle: "suv-compact",
    category: "SUV",
  },
];

export const MAZDA_MODEL_YEARS: ModelYear[] = [2026, 2025];

export const MAZDA_MODELS_BY_YEAR: Record<ModelYear, MazdaModel[]> = {
  2025: MODELS_2025,
  2026: MODELS_2026,
};

export function getModelsForYear(year: ModelYear): MazdaModel[] {
  return MAZDA_MODELS_BY_YEAR[year];
}
