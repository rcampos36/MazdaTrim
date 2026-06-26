import {
  getModelTrimLine,
  type ModelTrim,
  type ModelTrimLine,
  type TrimFeatureItem,
} from "@/data/mazda-trims";
export type FilterableFeature = {
  name: string;
  description: string;
  /** Present on every trim via shared safety packaging. */
  onAllTrims: boolean;
};

export type TrimFeatureMatch = {
  trimId: string;
  trimName: string;
  startingMsrp: string;
  popular?: boolean;
};

/** All feature names included on a trim (shared safety + inherited lower-trim content). */
export function getCumulativeTrimFeatureNames(
  trimLine: ModelTrimLine,
  trimIndex: number,
): Set<string> {
  const names = new Set<string>();

  for (const feature of trimLine.sharedSafetyFeatures) {
    names.add(feature.name);
  }

  const trim = trimLine.trims[trimIndex];
  if (!trim) {
    return names;
  }

  if (trim.hidePreviousTrimComparison) {
    if (trim.branchFromTrimId) {
      const branchStart = trimLine.trims.findIndex(
        (candidate) => candidate.id === trim.branchFromTrimId,
      );
      const startIndex = branchStart >= 0 ? branchStart : trimIndex;
      for (let i = startIndex; i <= trimIndex; i++) {
        addFeatureNames(names, trimLine.trims[i].trimSafetyAdditions);
        addFeatureNames(names, trimLine.trims[i].addedFeatures);
      }
      return names;
    }

    addFeatureNames(names, trim.trimSafetyAdditions);
    addFeatureNames(names, trim.addedFeatures);
    return names;
  }

  for (let i = 0; i <= trimIndex; i++) {
    addFeatureNames(names, trimLine.trims[i].trimSafetyAdditions);
    addFeatureNames(names, trimLine.trims[i].addedFeatures);
  }

  return names;
}

function addFeatureNames(target: Set<string>, features: TrimFeatureItem[]) {
  for (const feature of features) {
    if (feature.replaces) {
      for (const replaced of feature.replaces) {
        target.delete(replaced);
      }
    }
    target.add(feature.name);
  }
}

function getDirectTrimFeatureNames(trim: ModelTrim): Set<string> {
  const names = new Set<string>();
  addFeatureNames(names, trim.trimSafetyAdditions);
  addFeatureNames(names, trim.addedFeatures);
  return names;
}

/** Unique features available for filtering on a model (sorted alphabetically). */
export function getFilterableFeaturesForModel(
  modelId: string,
): FilterableFeature[] {
  const trimLine = getModelTrimLine(modelId);
  if (!trimLine || trimLine.trims.length === 0) {
    return [];
  }

  const sharedNames = new Set(
    trimLine.sharedSafetyFeatures.map((feature) => feature.name),
  );
  const catalog = new Map<string, FilterableFeature>();

  for (const feature of trimLine.sharedSafetyFeatures) {
    catalog.set(feature.name, {
      name: feature.name,
      description: feature.description,
      onAllTrims: true,
    });
  }

  for (const trim of trimLine.trims) {
    for (const feature of [
      ...trim.trimSafetyAdditions,
      ...trim.addedFeatures,
    ]) {
      if (!catalog.has(feature.name)) {
        catalog.set(feature.name, {
          name: feature.name,
          description: feature.description,
          onAllTrims: false,
        });
      }
    }
  }

  const onEveryTrimDirectly = new Set<string>();
  for (const name of catalog.keys()) {
    if (sharedNames.has(name)) {
      continue;
    }
    const onEveryTrim = trimLine.trims.every((trim) =>
      getDirectTrimFeatureNames(trim).has(name),
    );
    if (onEveryTrim) {
      onEveryTrimDirectly.add(name);
    }
  }

  return [...catalog.values()]
    .map((feature) => ({
      ...feature,
      onAllTrims:
        sharedNames.has(feature.name) || onEveryTrimDirectly.has(feature.name),
    }))
    .sort((a, b) => {
      if (a.onAllTrims !== b.onAllTrims) {
        return a.onAllTrims ? 1 : -1;
      }
      return a.name.localeCompare(b.name);
    });
}

/** Trims whose packaging includes every selected feature name. */
export function getTrimsMatchingFeatures(
  modelId: string,
  selectedFeatureNames: readonly string[],
): TrimFeatureMatch[] {
  const trimLine = getModelTrimLine(modelId);
  if (!trimLine) {
    return [];
  }

  const required = new Set(selectedFeatureNames);
  if (required.size === 0) {
    return trimLine.trims.map((trim) => toTrimMatch(trim));
  }

  return trimLine.trims
    .map((trim, index) => ({ trim, index }))
    .filter(({ index }) => {
      const available = getCumulativeTrimFeatureNames(trimLine, index);
      for (const name of required) {
        if (!available.has(name)) {
          return false;
        }
      }
      return true;
    })
    .map(({ trim }) => toTrimMatch(trim));
}

function toTrimMatch(trim: ModelTrim): TrimFeatureMatch {
  return {
    trimId: trim.id,
    trimName: trim.name,
    startingMsrp: trim.startingMsrp,
    popular: trim.popular,
  };
}
