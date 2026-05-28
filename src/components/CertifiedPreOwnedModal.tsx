"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from "react";
import {
  getCpoImageUrl,
  MAZDA_CPO_BENEFITS,
  MAZDA_CPO_DISCLAIMERS,
  MAZDA_CPO_INTRO,
  MAZDA_CPO_SOURCE_URL,
} from "@/data/mazda-cpo";

/** Match every card in a grid to the tallest card’s natural height. */
function useEqualizeGridCardHeights(
  gridRef: RefObject<HTMLUListElement | null>,
) {
  const equalize = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-cpo-card]");
    if (cards.length === 0) return;

    const multiColumn = getComputedStyle(grid).gridTemplateColumns !== "none"
      && getComputedStyle(grid).gridTemplateColumns.split(" ").length > 1;

    cards.forEach((card) => {
      card.style.minHeight = "";
    });

    if (!multiColumn) return;

    let maxHeight = 0;
    cards.forEach((card) => {
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });
    cards.forEach((card) => {
      card.style.minHeight = `${maxHeight}px`;
    });
  }, [gridRef]);

  useLayoutEffect(() => {
    equalize();
    const grid = gridRef.current;
    if (!grid) return;

    const ro = new ResizeObserver(equalize);
    ro.observe(grid);
    window.addEventListener("resize", equalize);

    const images = grid.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", equalize);
    });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", equalize);
      images.forEach((img) => img.removeEventListener("load", equalize));
    };
  }, [equalize, gridRef]);
}

function CpoBenefitCard({
  title,
  footnote,
  description,
  imagePath,
  featured,
}: {
  title: string;
  footnote?: string;
  description: string;
  imagePath: string;
  featured?: boolean;
}) {
  const imageUrl = getCpoImageUrl(imagePath);

  return (
    <article
      data-cpo-card
      className={`flex h-full flex-col overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950 ${
        featured ? "shadow-sm" : ""
      }`}
    >
      <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col px-4 py-5 sm:px-5 sm:py-6">
        <h3 className="text-center text-[0.6875rem] font-semibold tracking-[0.12em] text-zinc-900 uppercase sm:text-xs dark:text-zinc-50">
          {title}
          {footnote ? (
            <sup className="ml-0.5 text-[0.6em] font-normal text-zinc-500">
              {footnote}
            </sup>
          ) : null}
        </h3>
        <hr className="mx-auto mt-4 w-10 border-zinc-300 dark:border-zinc-600" />
        <p className="mt-4 text-center text-sm leading-relaxed text-pretty text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </article>
  );
}

export function CertifiedPreOwnedModal({ onClose }: { onClose: () => void }) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const featuredGridRef = useRef<HTMLUListElement>(null);
  const moreGridRef = useRef<HTMLUListElement>(null);
  const featured = MAZDA_CPO_BENEFITS.filter((b) => b.featured);
  const more = MAZDA_CPO_BENEFITS.filter((b) => !b.featured);

  useEqualizeGridCardHeights(featuredGridRef);
  useEqualizeGridCardHeights(moreGridRef);

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

  return (
    <div
      className="fixed inset-0 z-[55] flex items-end justify-center sm:items-center sm:p-4"
      aria-hidden={false}
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/55 backdrop-blur-[1px] dark:bg-black/65"
        aria-label="Close Certified Pre-Owned"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[min(92dvh,64rem)] w-full max-w-6xl flex-col shadow-2xl sm:max-h-[min(90dvh,64rem)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cpo-heading"
      >
        <div className="flex max-h-[inherit] min-h-0 flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 sm:rounded-2xl">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="border-b border-zinc-200 bg-white px-4 py-5 sm:px-6 sm:py-6 dark:border-zinc-700 dark:bg-zinc-950">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-[var(--mazda-accent,#c40012)] uppercase">
                    {MAZDA_CPO_INTRO.eyebrow}
                  </p>
                  <h2
                    id="cpo-heading"
                    className="mt-2 text-balance text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl md:text-2xl dark:text-zinc-50"
                  >
                    Mazda Certified Pre-Owned benefits
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-pretty text-zinc-600 dark:text-zinc-400">
                    {MAZDA_CPO_INTRO.lead}
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

            <section className="px-4 py-8 sm:px-6 sm:py-10 md:px-8">
              <h3 className="text-center text-sm font-semibold tracking-[0.14em] text-zinc-900 uppercase sm:text-base dark:text-zinc-100">
                {MAZDA_CPO_INTRO.headline}
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-pretty text-zinc-600 dark:text-zinc-400">
                {MAZDA_CPO_INTRO.subhead}
              </p>

              <ul
                ref={featuredGridRef}
                className="mt-8 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-5"
              >
                {featured.map((benefit) => (
                  <li key={benefit.id} className="h-full min-h-0">
                    <CpoBenefitCard {...benefit} featured />
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-zinc-200 bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-8 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="text-center text-xs font-semibold tracking-[0.14em] text-zinc-800 uppercase dark:text-zinc-200">
                More program benefits
              </h3>
              <ul
                ref={moreGridRef}
                className="mt-6 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
              >
                {more.map((benefit) => (
                  <li key={benefit.id} className="h-full min-h-0">
                    <CpoBenefitCard {...benefit} />
                  </li>
                ))}
              </ul>
            </section>

            <footer className="border-t border-zinc-200 bg-zinc-50 px-4 py-6 sm:px-6 dark:border-zinc-700 dark:bg-zinc-900/80">
              <ol className="mx-auto max-w-3xl space-y-2 text-[0.6875rem] leading-relaxed text-zinc-500 dark:text-zinc-500">
                {MAZDA_CPO_DISCLAIMERS.map((d) => (
                  <li key={d.marker}>
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">
                      {d.marker}
                    </span>{" "}
                    {d.text}
                  </li>
                ))}
              </ol>
              <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-zinc-500">
                Source:{" "}
                <a
                  href={MAZDA_CPO_SOURCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  Mazda USA Certified Pre-Owned
                </a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
