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
    <div className="mx-auto w-full min-w-0 max-w-6xl px-3 pt-[max(2rem,env(safe-area-inset-top))] pb-8 sm:px-6 sm:pt-10 sm:pb-10 lg:px-8">
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

  return (
    <article className="flex h-full min-w-0 flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5 md:p-6 dark:border-zinc-700 dark:bg-zinc-950">
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
