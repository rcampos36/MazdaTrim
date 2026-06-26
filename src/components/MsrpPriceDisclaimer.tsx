import { MSRP_PRICE_NOTE } from "@/lib/msrp-disclaimer";

export function MsrpPriceDisclaimer({
  className = "mt-1",
}: {
  className?: string;
}) {
  return (
    <p
      className={`text-xs text-pretty text-zinc-500 dark:text-zinc-400 ${className}`}
    >
      {MSRP_PRICE_NOTE}
    </p>
  );
}
