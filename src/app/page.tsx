import { MazdaModelExplorer } from "@/components/MazdaModelExplorer";

export default function Home() {
  return (
    <div
      className="flex min-h-full min-w-0 flex-1 flex-col bg-zinc-50 dark:bg-zinc-950"
      suppressHydrationWarning
    >
      <MazdaModelExplorer />
      <footer className="mt-auto border-t border-zinc-200 px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center text-xs leading-relaxed text-pretty text-zinc-500 sm:px-6 dark:border-zinc-800 dark:text-zinc-500">
        Vehicle images load from{" "}
        <a
          href="https://www.mazdausa.com"
          className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mazda USA
        </a>
        . Silhouettes are used only if an image fails to load. Mazda is a
        trademark of Mazda Motor Corporation; this site is not affiliated with
        Mazda.
      </footer>
    </div>
  );
}
