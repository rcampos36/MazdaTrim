"use client";

import type { RefObject } from "react";
import Image from "next/image";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MAZDA_USA_ORIGIN,
  getMazdaUsaImageUrl,
  getModelsForYear,
  MAZDA_MODEL_YEARS,
  type MazdaModel,
  type ModelYear,
} from "@/data/mazda-models";
import {
  getModelTrimLine,
  type ModelTrim,
  type TrimFeatureItem,
} from "@/data/mazda-trims";
import { ModelSilhouette } from "@/components/ModelSilhouette";

type ComparePick = {
  modelId: string;
  trimId: string;
};

function trimLabelForPick(
  pick: ComparePick,
  models: MazdaModel[],
): string | null {
  const model = models.find((m) => m.id === pick.modelId);
  const line = getModelTrimLine(pick.modelId);
  const trim = line?.trims.find((t) => t.id === pick.trimId);
  if (!model || !trim) return null;
  return `${model.name} · ${trim.name}`;
}

function findTrimIndex(trims: ModelTrim[], trimId: string): number {
  return trims.findIndex((t) => t.id === trimId);
}

type TrimPerfSpec = {
  eng: string;
  hp: string;
  trq: string;
};

const TRIM_IMAGE_PATHS: Record<string, Record<string, string>> = {
  "mazda3-sedan": {
    "25-s":
      "/siteassets/vehicles/2026/mazda3-sedan/04_btv/001_trims/34-jellies/a_2.5-s/2025-mazda-3-sedan-2.5-s",
    "25-s-select-sport":
      "/siteassets/vehicles/2026/mazda3-sedan/04_btv/001_trims/34-jellies/b_2.5-s-select-sport/2024-m3-select-sport-platinum-quartz.png",
    "25-s-preferred":
      "/siteassets/vehicles/2026/mazda3-sedan/04_btv/001_trims/34-jellies/c_2.5-s-preferred/2022-m3s-fwd-2-5s-preferred-package-deep-crystal-blue.png",
    "25-s-carbon":
      "/siteassets/vehicles/2026/mazda3-sedan/04_btv/001_trims/34-jellies/d_carbon-edition/2025-mazda-3-sedan-2.5-s-carbon-edition",
    "25-turbo-premium-plus":
      "/siteassets/vehicles/2026/mazda3-sedan/04_btv/001_trims/34-jellies/e_turbo-premium-plus/2025-mazda-3-sedan-2.5-turbo-premium-plus",
  },
  "mazda3-hatchback": {
    "25-s":
      "/siteassets/vehicles/2026/mazda3-hatchback/04_btv/001_trims/34-jellies/01_2.5-s/2026-mazda-3-hatchback-2.5-s",
    "25-s-select-sport":
      "/siteassets/vehicles/2026/mazda3-hatchback/04_btv/001_trims/34-jellies/02_2.5-s-select-sport/2026-mazda-3-hatchback-2.5-s-select-sport",
    "25-s-preferred":
      "/siteassets/vehicles/2026/mazda3-hatchback/04_btv/001_trims/34-jellies/03_2.5-s-preferred/2026-mazda-3-hatchback-2.5-s-preferred",
    "25-s-carbon":
      "/siteassets/vehicles/2026/mazda3-hatchback/04_btv/001_trims/34-jellies/04_2.5-s-carbon-edition/2025-mazda-3-hatchback-2.5-s-carbon-edition",
    "25-s-premium":
      "/siteassets/vehicles/2026/mazda3-hatchback/04_btv/001_trims/34-jellies/05_2.5-s-premium/2026-mazda-3-hatchback-2.5-s-premium",
    "25-turbo-premium-plus":
      "/siteassets/vehicles/2026/mazda3-hatchback/04_btv/001_trims/34-jellies/06_2.5-s-turbo-premium-plus/2026-mazda-3-hatchback-2.5-turbo-premium-plus",
  },
  "cx-30": {
    "25-s":
      "/siteassets/vehicles/2026/cx-30/04_btv/001_trims/34-jellies/2.5-s/2025-mazda-cx-30-2.5-s",
    "25-s-select-sport":
      "/siteassets/vehicles/2025/cx-30/04_btv/001_trims/34-jellies/02_-2.5-s-select-sport/2025-Mazda-CX-30-2.5-S-Select-Sport",
    "25-s-preferred":
      "/siteassets/vehicles/2025/cx-30/04_btv/001_trims/34-jellies/03_-2.5-s-preferred/2025-mazda-cx-30-2.5-s-preferred",
    "25-s-premium":
      "/siteassets/vehicles/2025/cx-30/04_btv/001_trims/34-jellies/05_-2.5-s-premium/carryover/2025-mazda-cx-30-2.5-s-premium",
    "25-s-aire-edition":
      "/siteassets/vehicles/2026/cx-30/04_btv/001_trims/34-jellies/2.5-s-aire-edition/2026-cx30-2-5-s-aire-aero-gray.png",
    "25-carbon-edition":
      "/siteassets/vehicles/2026/cx-30/04_btv/001_trims/34-jellies/2.5-s-carbon-edition/2026-cx30-2-5-s-carbon-edition-polymetal-gray.png",
    "25-turbo-aire-edition":
      "/siteassets/vehicles/2026/cx-30/04_btv/001_trims/34-jellies/2.5-s-turbo-aire-edition/2026-cx30-2-5-s-turbo-aire-aero-gray.png",
    "25-turbo-premium-plus":
      "/siteassets/vehicles/2025/cx-30/04_btv/001_trims/34-jellies/08_-2.5-turbo-premium-plus/2025-mazda-cx-30-2.5-turbo-premium-plus",
  },
  "cx-50": {
    "25-s-select":
      "/siteassets/vehicles/2026/cx-50/04_btv/001_trims/34-jellies/2026-cx50-2-5-s-select-ingotblue.png",
    "25-s-preferred":
      "/siteassets/vehicles/2026/cx-50/04_btv/001_trims/34-jellies/2026-cx50-2-5-s-preferred-machinegray.png",
    "25-s-meridian":
      "/siteassets/vehicles/2026/cx-50/04_btv/001_trims/34-jellies/meridian/2026-cx50-2-5-meridian-zirconsand.png",
    "25-s-premium":
      "/siteassets/vehicles/2026/cx-50/04_btv/001_trims/34-jellies/2026-cx50-2-5-s-premium-jetblack.png",
    "25-turbo":
      "/siteassets/vehicles/2026/cx-50/04_btv/001_trims/34-jellies/turbo/2026-cx50-2-5-turbo-soulred.png",
    "25-turbo-meridian":
      "/siteassets/vehicles/2026/cx-50/04_btv/001_trims/34-jellies/turbo-meridian/2026-cx50-2-5-turbo-meridian-polymetal-gray.png",
    "25-turbo-premium-plus":
      "/siteassets/vehicles/2026/cx-50/04_btv/001_trims/34-jellies/turbo-premium-plus/2026-cx50-2-5-turbo-premium-plues-cypress.png",
  },
  "cx-5": {
    "25-s":
      "/siteassets/vehicles/2026/cx-5/04_btv/001_trims/34-jellies/2.5-s/2026-cx5-2-5s-jetblack.png",
    "25-s-select":
      "/siteassets/vehicles/2026/cx-5/04_btv/001_trims/34-jellies/2.5-s-select/2026-Mazda-CX-5-2.5-S-Select.png",
    "25-s-preferred":
      "/siteassets/vehicles/2026/cx-5/04_btv/001_trims/34-jellies/2.5-s-preferred/2026-Mazda-CX-5-2.5-S-Preferred.png",
    "25-s-premium":
      "/siteassets/vehicles/2026/cx-5/04_btv/001_trims/34-jellies/2.5-s-premium/2026-cx5-2-5-premium-aerogray.png",
    "25-s-premium-plus":
      "/siteassets/vehicles/2026/cx-5/04_btv/001_trims/34-jellies/2.5-s-premium-plus/2026-cx5-2-5-premium-plus-soul-red.png",
  },
  "cx-70": {
    "33-turbo-preferred":
      "/siteassets/vehicles/2026/cx-70/04_btv/001_trims/34-jellies/turbo-preferred/mazda-cx-70-3.3-turbo--preferred",
    "33-turbo-premium":
      "/siteassets/vehicles/2026/cx-70/04_btv/001_trims/34-jellies/turbo-premium/mazda-cx-70-3.3-turbo-premium.png",
    "33-turbo-premium-plus":
      "/siteassets/vehicles/2026/cx-70/04_btv/001_trims/34-jellies/turbo-premium-plus/mazda-cx-70-3.3-turbo-premium-plus.png",
    "33-turbo-s-premium":
      "/siteassets/vehicles/2026/cx-70/04_btv/001_trims/34-jellies/turbo-s-premium/mazda-cx-70-3.3-turbo-s-premium.png",
    "33-turbo-s-premium-plus":
      "/siteassets/vehicles/2026/cx-70/04_btv/001_trims/34-jellies/turbo-s-premium-plus/mazda-cx-70-3.3-turbo-s-premium-plus.png",
    "phev-sc":
      "/siteassets/vehicles/2026/cx-70-phev/04_btv/001_trims/34-jellies/phev-sc-knvbnaa/2026-mazda-cx-70-phev-sc-polymetalgray",
    "phev-sc-plus":
      "/siteassets/vehicles/2026/cx-70-phev/04_btv/001_trims/34-jellies/phev-sc-plus-knvbnab/2026-mazda-cx-70-phev-sc-plus-rhodiumwhite",
  },
  "cx-90": {
    "33-turbo-select":
      "/siteassets/vehicles/2026/cx-90/04_btv/001_trims/34-jellies/3.3-turbo-select/2025-cx90-3.3-turbo-select-jetblack.png",
    "33-turbo-preferred":
      "/siteassets/vehicles/2025/cx-90--cx-90-phev/06_btv/cx-90-inline/001_trims/34-jellies/3.3-turbo-preferred/2025-mazda-cx-90-3.3-turbo-preferred",
    "33-turbo-premium-sport":
      "/siteassets/vehicles/2026/cx-90/04_btv/001_trims/34-jellies/3.3-turbo-premium-sport/2026-cx90-inline-6-turbo-premium-sport-machine-gray.png",
    "33-turbo-premium-plus":
      "/siteassets/vehicles/2026/cx-90/04_btv/001_trims/34-jellies/3.3-turbo-premium-plus/2026-cx90-inline-6-premium-plus-artisan-red.png",
    "33-turbo-s-premium-sport":
      "/siteassets/vehicles/2026/cx-90/04_btv/001_trims/34-jellies/3.3-turbo-s-premium-sport/2026-cx90-inline-6-turbo-s-premium-sport-polymetal-gray.png",
    "33-turbo-s-premium-plus":
      "/siteassets/vehicles/2025/cx-90--cx-90-phev/06_btv/cx-90-inline/001_trims/34-jellies/3.3-turbo-s-premium-plus/2025-mazda-cx-90-3.3-turbo-s-premium-plus",
    "phev-preferred":
      "/siteassets/vehicles/2026/cx-90-phev/04_btv/004_exterior/ext.-360s/2026-phev-premium-sport/41w/e360-my26-cx90-phev-premium-sport-jetblack-000.jpg",
    "phev-premium-sport":
      "/siteassets/vehicles/2025/cx-90--cx-90-phev/06_btv/cx-90-phev/001_trims/34-jellies/phev-premium-sport/2025-mazda-cx-90-phev-premium-sport",
    "phev-premium-plus":
      "/siteassets/vehicles/2025/cx-90--cx-90-phev/06_btv/cx-90-phev/001_trims/34-jellies/phev-premium-plus/2025-mazda-cx-90-phev-premium-plus",
  },
  "mx-5-miata": {
    sport:
      "/siteassets/vehicles/2026/mx-5-st/04_btv/001_trims/34-jellies/sport/2026-mazda-mx-5-miata-sport.png",
    club: "/siteassets/vehicles/2026/mx-5-st/04_btv/001_trims/34-jellies/club/2026-mazda-mx-5-miata-club.png",
    "grand-touring":
      "/siteassets/vehicles/2026/mx-5-st/04_btv/001_trims/34-jellies/grand-touring/2026-mazda-mx-5-miata-grand-touring.png",
    "grand-touring-at":
      "/siteassets/vehicles/2026/mx-5-st/04_btv/004_exterior/ext.-360s/grand-touring/46g-machine-gray/e360-my26-mx-5-st-gt-machinegray-000.jpg",
  },
  "mx-5-miata-rf": {
    club: "/siteassets/vehicles/2026/mx-5-rf/04_btv/001_trims/34-jellies/club/2026-mx5-rf-club-aerogray.png",
    "grand-touring":
      "/siteassets/vehicles/2026/mx-5-rf/04_btv/001_trims/34-jellies/grand-touring/2026-mx5-rf-gt-soulred.png",
    "grand-touring-at":
      "/siteassets/vehicles/2026/mx-5-rf/04_btv/004_exterior/ext.-360s/grand-touring/46g-machine-gray/e360-2026-mx5-rf-gt-machinegray-000.jpg",
  },
  "cx-50-hybrid": {
    "hybrid-preferred":
      "/siteassets/vehicles/2025/cx-50-hybrid/04_btv/001_trims/34-jellies/hybrid-preferred/2025-mazda-cx-50-hybrid-preferred",
    "hybrid-premium":
      "/siteassets/vehicles/2026/cx-50-hybrid/04_btv/004_exterior/ext.-360s/hybrid-premium/machine-gray-46g/e360-my25-cx50-hybrid-premium-machinegray-000.jpg",
    "hybrid-premium-plus":
      "/siteassets/vehicles/2025/cx-50-hybrid/04_btv/001_trims/34-jellies/hybrid-premium-plus/2025-mazda-cx-50-hybrid-premium-plus",
  },
};

const MODEL_SINGLE_IMAGE_FALLBACK_PATHS: Record<string, string> = {
  "mazda3-sedan":
    "/siteassets/vehicles/2026/mazda3-sedan/04_btv/001_trims/34-jellies/b_2.5-s-select-sport/2024-m3-select-sport-platinum-quartz.png",
  "mazda3-hatchback":
    "/siteassets/vehicles/2026/mazda3-hatchback/04_btv/004_exterior/ext.-360s/01_2.5-s/41w-2/e360-my26-m3-hatchback-2-5-s-jet-black-000.jpg",
  "cx-30":
    "/siteassets/vehicles/2026/cx-30/04_btv/001_trims/34-jellies/2.5-s-carbon-edition/2026-cx30-2-5-s-carbon-edition-polymetal-gray.png",
  "cx-50":
    "/siteassets/vehicles/2026/cx-50/04_btv/001_trims/34-jellies/2026-cx50-2-5-s-preferred-machinegray.png",
  "cx-5":
    "/siteassets/vehicles/2026/cx-5/04_btv/001_trims/34-jellies/2.5-s/2026-cx5-2-5s-jetblack.png",
  "cx-70":
    "/siteassets/vehicles/2026/cx-70/04_btv/001_trims/34-jellies/turbo-premium/mazda-cx-70-3.3-turbo-premium.png",
  "cx-90":
    "/siteassets/vehicles/2026/cx-90/04_btv/001_trims/34-jellies/3.3-turbo-select/2025-cx90-3.3-turbo-select-jetblack.png",
  "mx-5-miata":
    "/siteassets/vehicles/2026/mx-5-st/04_btv/001_trims/34-jellies/sport/2026-mazda-mx-5-miata-sport.png",
  "mx-5-miata-rf":
    "/siteassets/vehicles/2026/mx-5-rf/04_btv/001_trims/34-jellies/club/2026-mx5-rf-club-aerogray.png",
  "cx-50-hybrid":
    "/siteassets/vehicles/2026/cx-50-hybrid/04_btv/001_trims/34-jellies/2026-cx50-hybrid-premium-ingotblue.png",
};

function getTrimImageUrl(modelId: string, trimId: string): string {
  const path = TRIM_IMAGE_PATHS[modelId]?.[trimId];
  const fallbackPath = MODEL_SINGLE_IMAGE_FALLBACK_PATHS[modelId];
  if (!path && !fallbackPath) return getMazdaUsaImageUrl(modelId);
  const resolvedPath = path ?? fallbackPath;
  if (!resolvedPath) return getMazdaUsaImageUrl(modelId);
  if (resolvedPath.startsWith("http")) return resolvedPath;
  return `${MAZDA_USA_ORIGIN}${resolvedPath}?w=720`;
}

const MODEL_DIMENSIONS: Record<string, TrimFeatureItem[]> = {
  "mazda3-sedan": [
    {
      name: "Exterior size",
      description: "Length 183.5 in, width 70.7 in, height 56.9 in.",
    },
    {
      name: "Wheelbase",
      description: "107.3 in.",
    },
    {
      name: "Cargo capacity",
      description: "13.2 cu ft trunk volume.",
    },
  ],
  "mazda3-hatchback": [
    {
      name: "Exterior size",
      description: "Length 175.6 in, width 70.7 in, height 56.7 in.",
    },
    {
      name: "Wheelbase",
      description: "107.3 in.",
    },
    {
      name: "Cargo capacity",
      description: "20.1 cu ft behind rear seats.",
    },
  ],
  "cx-30": [
    {
      name: "Exterior size",
      description: "Length 173.0 in, width 70.7 in, height 61.7 in.",
    },
    {
      name: "Wheelbase",
      description: "104.5 in.",
    },
    {
      name: "Cargo capacity",
      description: "20.2 cu ft behind rear seats.",
    },
  ],
  "cx-50": [
    {
      name: "Exterior size",
      description: "Length 185.8 in, width 75.6 in, height 63.5 in.",
    },
    {
      name: "Wheelbase",
      description: "110.8 in.",
    },
    {
      name: "Cargo capacity",
      description: "31.4 cu ft behind rear seats.",
    },
  ],
  "cx-5": [
    {
      name: "Exterior size",
      description: "Length 180.1 in, width 72.6 in, height 65.4 in.",
    },
    {
      name: "Wheelbase",
      description: "106.2 in.",
    },
    {
      name: "Cargo capacity",
      description: "30.8 cu ft behind rear seats.",
    },
  ],
  "cx-70": [
    {
      name: "Exterior size",
      description: "Length 201.6 in, width 77.6 in, height 68.2 in.",
    },
    {
      name: "Wheelbase",
      description: "122.8 in.",
    },
    {
      name: "Cargo capacity",
      description: "39.6 cu ft behind rear seats.",
    },
  ],
  "cx-90": [
    {
      name: "Exterior size",
      description: "Length 201.6 in, width 77.6 in, height 68.7 in.",
    },
    {
      name: "Wheelbase",
      description: "122.8 in.",
    },
    {
      name: "Cargo capacity",
      description: "14.9 cu ft behind third row.",
    },
  ],
  "mx-5-miata": [
    {
      name: "Exterior size",
      description: "Length 154.1 in, width 68.3 in, height 48.6 in.",
    },
    {
      name: "Wheelbase",
      description: "90.9 in.",
    },
    {
      name: "Cargo capacity",
      description: "4.6 cu ft trunk volume.",
    },
  ],
  "mx-5-miata-rf": [
    {
      name: "Exterior size",
      description: "Length 154.1 in, width 68.3 in, height 49.0 in.",
    },
    {
      name: "Wheelbase",
      description: "90.9 in.",
    },
    {
      name: "Cargo capacity",
      description: "4.6 cu ft trunk volume.",
    },
  ],
  "cx-50-hybrid": [
    {
      name: "Exterior size",
      description: "Length 185.8 in, width 75.6 in, height 63.9 in.",
    },
    {
      name: "Wheelbase",
      description: "110.8 in.",
    },
    {
      name: "Cargo capacity",
      description: "29.2 cu ft behind rear seats.",
    },
  ],
};

const MODEL_DIMENSION_DIFF_2026: Record<string, TrimFeatureItem[]> = {
  "cx-5": [
    {
      name: "Difference vs 2025",
      description:
        "Length +4.5 in and wheelbase +4.5 in vs 2025 (cargo floor is also about 2.0 in longer).",
    },
  ],
};

type ModelColorPalette = {
  core: string[];
  premium: string[];
  topTrim: string[];
};

type ModelTrimColorAvailability = Record<string, string[]>;

const MODEL_COLOR_PALETTES: Record<string, ModelColorPalette> = {
  "mazda3-sedan": {
    core: [
      "Jet Black Mica + Black Cloth",
      "Deep Crystal Blue Mica + Black Cloth",
    ],
    premium: [
      "Machine Gray Metallic + Greige Leatherette",
      "Snowflake White Pearl Mica + Black Leatherette",
    ],
    topTrim: [
      "Soul Red Crystal Metallic + Red Leather",
      "Polymetal Gray Metallic + Terracotta Leather",
    ],
  },
  "mazda3-hatchback": {
    core: [
      "Jet Black Mica + Black Cloth",
      "Deep Crystal Blue Mica + Black Cloth",
    ],
    premium: [
      "Polymetal Gray Metallic + Red Leatherette",
      "Machine Gray Metallic + Black Leatherette",
    ],
    topTrim: [
      "Soul Red Crystal Metallic + Red Leather",
      "Aero Gray Metallic + Black Leather",
    ],
  },
  "cx-30": {
    core: [
      "Jet Black Mica + Black Cloth",
      "Deep Crystal Blue Mica + Black Cloth",
    ],
    premium: [
      "Platinum Quartz Metallic + Greige Leatherette",
      "Snowflake White Pearl Mica + Black Leatherette",
    ],
    topTrim: [
      "Soul Red Crystal Metallic + White Leather",
      "Machine Gray Metallic + Terracotta Leather",
    ],
  },
  "cx-50": {
    core: [
      "Jet Black Mica + Black Leatherette",
      "Ingot Blue Metallic + Black Leatherette",
    ],
    premium: [
      "Polymetal Gray Metallic + Black Leather",
      "Wind Chill Pearl + Black Leather",
    ],
    topTrim: [
      "Zircon Sand Metallic + Terracotta Leather",
      "Machine Gray Metallic + Black Leather",
    ],
  },
  "cx-50-hybrid": {
    core: [
      "Jet Black Mica + Black Leatherette",
      "Polymetal Gray Metallic + Black Leatherette",
    ],
    premium: [
      "Wind Chill Pearl + Black Leather",
      "Ingot Blue Metallic + Black Leather",
    ],
    topTrim: [
      "Soul Red Crystal Metallic + Black Leather",
      "Machine Gray Metallic + Black Leather",
    ],
  },
  "cx-5": {
    core: ["Jet Black Mica + Black Cloth", "Navy Blue Mica + Black Cloth"],
    premium: [
      "Rhodium White Premium + Black Leatherette & Embossed Microsuede",
      "Machine Gray Metallic + Black Leatherette & Embossed Microsuede",
    ],
    topTrim: [
      "Soul Red Crystal Metallic + Sport Tan Leather",
      "Aero Gray Metallic + Black Leather",
      "Polymetal Gray Metallic + Sport Tan Leather",
    ],
  },
  "cx-70": {
    core: [
      "Jet Black Mica + Black Leatherette",
      "Rhodium White Metallic + Black Leatherette",
    ],
    premium: [
      "Polymetal Gray Metallic + Black Leather",
      "Melting Copper Metallic + Tan Nappa Leather",
    ],
    topTrim: [
      "Soul Red Crystal Metallic + Black Nappa Leather",
      "Zircon Sand Metallic + Tan Nappa Leather",
    ],
  },
  "cx-90": {
    core: [
      "Jet Black Mica + Black Leatherette",
      "Sonic Silver Metallic + Black Leatherette",
    ],
    premium: [
      "Platinum Quartz Metallic + Black Leather",
      "Rhodium White Metallic + Tan Nappa Leather",
    ],
    topTrim: [
      "Artisan Red Premium + White Nappa Leather",
      "Machine Gray Metallic + Black Nappa Leather",
    ],
  },
  "mx-5-miata": {
    core: ["Jet Black Mica + Black Cloth", "Aero Gray Metallic + Black Cloth"],
    premium: [
      "Snowflake White Pearl Mica + Black Leather",
      "Deep Crystal Blue Mica + Black Leather",
    ],
    topTrim: [
      "Soul Red Crystal Metallic + Tan Nappa Leather",
      "Machine Gray Metallic + Black Leather",
    ],
  },
  "mx-5-miata-rf": {
    core: ["Jet Black Mica + Black Cloth", "Aero Gray Metallic + Black Cloth"],
    premium: [
      "Snowflake White Pearl Mica + Black Leather",
      "Machine Gray Metallic + Black Leather",
    ],
    topTrim: [
      "Soul Red Crystal Metallic + Tan Nappa Leather",
      "Deep Crystal Blue Mica + Black Leather",
    ],
  },
};

const MODEL_TRIM_COLOR_AVAILABILITY: Record<string, ModelTrimColorAvailability> = {
  "cx-5": {
    "25-s": [
      "Jet Black Mica + Black Cloth",
      "Rhodium White Premium + Black Cloth",
      "Navy Blue Mica + Black Cloth",
      "Machine Gray Metallic + Black Cloth",
    ],
    "25-s-select": [
      "Jet Black Mica + Black Leatherette & Embossed Microsuede",
      "Rhodium White Premium + Black Leatherette & Embossed Microsuede",
      "Navy Blue Mica + Black Leatherette & Embossed Microsuede",
      "Soul Red Crystal Metallic + Black Leatherette & Embossed Microsuede",
      "Aero Gray Metallic + Black Leatherette & Embossed Microsuede",
      "Polymetal Gray Metallic + Black Leatherette & Embossed Microsuede",
      "Machine Gray Metallic + Black Leatherette & Embossed Microsuede",
    ],
    "25-s-preferred": [
      "Jet Black Mica + Black Leatherette & Embossed Microsuede",
      "Rhodium White Premium + Black Leatherette & Embossed Microsuede",
      "Navy Blue Mica + Black Leatherette & Embossed Microsuede",
      "Soul Red Crystal Metallic + Black Leatherette & Embossed Microsuede",
      "Aero Gray Metallic + Black Leatherette & Embossed Microsuede",
      "Polymetal Gray Metallic + Black Leatherette & Embossed Microsuede",
      "Machine Gray Metallic + Black Leatherette & Embossed Microsuede",
    ],
    "25-s-premium": [
      "Jet Black Mica + Black Leather",
      "Rhodium White Premium + Black Leather",
      "Navy Blue Mica + Black Leather",
      "Soul Red Crystal Metallic + Sport Tan Leather",
      "Aero Gray Metallic + Black Leather",
      "Polymetal Gray Metallic + Sport Tan Leather",
      "Machine Gray Metallic + Black Leather",
    ],
    "25-s-premium-plus": [
      "Jet Black Mica + Black Leather",
      "Rhodium White Premium + Black Leather",
      "Navy Blue Mica + Black Leather",
      "Soul Red Crystal Metallic + Sport Tan Leather",
      "Aero Gray Metallic + Black Leather",
      "Polymetal Gray Metallic + Sport Tan Leather",
      "Machine Gray Metallic + Black Leather",
    ],
  },
};

function getTrimPerfSpec(modelId: string, trimId: string): TrimPerfSpec | null {
  if (modelId === "mazda3-sedan" || modelId === "mazda3-hatchback") {
    return trimId.includes("turbo")
      ? { eng: "2.5T", hp: "250", trq: "320" }
      : { eng: "2.5", hp: "186", trq: "186" };
  }
  if (modelId === "cx-30") {
    return trimId.includes("turbo")
      ? { eng: "2.5T", hp: "250", trq: "320" }
      : { eng: "2.5", hp: "186", trq: "186" };
  }
  if (modelId === "cx-50") {
    return trimId.includes("turbo")
      ? { eng: "2.5T", hp: "256", trq: "320" }
      : { eng: "2.5", hp: "187", trq: "185" };
  }
  if (modelId === "cx-50-hybrid") {
    return { eng: "2.5H", hp: "219", trq: "163" };
  }
  if (modelId === "cx-5") {
    return { eng: "2.5", hp: "187", trq: "186" };
  }
  if (modelId === "cx-70" || modelId === "cx-90") {
    if (trimId.startsWith("phev")) {
      return { eng: "2.5 PHEV", hp: "323", trq: "369" };
    }
    if (trimId.includes("turbo-s")) {
      return { eng: "3.3T S", hp: "340", trq: "369" };
    }
    return { eng: "3.3T", hp: "280", trq: "332" };
  }
  if (modelId === "mx-5-miata" || modelId === "mx-5-miata-rf") {
    return { eng: "2.0", hp: "181", trq: "151" };
  }
  return null;
}

function getModelDimensions(modelId: string): TrimFeatureItem[] {
  return MODEL_DIMENSIONS[modelId] ?? [];
}

function getModelDimensionDiff(modelId: string, year: ModelYear): TrimFeatureItem[] {
  if (year !== 2026) return [];
  return MODEL_DIMENSION_DIFF_2026[modelId] ?? [];
}

function getColorCombinationsForTrim(
  modelId: string,
  trimId: string,
  trimName: string,
): string[] {
  const explicitAvailability = MODEL_TRIM_COLOR_AVAILABILITY[modelId]?.[trimId];
  if (explicitAvailability && explicitAvailability.length > 0) {
    return explicitAvailability;
  }

  const palette = MODEL_COLOR_PALETTES[modelId];
  if (!palette) return [];
  return [...palette.core, ...palette.premium, ...palette.topTrim];
}

type ColorCombination = {
  exterior: string;
  interior: string;
};

type TrimColorCombinationFeature = {
  name: string;
  combinations: ColorCombination[];
  note?: string;
};

type TrimWheelSpecFeature = {
  name: string;
  size: string;
  finish: string;
  note?: string;
};

function toColorCombination(combo: string): ColorCombination | null {
  const [exterior, interior] = combo.split(" + ");
  if (!exterior || !interior) return null;
  return { exterior, interior };
}

function colorHexFromName(colorName: string): string {
  const name = colorName.toLowerCase();
  if (name.includes("jet black") || name.includes("black")) return "#1f2937";
  if (name.includes("white")) return "#f5f5f4";
  if (name.includes("soul red") || name.includes("artisan red")) return "#b91c1c";
  if (name.includes("blue")) return "#1e3a8a";
  if (name.includes("machine gray") || name.includes("aero gray")) return "#6b7280";
  if (name.includes("polymetal gray")) return "#4b5563";
  if (name.includes("platinum quartz")) return "#d6d3d1";
  if (name.includes("zircon sand")) return "#a8a29e";
  if (name.includes("copper") || name.includes("tan") || name.includes("brown")) return "#92400e";
  if (name.includes("silver")) return "#9ca3af";
  return "#71717a";
}

function getModelTrimColorFeatures(
  modelId: string,
  trims: ModelTrim[],
): TrimColorCombinationFeature[] {
  return trims.map((trim) => {
    const combinations = getColorCombinationsForTrim(
      modelId,
      trim.id,
      trim.name,
    )
      .map(toColorCombination)
      .filter((item): item is ColorCombination => item !== null);

    return {
      name: trim.name,
      combinations,
      note:
        combinations.length > 0
          ? undefined
          : "Please confirm current exterior/interior combinations with Mazda USA build-and-price.",
    };
  });
}

function getWheelSpecForTrim(
  modelId: string,
  trimId: string,
  trimName: string,
): Omit<TrimWheelSpecFeature, "name"> {
  const key = `${trimId} ${trimName}`.toLowerCase();

  if (modelId === "mazda3-sedan" || modelId === "mazda3-hatchback") {
    if (key.includes("turbo")) {
      return { size: '18"', finish: "Black Metallic alloy" };
    }
    if (key.includes("preferred") || key.includes("carbon") || key.includes("premium")) {
      return { size: '18"', finish: "Alloy (Black / Dark finish by package)" };
    }
    return { size: '16"', finish: "Silver Metallic alloy" };
  }

  if (modelId === "cx-30") {
    if (key.includes("s ") && !key.includes("select")) {
      return { size: '16"', finish: "Gray Metallic alloy" };
    }
    return { size: '18"', finish: "Black Metallic alloy" };
  }

  if (modelId === "cx-50") {
    if (key.includes("meridian")) {
      return { size: '18"', finish: "Black Metallic alloy (all-terrain setup)" };
    }
    if (key.includes("turbo") || key.includes("premium")) {
      return { size: '20"', finish: "Black Metallic alloy" };
    }
    return { size: '17"', finish: "Black Metallic alloy" };
  }

  if (modelId === "cx-50-hybrid") {
    if (key.includes("premium plus")) {
      return { size: '19"', finish: "Black Metallic alloy" };
    }
    return { size: '17"', finish: "Black Metallic alloy" };
  }

  if (modelId === "cx-5") {
    if (key.includes("premium") || key.includes("preferred")) {
      return { size: '19"', finish: "Black Metallic alloy" };
    }
    return { size: '17"', finish: "Gray Metallic alloy" };
  }

  if (modelId === "cx-70" || modelId === "cx-90") {
    if (key.includes("premium plus") || key.includes("turbo s premium")) {
      return { size: '21"', finish: "Machined with Black Metallic accents" };
    }
    return { size: '19"', finish: "Silver Metallic alloy" };
  }

  if (modelId === "mx-5-miata" || modelId === "mx-5-miata-rf") {
    if (key.includes("sport")) {
      return { size: '16"', finish: "Dark Silver Metallic alloy" };
    }
    return { size: '17"', finish: "Gunmetal alloy" };
  }

  return {
    size: "N/A",
    finish: "Verify on Mazda USA build-and-price",
    note: "Wheel specification varies by package and market.",
  };
}

function getModelTrimWheelSpecs(
  modelId: string,
  trims: ModelTrim[],
): TrimWheelSpecFeature[] {
  return trims.map((trim) => {
    const wheel = getWheelSpecForTrim(modelId, trim.id, trim.name);
    return {
      name: trim.name,
      size: wheel.size,
      finish: wheel.finish,
      note: wheel.note,
    };
  });
}

function TrimColorCombinationGrid({
  item,
}: {
  item: TrimColorCombinationFeature;
}) {
  return (
    <li className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900/50">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {item.name}
      </p>
      {item.note ? (
        <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {item.note}
        </p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {item.combinations.map((combo, idx) => (
            <li key={`${item.name}-${combo.exterior}-${combo.interior}-${idx}`}>
              <div className="flex items-center gap-2">
                <span
                  className="h-4 w-4 rounded border border-zinc-300 dark:border-zinc-600"
                  style={{ backgroundColor: colorHexFromName(combo.exterior) }}
                  title={`Exterior: ${combo.exterior}`}
                />
                <span
                  className="h-4 w-4 rounded border border-zinc-300 dark:border-zinc-600"
                  style={{ backgroundColor: colorHexFromName(combo.interior) }}
                  title={`Interior: ${combo.interior}`}
                />
                <span className="text-xs text-zinc-700 dark:text-zinc-300">
                  {combo.exterior} + {combo.interior}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function TrimPerfRow({ spec }: { spec: TrimPerfSpec }) {
  return (
    <div className="mt-3 flex items-end justify-start gap-3 text-zinc-900 dark:text-zinc-100 sm:mt-4 sm:gap-4">
      <div className="min-w-0">
        <p className="text-[0.625rem] font-medium tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
          Eng
        </p>
        <p className="mt-0.5 text-2xl leading-none font-light tabular-nums sm:text-[2rem]">
          {spec.eng}
        </p>
      </div>
      <span className="h-10 w-px self-end bg-zinc-200 dark:bg-zinc-700" />
      <div className="min-w-0">
        <p className="text-[0.625rem] font-medium tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
          Hp
        </p>
        <p className="mt-0.5 text-2xl leading-none font-light tabular-nums sm:text-[2rem]">
          {spec.hp}
        </p>
      </div>
      <span className="h-10 w-px self-end bg-zinc-200 dark:bg-zinc-700" />
      <div className="min-w-0">
        <p className="text-[0.625rem] font-medium tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
          Trq
        </p>
        <p className="mt-0.5 text-2xl leading-none font-light tabular-nums sm:text-[2rem]">
          {spec.trq}
        </p>
      </div>
    </div>
  );
}

export function MazdaModelExplorer() {
  const [year, setYear] = useState<ModelYear>(2026);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareStep, setCompareStep] = useState<1 | 2>(1);
  const [compareFirst, setCompareFirst] = useState<ComparePick | null>(null);
  const [comparePair, setComparePair] = useState<{
    a: ComparePick;
    b: ComparePick;
  } | null>(null);

  const models = useMemo(() => getModelsForYear(year), [year]);

  const selected = useMemo(
    () => models.find((m) => m.id === selectedId) ?? null,
    [models, selectedId],
  );

  const firstPickLabel = useMemo(
    () =>
      compareFirst ? trimLabelForPick(compareFirst, models) : null,
    [compareFirst, models],
  );

  function onYearChange(next: ModelYear) {
    setYear(next);
    setSelectedId(null);
    setCompareMode(false);
    setCompareStep(1);
    setCompareFirst(null);
    setComparePair(null);
  }

  function closeTrimsModal() {
    setSelectedId(null);
    if (!compareMode) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function startCompareMode() {
    setCompareMode(true);
    setCompareStep(1);
    setCompareFirst(null);
    setComparePair(null);
    setSelectedId(null);
  }

  function cancelCompareMode() {
    setCompareMode(false);
    setCompareStep(1);
    setCompareFirst(null);
    setSelectedId(null);
  }

  function onTrimPickedForCompare(trimId: string) {
    if (!selected) return;
    const pick: ComparePick = { modelId: selected.id, trimId };
    setSelectedId(null);
    if (compareStep === 1) {
      setCompareFirst(pick);
      setCompareStep(2);
      return;
    }
    if (compareFirst) {
      setComparePair({ a: compareFirst, b: pick });
      setCompareMode(false);
      setCompareStep(1);
      setCompareFirst(null);
    }
  }

  function closeComparePairModal() {
    setComparePair(null);
  }

  const trimModalCompareSlot = compareMode
    ? compareStep === 1
      ? 1
      : 2
    : undefined;

  return (
    <div
      className="mx-auto w-full min-w-0 max-w-6xl px-3 pt-[max(2rem,env(safe-area-inset-top))] pb-8 sm:px-6 sm:pt-10 sm:pb-10 lg:px-8"
      suppressHydrationWarning
    >
      <header className="mb-8 text-center sm:mb-10 md:mb-12">
        <p className="text-base font-semibold tracking-wide text-zinc-800 uppercase sm:text-lg md:text-xl dark:text-zinc-200">
          Mazda model lineup
        </p>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 text-balance sm:mt-4 sm:text-2xl md:text-3xl dark:text-zinc-50">
          Choose a model
        </h1>
        <p className="mx-auto mt-3 max-w-xl px-1 text-sm text-pretty text-zinc-600 sm:text-base dark:text-zinc-400">
          Pick a model year, tap a vehicle, and compare trims in the overlay
          that opens on top of this list.
        </p>

        <div className="mt-5 flex flex-col items-center gap-3 sm:mt-6">
          <button
            type="button"
            onClick={() =>
              compareMode ? cancelCompareMode() : startCompareMode()
            }
            className={`inline-flex min-h-11 w-full max-w-md items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors sm:min-h-0 sm:w-auto sm:py-2 ${
              compareMode
                ? "border-zinc-300 bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                : "border-zinc-300 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            }`}
            aria-pressed={compareMode}
          >
            {compareMode ? "Cancel compare" : "Compare two models"}
          </button>
        </div>

        {compareMode ? (
          <div
            className="mx-auto mt-4 max-w-xl rounded-xl border border-[var(--mazda-accent,#c40012)]/35 bg-[var(--mazda-accent,#c40012)]/5 px-4 py-3 text-center text-sm text-pretty text-zinc-800 dark:border-[var(--mazda-accent,#c40012)]/45 dark:bg-[var(--mazda-accent,#c40012)]/10 dark:text-zinc-200"
            role="status"
            aria-live="polite"
          >
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">
              {compareStep === 1
                ? "Step 1 of 2: Tap a model, then choose a trim"
                : "Step 2 of 2: Tap another model, then choose a trim"}
            </p>
            {compareStep === 2 && firstPickLabel ? (
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                First selection:{" "}
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {firstPickLabel}
                </span>
              </p>
            ) : null}
          </div>
        ) : null}

        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:inline-flex sm:flex-nowrap sm:gap-0 sm:rounded-full sm:border sm:border-zinc-200 sm:bg-zinc-100/80 sm:p-1 dark:sm:border-zinc-700 dark:sm:bg-zinc-900/80"
          role="group"
          aria-label="Model year"
        >
          {MAZDA_MODEL_YEARS.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => onYearChange(y)}
              className={`min-h-11 min-w-[5.5rem] rounded-full px-5 py-2.5 text-sm font-medium transition-colors sm:min-h-0 sm:py-2 ${
                year === y
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                  : "border border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 sm:border-0 sm:bg-transparent dark:sm:bg-transparent"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </header>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {models.map((model) => (
          <li key={model.id}>
            <ModelCard
              model={model}
              year={year}
              selected={selectedId === model.id}
              compareHint={compareMode}
              onSelect={() => setSelectedId(model.id)}
            />
          </li>
        ))}
      </ul>

      {selected ? (
        <TrimsModal
          model={selected}
          year={year}
          onClose={closeTrimsModal}
          compareSlot={trimModalCompareSlot}
          onPickTrimForCompare={compareMode ? onTrimPickedForCompare : undefined}
        />
      ) : null}

      {comparePair ? (
        <CompareTrimsModal
          year={year}
          models={models}
          pickA={comparePair.a}
          pickB={comparePair.b}
          onClose={closeComparePairModal}
        />
      ) : null}
    </div>
  );
}

function SharedSafetyCompareBlock({ items }: { items: TrimFeatureItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-3 sm:p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
      <h4 className="text-[0.6875rem] font-semibold tracking-wide text-zinc-800 uppercase dark:text-zinc-200">
        Standard on all trims
      </h4>
      <ul className="mt-2 flex flex-col gap-2.5">
        {items.map((item, i) => (
          <TrimFeatureLine
            key={`shared-${i}-${item.name}`}
            feature={item}
            bulletClassName="mt-2 bg-zinc-400 dark:bg-zinc-500"
            titleClassName="text-xs font-medium text-zinc-800 dark:text-zinc-200"
          />
        ))}
      </ul>
    </div>
  );
}

function CompareTrimsModal({
  year,
  models,
  pickA,
  pickB,
  onClose,
}: {
  year: ModelYear;
  models: MazdaModel[];
  pickA: ComparePick;
  pickB: ComparePick;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const modelA = models.find((m) => m.id === pickA.modelId);
  const modelB = models.find((m) => m.id === pickB.modelId);
  const lineA = useMemo(() => getModelTrimLine(pickA.modelId), [pickA.modelId]);
  const lineB = useMemo(() => getModelTrimLine(pickB.modelId), [pickB.modelId]);
  const trimsA = lineA?.trims ?? [];
  const trimsB = lineB?.trims ?? [];
  const trimA = lineA?.trims.find((t) => t.id === pickA.trimId);
  const trimB = lineB?.trims.find((t) => t.id === pickB.trimId);
  const idxA = findTrimIndex(trimsA, pickA.trimId);
  const idxB = findTrimIndex(trimsB, pickB.trimId);

  const previousNameA =
    trimA && !trimA.hidePreviousTrimComparison && idxA > 0
      ? (trimsA[idxA - 1]?.name ?? null)
      : null;
  const previousNameB =
    trimB && !trimB.hidePreviousTrimComparison && idxB > 0
      ? (trimsB[idxB - 1]?.name ?? null)
      : null;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  useLayoutEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  const missing =
    !modelA ||
    !modelB ||
    !trimA ||
    !trimB ||
    idxA < 0 ||
    idxB < 0;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4"
      aria-hidden={false}
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/55 backdrop-blur-[1px] transition-opacity dark:bg-black/65"
        aria-label="Close comparison"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[min(92dvh,64rem)] w-full max-w-6xl flex-col shadow-2xl sm:max-h-[min(90dvh,64rem)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-trims-heading"
      >
        <div className="flex max-h-[inherit] min-h-0 flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950 sm:rounded-2xl">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6 sm:pb-6 md:p-8 md:pb-8">
            <div className="mb-6 flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-start sm:justify-between dark:border-zinc-700">
              <div>
                <h2
                  id="compare-trims-heading"
                  className="text-balance text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl md:text-2xl dark:text-zinc-50"
                >
                  Compare trims
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-pretty text-zinc-600 dark:text-zinc-400">
                  Starting MSRP and features side by side for the two trims you
                  selected ({year}).
                </p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="min-h-11 w-full shrink-0 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 sm:w-auto sm:min-h-0 sm:py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                Close
              </button>
            </div>

            {missing ? (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Could not load one or both trims. Close and try again.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                <div className="min-w-0 space-y-4">
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/50">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {year}
                    </p>
                    <p className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                      {modelA.name}
                    </p>
                    <p className="text-sm text-[var(--mazda-accent,#c40012)]">
                      {trimA.name}
                    </p>
                  </div>
                  <SharedSafetyCompareBlock
                    items={lineA?.sharedSafetyFeatures ?? []}
                  />
                  <TrimPricingCard
                    trim={trimA}
                    previousTrimName={previousNameA}
                    modelId={modelA.id}
                  />
                </div>
                <div className="min-w-0 space-y-4">
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/50">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {year}
                    </p>
                    <p className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                      {modelB.name}
                    </p>
                    <p className="text-sm text-[var(--mazda-accent,#c40012)]">
                      {trimB.name}
                    </p>
                  </div>
                  <SharedSafetyCompareBlock
                    items={lineB?.sharedSafetyFeatures ?? []}
                  />
                  <TrimPricingCard
                    trim={trimB}
                    previousTrimName={previousNameB}
                    modelId={modelB.id}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrimsModal({
  model,
  year,
  onClose,
  compareSlot,
  onPickTrimForCompare,
}: {
  model: MazdaModel;
  year: ModelYear;
  onClose: () => void;
  compareSlot?: 1 | 2;
  onPickTrimForCompare?: (trimId: string) => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const compareMode = Boolean(compareSlot && onPickTrimForCompare);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  useLayoutEffect(() => {
    closeBtnRef.current?.focus();
  }, [model.id]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      aria-hidden={false}
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/55 backdrop-blur-[1px] transition-opacity dark:bg-black/65"
        aria-label={
          compareMode
            ? "Close without choosing a trim"
            : "Close trim comparison"
        }
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[min(92dvh,64rem)] w-full max-w-6xl flex-col shadow-2xl sm:max-h-[min(90dvh,64rem)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="selected-model-trims-heading"
      >
        <div className="flex max-h-[inherit] min-h-0 flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950 sm:rounded-2xl">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6 sm:pb-6 md:p-8 md:pb-8">
            <TrimPricingSection
              model={model}
              year={year}
              onClose={onClose}
              closeButtonRef={closeBtnRef}
              compareSlot={compareSlot}
              onPickTrimForCompare={onPickTrimForCompare}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 1v8M1 5h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 5h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrimFeatureLine({
  feature,
  bulletClassName,
  titleClassName,
}: {
  feature: TrimFeatureItem;
  bulletClassName: string;
  titleClassName: string;
}) {
  const [open, setOpen] = useState(false);
  const descId = useId();

  return (
    <li className="flex gap-2.5 sm:gap-3">
      <span
        className={`mt-2 size-1.5 shrink-0 rounded-full ${bulletClassName}`}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className={`break-words text-pretty ${titleClassName}`}>
          {feature.name}
        </p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-0.5 inline-flex min-h-8 min-w-8 items-center justify-start p-0 text-left text-zinc-500 transition-colors hover:text-[var(--mazda-accent,#c40012)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mazda-accent,#c40012)] dark:text-zinc-400 dark:hover:text-zinc-200"
          aria-expanded={open}
          aria-controls={descId}
          aria-label={
            open
              ? `Hide description for ${feature.name}`
              : `Show description for ${feature.name}`
          }
        >
          {open ? (
            <MinusIcon className="shrink-0" />
          ) : (
            <PlusIcon className="shrink-0" />
          )}
        </button>
        {open ? (
          <p
            id={descId}
            className="mt-1 border-l-2 border-zinc-200 pl-3 text-xs leading-relaxed text-pretty text-zinc-600 sm:text-[0.8125rem] dark:border-zinc-600 dark:text-zinc-400"
          >
            {feature.description}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function TrimPricingSection({
  model,
  year,
  onClose,
  closeButtonRef,
  compareSlot,
  onPickTrimForCompare,
}: {
  model: MazdaModel;
  year: ModelYear;
  onClose: () => void;
  closeButtonRef?: RefObject<HTMLButtonElement | null>;
  compareSlot?: 1 | 2;
  onPickTrimForCompare?: (trimId: string) => void;
}) {
  const trimLine = useMemo(() => getModelTrimLine(model.id), [model.id]);
  const trims = trimLine?.trims ?? [];
  const sharedSafety = trimLine?.sharedSafetyFeatures ?? [];
  const dimensions = useMemo(() => getModelDimensions(model.id), [model.id]);
  const dimensionDiff = useMemo(
    () => getModelDimensionDiff(model.id, year),
    [model.id, year],
  );
  const trimWheelSpecs = useMemo(
    () => getModelTrimWheelSpecs(model.id, trims),
    [model.id, trims],
  );
  const comparePick = Boolean(compareSlot && onPickTrimForCompare);

  return (
    <div>
      <div className="mb-5 border-b border-zinc-200 pb-5 sm:mb-6 sm:pb-6 dark:border-zinc-700">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h2
            id="selected-model-trims-heading"
            className="text-balance text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl md:text-2xl dark:text-zinc-50"
          >
            {model.name}{" "}
            <span className="font-normal text-zinc-500 dark:text-zinc-400">
              ({year}) trims
            </span>
            {comparePick ? (
              <span className="mt-1 block text-sm font-normal text-[var(--mazda-accent,#c40012)]">
                Comparison {compareSlot} of 2 — tap a trim below
              </span>
            ) : null}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="min-h-11 w-full shrink-0 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 sm:w-auto sm:min-h-0 sm:self-start sm:py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            aria-label={
              comparePick
                ? "Close and return to the model list"
                : "Close trims and choose another model"
            }
          >
            Close
          </button>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-pretty text-zinc-600 dark:text-zinc-400 sm:mt-4 md:mt-2">
          Starting MSRP is for comparison only. MSRP excludes taxes, title,
          license, options, and destination unless noted. Confirm pricing at{" "}
          <a
            href="https://www.mazdausa.com"
            className="font-medium text-zinc-800 underline underline-offset-2 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mazda USA
          </a>
          .
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          ENG / HP / TRQ values are based on Mazda USA published specs.
        </p>
      </div>

      {trims.length === 0 ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Trim data for this model is not available yet.
        </p>
      ) : (
        <>
          {dimensions.length > 0 && !comparePick ? (
            <div className="mb-4 rounded-xl border border-zinc-200 bg-white p-4 sm:mb-5 sm:p-5 md:p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="text-xs font-semibold tracking-wide text-zinc-900 uppercase sm:text-sm dark:text-zinc-100">
                Dimensions
              </h3>
              <p className="mt-2 text-sm text-pretty text-zinc-600 dark:text-zinc-400">
                Key exterior and cargo dimensions for this model.
              </p>
              {dimensionDiff.length > 0 ? (
                <ul className="mt-3 flex flex-col gap-3">
                  {dimensionDiff.map((item, i) => (
                    <TrimFeatureLine
                      key={`dimensions-diff-${i}-${item.name}`}
                      feature={item}
                      bulletClassName="mt-2 bg-[var(--mazda-accent,#c40012)]"
                      titleClassName="text-sm font-medium text-[var(--mazda-accent,#c40012)]"
                    />
                  ))}
                </ul>
              ) : null}
              <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-3">
                {dimensions.map((item, i) => (
                  <TrimFeatureLine
                    key={`dimensions-${i}-${item.name}`}
                    feature={item}
                    bulletClassName="mt-2 bg-zinc-400 dark:bg-zinc-500"
                    titleClassName="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                  />
                ))}
              </ul>
              {trimWheelSpecs.length > 0 ? (
                <div className="mt-5 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                  <h4 className="text-xs font-semibold tracking-wide text-zinc-900 uppercase sm:text-sm dark:text-zinc-100">
                    Wheel size and finish by trim
                  </h4>
                  <p className="mt-2 text-sm text-pretty text-zinc-600 dark:text-zinc-400">
                    Wheel diameter and wheel finish shown for each trim level.
                  </p>
                  <ul className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {trimWheelSpecs.map((wheel, i) => (
                      <li
                        key={`trim-wheel-${i}-${wheel.name}`}
                        className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900/50"
                      >
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {wheel.name}
                        </p>
                        <p className="mt-2 text-xs text-zinc-700 dark:text-zinc-300">
                          <span className="font-medium">Size:</span> {wheel.size}
                        </p>
                        <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">
                          <span className="font-medium">Finish:</span> {wheel.finish}
                        </p>
                        {wheel.note ? (
                          <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {wheel.note}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          {sharedSafety.length > 0 && !comparePick ? (
            <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-4 sm:mb-8 sm:p-5 md:p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="text-xs font-semibold tracking-wide text-zinc-900 uppercase sm:text-sm dark:text-zinc-100">
                Safety & driver assist — all trims
              </h3>
              <p className="mt-2 text-sm text-pretty text-zinc-600 dark:text-zinc-400">
                Every trim level includes the following. Trim cards list only
                extra safety or assist features not shown here. Use the{" "}
                <span className="whitespace-nowrap font-medium text-zinc-700 dark:text-zinc-300">
                  +
                </span>{" "}
                button next to a feature to expand its description.
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-3">
                {sharedSafety.map((item, i) => (
                  <TrimFeatureLine
                    key={`shared-safety-${i}-${item.name}`}
                    feature={item}
                    bulletClassName="mt-2 bg-zinc-400 dark:bg-zinc-500"
                    titleClassName="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                  />
                ))}
              </ul>
            </div>
          ) : null}

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 2xl:gap-5">
            {trims.map((trim, index) => (
              <li key={`${model.id}-${trim.id}`}>
                <TrimPricingCard
                  trim={trim}
                  previousTrimName={
                    trim.hidePreviousTrimComparison
                      ? null
                      : index > 0
                        ? trims[index - 1]?.name ?? null
                        : null
                  }
                  comparePick={comparePick}
                  modelId={model.id}
                  onSelectForCompare={
                    comparePick && onPickTrimForCompare
                      ? () => onPickTrimForCompare(trim.id)
                      : undefined
                  }
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function TrimPricingCard({
  trim,
  modelId,
  previousTrimName,
  comparePick,
  onSelectForCompare,
}: {
  trim: ModelTrim;
  modelId: string;
  previousTrimName: string | null;
  comparePick?: boolean;
  onSelectForCompare?: () => void;
}) {
  const perfSpec = getTrimPerfSpec(modelId, trim.id);
  const [trimImageFailed, setTrimImageFailed] = useState(false);
  const trimImageSrc = useMemo(
    () => getTrimImageUrl(modelId, trim.id),
    [modelId, trim.id],
  );
  const displayImageSrc = trimImageSrc;

  return (
    <article className="flex h-full min-w-0 flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5 md:p-6 dark:border-zinc-700 dark:bg-zinc-950">
      <div className="mb-4 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/60">
        <Image
          src={displayImageSrc}
          alt={`${trim.name} exterior`}
          width={720}
          height={360}
          className="h-auto w-full object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 420px"
          onError={() => {
            if (!trimImageFailed) setTrimImageFailed(true);
          }}
          unoptimized
        />
      </div>

      {comparePick && onSelectForCompare ? (
        <button
          type="button"
          onClick={onSelectForCompare}
          className="mb-4 w-full rounded-lg bg-[var(--mazda-accent,#c40012)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--mazda-accent,#c40012)]/90"
        >
          Compare using this trim
        </button>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-balance text-base font-semibold text-zinc-900 sm:text-lg dark:text-zinc-50">
          {trim.name}
        </h3>
        {trim.popular ? (
          <span className="shrink-0 rounded-full bg-[var(--mazda-accent,#c40012)]/10 px-2.5 py-0.5 text-xs font-semibold text-[var(--mazda-accent,#c40012)]">
            Popular
          </span>
        ) : null}
      </div>

      <div className="mt-3 sm:mt-4">
        <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
          Starting MSRP
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 tabular-nums sm:text-3xl dark:text-zinc-50">
          {trim.startingMsrp}
        </p>
        {perfSpec ? <TrimPerfRow spec={perfSpec} /> : null}
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-4 border-t border-zinc-100 pt-4 sm:mt-5 sm:gap-5 sm:pt-5 dark:border-zinc-800">
        {previousTrimName ? (
          <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-pretty text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              All features from the previous trim
            </span>{" "}
            (
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {previousTrimName}
            </span>
            ). Below: extra safety (if any), then comfort, convenience, and
            performance.
          </p>
        ) : null}

        {trim.trimSafetyAdditions.length > 0 ? (
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-balance text-emerald-800 uppercase sm:text-[0.8125rem] dark:text-emerald-400">
              Safety & assist added at this trim only
            </h4>
            <ul className="mt-3 flex flex-col gap-4">
              {trim.trimSafetyAdditions.map((feature, i) => (
                <TrimFeatureLine
                  key={`${feature.name}-${i}`}
                  feature={feature}
                  bulletClassName="mt-2 bg-emerald-600 dark:bg-emerald-400"
                  titleClassName="text-sm font-medium text-emerald-900 dark:text-emerald-100"
                />
              ))}
            </ul>
          </div>
        ) : null}

        {trim.addedFeatures.length > 0 ? (
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-balance text-[var(--mazda-accent,#c40012)] uppercase sm:text-[0.8125rem]">
              {previousTrimName
                ? "Comfort, convenience & performance"
                : "Standard highlights"}
            </h4>
            <ul className="mt-3 flex flex-col gap-4">
              {trim.addedFeatures.map((feature, i) => (
                <TrimFeatureLine
                  key={`${feature.name}-${i}`}
                  feature={feature}
                  bulletClassName="mt-2 bg-[var(--mazda-accent,#c40012)]"
                  titleClassName="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                />
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-xs text-pretty text-zinc-500 sm:mt-5 dark:text-zinc-500">
        Feature availability varies by trim and model year.
      </p>
    </article>
  );
}

function ModelCard({
  model,
  year,
  selected,
  compareHint,
  onSelect,
}: {
  model: MazdaModel;
  year: ModelYear;
  selected: boolean;
  compareHint?: boolean;
  onSelect: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = useMemo(() => getMazdaUsaImageUrl(model.id), [model.id]);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl border text-left transition-all ${
        selected
          ? "border-[var(--mazda-accent,#c40012)] bg-white shadow-md ring-2 ring-[var(--mazda-accent,#c40012)]/25 dark:bg-zinc-900"
          : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <span className="absolute top-3 left-3 z-10 rounded-md bg-white/90 px-2 py-0.5 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-300">
          {model.category}
        </span>
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-200/80 dark:from-zinc-900 dark:to-zinc-950">
            <ModelSilhouette
              bodyStyle={model.bodyStyle}
              className="h-[52%] w-[88%] max-h-[140px] opacity-90 transition-transform duration-300 group-hover:scale-[1.03]"
              title={`${model.name} illustration`}
            />
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt={`${model.name} — image from Mazda USA`}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 384px"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t border-zinc-100 px-3 py-3 sm:px-4 sm:py-4 dark:border-zinc-800">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {year}
        </span>
        <span className="text-base font-semibold text-balance text-zinc-900 sm:text-lg dark:text-zinc-50">
          {model.name}
        </span>
        <span className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
          {compareHint ? "Tap to choose for comparison" : "View trims & features"}
        </span>
      </div>
    </button>
  );
}
