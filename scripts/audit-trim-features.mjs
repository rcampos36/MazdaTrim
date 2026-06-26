/**
 * Audits trim feature assignments: finds features inherited on all trims
 * from base only (missing replaces) and conflicting pairs on same trim.
 */
import {
  getCumulativeTrimFeatureNames,
  getFilterableFeaturesForModel,
} from "../src/lib/trim-feature-filter.ts";
import { getModelTrimLine } from "../src/data/mazda-trims.ts";

const MODELS = [
  "mazda3-sedan",
  "mazda3-hatchback",
  "cx-30",
  "cx-50",
  "cx-5",
  "cx-70",
  "cx-90",
  "mx-5-miata",
  "mx-5-miata-rf",
  "cx-50-hybrid",
];

const CONFLICT_PATTERNS = [
  [/cloth seat/i, /leather/i],
  [/8\.8" display/i, /10\.25"/i],
  [/12\.9"/i, /15\.6"/i],
  [/10\.25"/i, /12\.3"/i],
  [/^17" wheels$/i, /19" alloy/i],
  [/16".*wheel/i, /18".*wheel/i],
];

for (const modelId of MODELS) {
  const trimLine = getModelTrimLine(modelId);
  if (!trimLine) continue;

  console.log(`\n========== ${modelId} ==========`);

  const features = getFilterableFeaturesForModel(modelId);
  const wronglyStandard = features.filter(
    (f) =>
      !f.onAllTrims &&
      trimLine.trims.every((_, i) =>
        getCumulativeTrimFeatureNames(trimLine, i).has(f.name),
      ) &&
      !trimLine.sharedSafetyFeatures.some((s) => s.name === f.name),
  );

  if (wronglyStandard.length) {
    console.log("  On ALL trims cumulatively (check replaces):");
    for (const f of wronglyStandard.slice(0, 15)) {
      console.log(`    - ${f.name}`);
    }
    if (wronglyStandard.length > 15) {
      console.log(`    ... +${wronglyStandard.length - 15} more`);
    }
  }

  trimLine.trims.forEach((trim, index) => {
    const names = [...getCumulativeTrimFeatureNames(trimLine, index)];
    const conflicts = [];
    for (const [a, b] of CONFLICT_PATTERNS) {
      const matchA = names.filter((n) => a.test(n));
      const matchB = names.filter((n) => b.test(n));
      if (matchA.length && matchB.length) {
        conflicts.push(`${matchA[0]} + ${matchB[0]}`);
      }
    }
    if (conflicts.length) {
      console.log(`  CONFLICT ${trim.name}:`);
      for (const c of conflicts) console.log(`    - ${c}`);
    }
  });
}
