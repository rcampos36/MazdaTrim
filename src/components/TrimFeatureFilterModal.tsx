"use client";

import { MsrpPriceDisclaimer } from "@/components/MsrpPriceDisclaimer";
import type { MazdaModel } from "@/data/mazda-models";
import { MSRP_PRICE_NOTE } from "@/lib/msrp-disclaimer";
import {
  getFilterableFeaturesForModel,
  getTrimsMatchingFeatures,
  type FilterableFeature,
  type TrimFeatureMatch,
} from "@/lib/trim-feature-filter";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type TrimFeatureFilterSelection = {
  modelId: string;
  matchingTrimIds: string[];
  selectedFeatureNames: string[];
};

export type TrimFeatureFilterModalProps = {
  models: MazdaModel[];
  onClose: () => void;
  onViewTrims: (selection: TrimFeatureFilterSelection) => void;
};

export function TrimFeatureFilterModal({
  models,
  onClose,
  onViewTrims,
}: TrimFeatureFilterModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const formId = useId();
  const [selectedModelId, setSelectedModelId] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(
    () => new Set(),
  );
  const [featureQuery, setFeatureQuery] = useState("");

  const selectedModel = useMemo(
    () => models.find((model) => model.id === selectedModelId) ?? null,
    [models, selectedModelId],
  );

  const filterableFeatures = useMemo(() => {
    if (!selectedModelId) {
      return [];
    }
    return getFilterableFeaturesForModel(selectedModelId);
  }, [selectedModelId]);

  const filteredFeatures = useMemo(() => {
    const query = featureQuery.trim().toLowerCase();
    if (!query) {
      return filterableFeatures;
    }
    return filterableFeatures.filter(
      (feature) =>
        feature.name.toLowerCase().includes(query) ||
        feature.description.toLowerCase().includes(query),
    );
  }, [filterableFeatures, featureQuery]);

  const trimSpecificFeatures = useMemo(
    () => filteredFeatures.filter((feature) => !feature.onAllTrims),
    [filteredFeatures],
  );

  const standardFeatures = useMemo(
    () => filteredFeatures.filter((feature) => feature.onAllTrims),
    [filteredFeatures],
  );

  const matchingTrims = useMemo(() => {
    if (!selectedModelId || selectedFeatures.size === 0) {
      return [];
    }
    return getTrimsMatchingFeatures(
      selectedModelId,
      [...selectedFeatures],
    );
  }, [selectedModelId, selectedFeatures]);

  function onModelChange(modelId: string) {
    setSelectedModelId(modelId);
    setSelectedFeatures(new Set());
    setFeatureQuery("");
  }

  function toggleFeature(name: string) {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }

  function clearFeatures() {
    setSelectedFeatures(new Set());
  }

  function openFilteredTrims(trimId?: string) {
    if (!selectedModelId || selectedFeatures.size === 0) {
      return;
    }

    const matchingTrimIds = matchingTrims.map((trim) => trim.trimId);
    if (matchingTrimIds.length === 0) {
      return;
    }

    onViewTrims({
      modelId: selectedModelId,
      matchingTrimIds: trimId
        ? matchingTrimIds.filter((id) => id === trimId)
        : matchingTrimIds,
      selectedFeatureNames: [...selectedFeatures],
    });
    onClose();
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
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

  return (
    <div
      className="fixed inset-0 z-[55] flex items-end justify-center sm:items-center sm:p-4"
      aria-hidden={false}
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/55 backdrop-blur-[1px] dark:bg-black/65"
        aria-label="Close feature filter"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[min(92dvh,64rem)] w-full max-w-7xl flex-col shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="trim-feature-filter-heading"
      >
        <div className="flex max-h-[inherit] min-h-0 flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950 sm:rounded-2xl">
          <div className="shrink-0 border-b border-zinc-200 px-4 py-5 sm:px-6 sm:py-6 dark:border-zinc-700">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-[var(--mazda-accent,#c40012)] uppercase">
                  Trim finder
                </p>
                <h2
                  id="trim-feature-filter-heading"
                  className="mt-2 text-balance text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl dark:text-zinc-50"
                >
                  Filter by features
                </h2>
                <p className="mt-2 text-sm text-pretty text-zinc-600 dark:text-zinc-400">
                  Choose a 2026 model, pick trim-specific or standard features,
                  and matching trims appear in the results panel.
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
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6">
            <section aria-labelledby={`${formId}-model`}>
              <h3
                id={`${formId}-model`}
                className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100"
              >
                Model
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {models.map((model) => {
                  const isSelected = selectedModelId === model.id;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => onModelChange(model.id)}
                      aria-pressed={isSelected}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        isSelected
                          ? "border-[var(--mazda-accent,#c40012)] bg-[var(--mazda-accent,#c40012)] text-white"
                          : "border-zinc-300 bg-zinc-50 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {model.name}
                    </button>
                  );
                })}
              </div>
            </section>

            {!selectedModel ? (
              <p className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
                Select a model to see its available features.
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(16rem,20rem)] xl:items-start">
                <div className="min-h-0 min-w-0 xl:col-span-2">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3
                        id={`${formId}-features`}
                        className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100"
                      >
                        Features — {selectedModel.name}
                      </h3>
                      <p className="mt-2 text-sm text-pretty text-zinc-600 dark:text-zinc-400">
                        Trim-specific features are on the left; standard
                        equipment on every trim is on the right.
                      </p>
                    </div>
                    {selectedFeatures.size > 0 ? (
                      <button
                        type="button"
                        onClick={clearFeatures}
                        className="min-h-11 shrink-0 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 sm:min-h-0 sm:py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                      >
                        Clear ({selectedFeatures.size})
                      </button>
                    ) : null}
                  </div>

                  <label className="mt-4 block">
                    <span className="sr-only">Search features</span>
                    <input
                      type="search"
                      value={featureQuery}
                      onChange={(event) => setFeatureQuery(event.target.value)}
                      placeholder="Search features…"
                      className="min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-[var(--mazda-accent,#c40012)] focus:outline-none focus:ring-2 focus:ring-[var(--mazda-accent,#c40012)]/25 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    />
                  </label>

                  {filterableFeatures.length === 0 ? (
                    <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                      Trim data is not available for this model yet.
                    </p>
                  ) : (
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                      <FeatureColumn
                        id={`${formId}-trim-features`}
                        title="By trim"
                        description="Added or upgraded on specific trim levels."
                        features={trimSpecificFeatures}
                        selectedFeatures={selectedFeatures}
                        onToggleFeature={toggleFeature}
                        emptyMessage={
                          featureQuery.trim()
                            ? "No trim-specific features match your search."
                            : "No trim-specific features for this model."
                        }
                      />
                      <FeatureColumn
                        id={`${formId}-standard-features`}
                        title="Standard on all trims"
                        description="Included on every trim for this model."
                        features={standardFeatures}
                        selectedFeatures={selectedFeatures}
                        onToggleFeature={toggleFeature}
                        emptyMessage={
                          featureQuery.trim()
                            ? "No standard features match your search."
                            : "No features are shared across every trim."
                        }
                      />
                    </div>
                  )}
                </div>

                <aside
                  className="flex max-h-none flex-col rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/50 xl:sticky xl:top-0 xl:z-10 xl:max-h-[min(100%,calc(92dvh-10rem))] xl:self-start xl:overflow-hidden xl:shadow-sm"
                  aria-labelledby={`${formId}-results`}
                  aria-live="polite"
                >
                  <div className="shrink-0 border-b border-zinc-200 px-4 py-4 dark:border-zinc-700">
                    <h3
                      id={`${formId}-results`}
                      className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100"
                    >
                      Matching trims
                    </h3>
                    <p className="mt-1.5 text-xs text-pretty text-zinc-600 dark:text-zinc-400">
                      {selectedFeatures.size === 0
                        ? "Select features to see trims."
                        : `${matchingTrims.length} trim${matchingTrims.length === 1 ? "" : "s"} match.`}
                    </p>
                    {matchingTrims.length > 0 ? (
                      <p className="mt-2 text-xs text-pretty text-zinc-500 dark:text-zinc-400">
                        {MSRP_PRICE_NOTE}
                      </p>
                    ) : null}
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3">
                    {selectedFeatures.size === 0 ? (
                      <p className="px-1 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                        Choose one or more features above.
                      </p>
                    ) : matchingTrims.length === 0 ? (
                      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
                        No trims include every feature you selected.
                      </p>
                    ) : (
                      <ul className="flex flex-col gap-2">
                        {matchingTrims.map((trim) => (
                          <TrimResultCard
                            key={trim.trimId}
                            trim={trim}
                            onView={() => openFilteredTrims(trim.trimId)}
                          />
                        ))}
                      </ul>
                    )}
                  </div>

                  {matchingTrims.length > 0 ? (
                    <div className="shrink-0 border-t border-zinc-200 p-3 dark:border-zinc-700">
                      <button
                        type="button"
                        onClick={() => openFilteredTrims()}
                        className="w-full rounded-lg bg-[var(--mazda-accent,#c40012)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--mazda-accent,#c40012)]/90"
                      >
                        View all matching trims
                      </button>
                    </div>
                  ) : null}
                </aside>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureColumn({
  id,
  title,
  description,
  features,
  selectedFeatures,
  onToggleFeature,
  emptyMessage,
}: {
  id: string;
  title: string;
  description: string;
  features: FilterableFeature[];
  selectedFeatures: Set<string>;
  onToggleFeature: (name: string) => void;
  emptyMessage: string;
}) {
  return (
    <section
      className="min-w-0 rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
      aria-labelledby={id}
    >
      <div className="border-b border-zinc-200 px-3 py-3 sm:px-4 dark:border-zinc-700">
        <h4
          id={id}
          className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100"
        >
          {title}
        </h4>
        <p className="mt-1 text-xs text-pretty text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <div className="p-2 sm:p-3">
        {features.length === 0 ? (
          <p className="px-1 py-2 text-sm text-zinc-500 dark:text-zinc-400">
            {emptyMessage}
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {features.map((feature) => (
              <FeatureCheckboxRow
                key={feature.name}
                feature={feature}
                checked={selectedFeatures.has(feature.name)}
                onToggle={() => onToggleFeature(feature.name)}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function TrimResultCard({
  trim,
  onView,
}: {
  trim: TrimFeatureMatch;
  onView: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onView}
        className="flex w-full flex-col rounded-lg border border-zinc-200 bg-white p-3 text-left transition-colors hover:border-[var(--mazda-accent,#c40012)]/40 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-[var(--mazda-accent,#c40012)]/50 dark:hover:bg-zinc-900"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {trim.trimName}
          </p>
          {trim.popular ? (
            <span className="shrink-0 rounded-full bg-[var(--mazda-accent,#c40012)]/10 px-2 py-0.5 text-[0.625rem] font-semibold text-[var(--mazda-accent,#c40012)]">
              Popular
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-[0.625rem] font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
          Starting MSRP
        </p>
        <p className="mt-0.5 text-base font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
          {trim.startingMsrp}
        </p>
        <MsrpPriceDisclaimer className="mt-1.5" />
        <p className="mt-2 text-xs font-medium text-[var(--mazda-accent,#c40012)]">
          View trim
        </p>
      </button>
    </li>
  );
}

function FeatureCheckboxRow({
  feature,
  checked,
  onToggle,
}: {
  feature: FilterableFeature;
  checked: boolean;
  onToggle: () => void;
}) {
  const inputId = useId();

  return (
    <li>
      <label
        htmlFor={inputId}
        className={`flex cursor-pointer gap-3 rounded-xl border px-3 py-3 transition-colors sm:px-4 ${
          checked
            ? "border-[var(--mazda-accent,#c40012)]/40 bg-[var(--mazda-accent,#c40012)]/5 dark:bg-[var(--mazda-accent,#c40012)]/10"
            : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        }`}
      >
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-1 size-4 shrink-0 rounded border-zinc-300 text-[var(--mazda-accent,#c40012)] focus:ring-[var(--mazda-accent,#c40012)]/25"
        />
        <span className="min-w-0 flex-1">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {feature.name}
          </span>
          <span className="mt-1 block text-xs text-pretty text-zinc-500 dark:text-zinc-400">
            {feature.description}
          </span>
        </span>
      </label>
    </li>
  );
}
