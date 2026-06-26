"use client";

import {
  calculateFinancePayment,
  calculateLeasePayment,
  calculateResidualFromMsrp,
  calculateSalesTax,
  formatUsd,
  parseFormNumber,
} from "@/lib/lease-calculations";
import { MSRP_PRICE_NOTE } from "@/lib/msrp-disclaimer";
import {
  DEFAULT_PROCESSING_FEE,
  DEFAULT_SALES_TAX_STATE,
  formatSalesTaxRate,
  getStateSalesTax,
  US_STATE_SALES_TAX,
} from "@/data/us-state-sales-tax";
import {
  calculateVirginiaRegistrationFees,
  DEFAULT_VIRGINIA_PASSENGER_WEIGHT,
  VIRGINIA_PASSENGER_WEIGHT_OPTIONS,
  VIRGINIA_TITLE_FEE,
  type VirginiaPassengerWeightClass,
} from "@/data/registration-fees";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type LeaseFinanceFormValues = {
  carPrice: string;
  downPayment: string;
  leaseDownPayment: string;
  apr: string;
  financeTermMonths: string;
  leaseTermMonths: string;
  moneyFactor: string;
  residualPercent: string;
  annualMileageLimit: string;
  salesTaxState: string;
  processingFee: string;
  registrationWeightClass: VirginiaPassengerWeightClass;
  discount: string;
  rebate: string;
};

const DEFAULT_FORM: LeaseFinanceFormValues = {
  carPrice: "",
  downPayment: "",
  leaseDownPayment: "",
  apr: "",
  financeTermMonths: "60",
  leaseTermMonths: "36",
  moneyFactor: "0.00125",
  residualPercent: "60",
  annualMileageLimit: "12000",
  salesTaxState: DEFAULT_SALES_TAX_STATE,
  processingFee: String(DEFAULT_PROCESSING_FEE),
  registrationWeightClass: DEFAULT_VIRGINIA_PASSENGER_WEIGHT,
  discount: "",
  rebate: "",
};

function FormField({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
      >
        {label}
      </label>
      {children}
      {hint ? (
        <p className="text-xs text-pretty text-zinc-500 dark:text-zinc-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const inputClassName =
  "min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-[var(--mazda-accent,#c40012)] focus:outline-none focus:ring-2 focus:ring-[var(--mazda-accent,#c40012)]/25 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500";

export type LeaseFinanceModalProps = {
  onClose: () => void;
  /** Pre-fill MSRP from the selected trim; still editable in the form. */
  initialMsrp?: number;
  /** e.g. "2026 CX-5 — Select" */
  vehicleLabel?: string;
};

function createInitialForm(initialMsrp?: number): LeaseFinanceFormValues {
  return {
    ...DEFAULT_FORM,
    carPrice: initialMsrp ? String(initialMsrp) : "",
  };
}

export function LeaseFinanceModal({
  onClose,
  initialMsrp,
  vehicleLabel,
}: LeaseFinanceModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const formId = useId();
  const [form, setForm] = useState(() => createInitialForm(initialMsrp));

  const leaseEstimate = useMemo(() => {
    const carPrice = parseFormNumber(form.carPrice);
    const residualPercent = parseFormNumber(form.residualPercent);
    const leaseTermMonths = parseFormNumber(form.leaseTermMonths) ?? 36;
    const moneyFactor = parseFormNumber(form.moneyFactor) ?? 0.00125;
    const downPayment = parseFormNumber(form.leaseDownPayment) ?? 0;
    const annualMileageLimit =
      parseFormNumber(form.annualMileageLimit) ?? 12000;

    if (carPrice === null || residualPercent === null || carPrice - downPayment < 0) {
      return null;
    }

    const residualValue = calculateResidualFromMsrp(carPrice, residualPercent);
    if (residualValue === null) {
      return null;
    }

    const result = calculateLeasePayment({
      carPrice,
      residualValue,
      leaseTermMonths,
      moneyFactor,
      downPayment,
      annualMileageLimit,
    });

    if (!result) {
      return null;
    }

    return {
      ...result,
      residualPercent,
      msrp: carPrice,
    };
  }, [
    form.carPrice,
    form.residualPercent,
    form.leaseTermMonths,
    form.moneyFactor,
    form.leaseDownPayment,
    form.annualMileageLimit,
  ]);

  const financeEstimate = useMemo(() => {
    const msrp = parseFormNumber(form.carPrice);
    const discount = parseFormNumber(form.discount) ?? 0;
    const rebate = parseFormNumber(form.rebate) ?? 0;
    const downPayment = parseFormNumber(form.downPayment);
    const aprPercent = parseFormNumber(form.apr);
    const loanTermMonths = parseFormNumber(form.financeTermMonths);
    const processingFee = parseFormNumber(form.processingFee);
    const registrationFees = calculateVirginiaRegistrationFees(
      form.registrationWeightClass,
    );
    const taxState = getStateSalesTax(form.salesTaxState);

    if (
      msrp === null ||
      downPayment === null ||
      aprPercent === null ||
      loanTermMonths === null ||
      processingFee === null ||
      !taxState ||
      msrp - discount - rebate < 0
    ) {
      return null;
    }

    const netCarPrice = msrp - discount - rebate;

    const salesTaxAmount = calculateSalesTax({
      carPrice: netCarPrice,
      taxRate: taxState.rate,
      minimumTax: taxState.minimumTax,
    });

    if (salesTaxAmount === null) {
      return null;
    }

    const result = calculateFinancePayment({
      msrp,
      discount,
      rebate,
      downPayment,
      aprPercent,
      loanTermMonths,
      salesTaxAmount,
      processingFee,
      registrationFee: registrationFees.total,
      registrationTitleFee: registrationFees.titleFee,
      registrationPlateFee: registrationFees.plateRegistrationFee,
    });

    if (!result) {
      return null;
    }

    return {
      ...result,
      taxState,
      registrationFees,
    };
  }, [
    form.carPrice,
    form.discount,
    form.rebate,
    form.downPayment,
    form.apr,
    form.financeTermMonths,
    form.processingFee,
    form.registrationWeightClass,
    form.salesTaxState,
  ]);

  const paymentComparison = useMemo(() => {
    if (!leaseEstimate || !financeEstimate) {
      return null;
    }

    const monthlyDifference =
      leaseEstimate.monthlyLeasePayment - financeEstimate.baseMonthlyPayment;

    return {
      leasePayment: leaseEstimate.monthlyLeasePayment,
      financePayment: financeEstimate.baseMonthlyPayment,
      monthlyDifference,
      leaseIsLower: monthlyDifference < 0,
    };
  }, [leaseEstimate, financeEstimate]);

  function updateField<K extends keyof LeaseFinanceFormValues>(
    key: K,
    value: LeaseFinanceFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

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
        aria-label="Close lease vs finance"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[min(92dvh,64rem)] w-full max-w-2xl flex-col shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lease-finance-heading"
      >
        <div className="flex max-h-[inherit] min-h-0 flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950 sm:rounded-2xl">
          <div className="border-b border-zinc-200 px-4 py-5 sm:px-6 sm:py-6 dark:border-zinc-700">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-[var(--mazda-accent,#c40012)] uppercase">
                  Payment options
                </p>
                <h2
                  id="lease-finance-heading"
                  className="mt-2 text-balance text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl dark:text-zinc-50"
                >
                  Lease vs finance
                </h2>
                {vehicleLabel ? (
                  <p className="mt-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {vehicleLabel}
                  </p>
                ) : null}
                <p className="mt-2 text-sm text-pretty text-zinc-600 dark:text-zinc-400">
                  Enter your numbers below to compare estimated lease and finance
                  payments. {MSRP_PRICE_NOTE} MSRP can be adjusted from the trim
                  starting price.
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
            <form
              id={formId}
              className="flex flex-col gap-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <section aria-labelledby={`${formId}-vehicle`}>
                <h3
                  id={`${formId}-vehicle`}
                  className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100"
                >
                  Vehicle details
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    id={`${formId}-car-price`}
                    label="MSRP"
                    hint={
                      vehicleLabel
                        ? `Starting price from your selected trim. ${MSRP_PRICE_NOTE} Change if your agreed price differs.`
                        : `Manufacturer suggested retail price before taxes and fees. ${MSRP_PRICE_NOTE}`
                    }
                  >
                    <div className="relative">
                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-zinc-500">
                        $
                      </span>
                      <input
                        id={`${formId}-car-price`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step={100}
                        placeholder="35000"
                        value={form.carPrice}
                        onChange={(e) => updateField("carPrice", e.target.value)}
                        className={`${inputClassName} pl-7`}
                      />
                    </div>
                  </FormField>

                  <FormField
                    id={`${formId}-down-payment`}
                    label="Finance down payment"
                    hint="Cash paid upfront at signing; lowers finance monthly payment only."
                  >
                    <div className="relative">
                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-zinc-500">
                        $
                      </span>
                      <input
                        id={`${formId}-down-payment`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step={100}
                        placeholder="3000"
                        value={form.downPayment}
                        onChange={(e) =>
                          updateField("downPayment", e.target.value)
                        }
                        className={`${inputClassName} pl-7`}
                      />
                    </div>
                  </FormField>
                </div>
              </section>

              <section aria-labelledby={`${formId}-finance`}>
                <h3
                  id={`${formId}-finance`}
                  className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100"
                >
                  Finance
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    id={`${formId}-apr`}
                    label="Annual Percentage Rate (APR)"
                    hint="Finance interest rate from your lender."
                  >
                    <div className="relative">
                      <input
                        id={`${formId}-apr`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={30}
                        step={0.01}
                        placeholder="4.9"
                        value={form.apr}
                        onChange={(e) => updateField("apr", e.target.value)}
                        className={`${inputClassName} pr-8`}
                      />
                      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-zinc-500">
                        %
                      </span>
                    </div>
                  </FormField>

                  <FormField
                    id={`${formId}-finance-term`}
                    label="Finance term (months)"
                    hint="Length of the auto loan in months."
                  >
                    <input
                      id={`${formId}-finance-term`}
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={84}
                      step={1}
                      placeholder="60"
                      value={form.financeTermMonths}
                      onChange={(e) =>
                        updateField("financeTermMonths", e.target.value)
                      }
                      className={inputClassName}
                    />
                  </FormField>

                  <FormField
                    id={`${formId}-discount`}
                    label="Discount"
                    hint="Dealer or manufacturer discount applied to MSRP for finance only."
                  >
                    <div className="relative">
                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-zinc-500">
                        $
                      </span>
                      <input
                        id={`${formId}-discount`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step={100}
                        placeholder="0"
                        value={form.discount}
                        onChange={(e) => updateField("discount", e.target.value)}
                        className={`${inputClassName} pl-7`}
                      />
                    </div>
                  </FormField>

                  <FormField
                    id={`${formId}-rebate`}
                    label="Rebate"
                    hint="Manufacturer finance rebate applied to MSRP for finance only."
                  >
                    <div className="relative">
                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-zinc-500">
                        $
                      </span>
                      <input
                        id={`${formId}-rebate`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step={100}
                        placeholder="0"
                        value={form.rebate}
                        onChange={(e) => updateField("rebate", e.target.value)}
                        className={`${inputClassName} pl-7`}
                      />
                    </div>
                  </FormField>

                  <FormField
                    id={`${formId}-sales-tax-state`}
                    label="Sales tax state"
                    hint="State sales tax applied to the net price after discount and rebate."
                  >
                    <select
                      id={`${formId}-sales-tax-state`}
                      value={form.salesTaxState}
                      onChange={(e) =>
                        updateField("salesTaxState", e.target.value)
                      }
                      className={inputClassName}
                    >
                      {US_STATE_SALES_TAX.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name} ({formatSalesTaxRate(state.rate)})
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField
                    id={`${formId}-processing-fee`}
                    label="Processing fee"
                    hint="Dealer document and processing fee."
                  >
                    <div className="relative">
                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-zinc-500">
                        $
                      </span>
                      <input
                        id={`${formId}-processing-fee`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step={1}
                        placeholder="749"
                        value={form.processingFee}
                        onChange={(e) =>
                          updateField("processingFee", e.target.value)
                        }
                        className={`${inputClassName} pl-7`}
                      />
                    </div>
                  </FormField>

                  <FormField
                    id={`${formId}-registration-weight`}
                    label="Registration fees"
                    hint="Virginia title + first-year tags (license plates). Rolled into the loan. Most Mazda models are 4,001–6,500 lbs."
                  >
                    <select
                      id={`${formId}-registration-weight`}
                      value={form.registrationWeightClass}
                      onChange={(e) =>
                        updateField(
                          "registrationWeightClass",
                          e.target.value as VirginiaPassengerWeightClass,
                        )
                      }
                      className={inputClassName}
                    >
                      {VIRGINIA_PASSENGER_WEIGHT_OPTIONS.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label} —{" "}
                          {formatUsd(
                            VIRGINIA_TITLE_FEE + option.registrationFee,
                          )}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>

                {financeEstimate ? (
                  <div
                    className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/50"
                    aria-live="polite"
                  >
                    <h4 className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100">
                      Finance estimate
                    </h4>
                    <dl className="mt-3 flex flex-col gap-3">
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          MSRP
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(financeEstimate.msrp)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Discount
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          −{formatUsd(financeEstimate.discount)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Rebate
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          −{formatUsd(financeEstimate.rebate)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 border-b border-zinc-200 pb-3 dark:border-zinc-700">
                        <dt className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                          Net vehicle price
                        </dt>
                        <dd className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(financeEstimate.netCarPrice)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Sales tax (
                          {formatSalesTaxRate(financeEstimate.taxState.rate)} on
                          net price)
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(financeEstimate.salesTax)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Processing fee
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(financeEstimate.processingFee)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Title fee
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(financeEstimate.registrationTitleFee)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Registration (tags)
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(financeEstimate.registrationPlateFee)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                          Registration fees
                        </dt>
                        <dd className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(financeEstimate.registrationFee)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 border-t border-zinc-200 pt-3 dark:border-zinc-700">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Amount financed
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(financeEstimate.amountFinanced)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Down payment
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(financeEstimate.downPayment)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Loan balance for payment
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(financeEstimate.loanBalanceForPayment)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Due at signing
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(financeEstimate.dueAtSigning)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 border-t border-zinc-200 pt-3 dark:border-zinc-700">
                        <dt className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                          Base monthly payment
                        </dt>
                        <dd className="text-base font-semibold tabular-nums text-[var(--mazda-accent,#c40012)]">
                          {formatUsd(financeEstimate.baseMonthlyPayment)}
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-xs text-pretty text-zinc-500 dark:text-zinc-400">
                      Net vehicle price = MSRP − discount − rebate. Amount
                      financed = net price + sales tax + processing fee +
                      registration fees (title + tags). Down payment reduces
                      the loan balance used for the monthly payment only and is
                      due at signing.
                    </p>
                  </div>
                ) : null}
              </section>

              <section aria-labelledby={`${formId}-lease`}>
                <h3
                  id={`${formId}-lease`}
                  className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100"
                >
                  Lease
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    id={`${formId}-residual-percent`}
                    label="Residual value (% of MSRP)"
                    hint="Expected lease-end value as a percent of full MSRP; dollar amount is calculated for you."
                  >
                    <div className="relative">
                      <input
                        id={`${formId}-residual-percent`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={100}
                        step={0.1}
                        placeholder="60"
                        value={form.residualPercent}
                        onChange={(e) =>
                          updateField("residualPercent", e.target.value)
                        }
                        className={`${inputClassName} pr-8`}
                      />
                      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-zinc-500">
                        %
                      </span>
                    </div>
                  </FormField>

                  <FormField
                    id={`${formId}-money-factor`}
                    label="Money factor"
                    hint="Lease money factor from the dealer (e.g. 0.00125)."
                  >
                    <input
                      id={`${formId}-money-factor`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step={0.00001}
                      placeholder="0.00125"
                      value={form.moneyFactor}
                      onChange={(e) =>
                        updateField("moneyFactor", e.target.value)
                      }
                      className={inputClassName}
                    />
                  </FormField>

                  <FormField
                    id={`${formId}-lease-term`}
                    label="Lease term (months)"
                    hint="Length of the lease contract in months."
                  >
                    <input
                      id={`${formId}-lease-term`}
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={84}
                      step={1}
                      placeholder="36"
                      value={form.leaseTermMonths}
                      onChange={(e) =>
                        updateField("leaseTermMonths", e.target.value)
                      }
                      className={inputClassName}
                    />
                  </FormField>

                  <FormField
                    id={`${formId}-lease-down-payment`}
                    label="Lease down payment"
                    hint="Cap cost reduction paid at signing; can differ from your finance down payment."
                  >
                    <div className="relative">
                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-zinc-500">
                        $
                      </span>
                      <input
                        id={`${formId}-lease-down-payment`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step={100}
                        placeholder="3000"
                        value={form.leaseDownPayment}
                        onChange={(e) =>
                          updateField("leaseDownPayment", e.target.value)
                        }
                        className={`${inputClassName} pl-7`}
                      />
                    </div>
                  </FormField>

                  <FormField
                    id={`${formId}-annual-mileage`}
                    label="Annual mileage limit"
                    hint="More miles lowers residual value (~$0.20/mile over the lease vs 12,000 mi/yr)."
                  >
                    <div className="relative">
                      <input
                        id={`${formId}-annual-mileage`}
                        type="number"
                        inputMode="numeric"
                        min={0}
                        step={1000}
                        placeholder="12000"
                        value={form.annualMileageLimit}
                        onChange={(e) =>
                          updateField("annualMileageLimit", e.target.value)
                        }
                        className={`${inputClassName} pr-14`}
                      />
                      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-zinc-500">
                        mi/yr
                      </span>
                    </div>
                  </FormField>
                </div>

                {!leaseEstimate ? (
                  <p className="mt-4 text-sm text-pretty text-zinc-500 dark:text-zinc-400">
                    Enter MSRP (above), residual percent, and lease term to see an
                    estimated monthly payment. Money factor defaults to 0.00125 if
                    left blank.
                  </p>
                ) : null}

                {leaseEstimate ? (
                  <div
                    className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/50"
                    aria-live="polite"
                  >
                    <h4 className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100">
                      Lease estimate
                    </h4>
                    <dl className="mt-3 flex flex-col gap-3">
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Down payment
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(leaseEstimate.downPayment)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Base residual ({leaseEstimate.residualPercent}% of MSRP)
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(leaseEstimate.baseResidualValue)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Residual value (
                          {leaseEstimate.annualMileageLimit.toLocaleString()}{" "}
                          mi/yr)
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(leaseEstimate.mileageAdjustedResidual)}
                        </dd>
                      </div>
                      {leaseEstimate.mileageResidualAdjustment !== 0 ? (
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                            Mileage residual adjustment
                          </dt>
                          <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                            {leaseEstimate.mileageResidualAdjustment > 0
                              ? "+"
                              : "−"}
                            {formatUsd(
                              Math.abs(leaseEstimate.mileageResidualAdjustment),
                            )}
                          </dd>
                        </div>
                      ) : null}
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Monthly depreciation
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(leaseEstimate.monthlyDepreciation)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Monthly rent charge
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(leaseEstimate.monthlyRentCharge)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 border-t border-zinc-200 pt-3 dark:border-zinc-700">
                        <dt className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                          Est. monthly lease payment
                        </dt>
                        <dd className="text-base font-semibold tabular-nums text-[var(--mazda-accent,#c40012)]">
                          {formatUsd(leaseEstimate.monthlyLeasePayment)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                          Due at signing
                        </dt>
                        <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                          {formatUsd(leaseEstimate.dueAtSigning)}
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-xs text-pretty text-zinc-500 dark:text-zinc-400">
                      Base residual = MSRP × residual percent. Higher mileage
                      lowers the residual (~$0.20 per mile over the lease vs
                      12,000 mi/yr). Depreciation = (car price − down payment −
                      adjusted residual) ÷ lease term.
                    </p>
                  </div>
                ) : null}
              </section>

              {paymentComparison ? (
                <section aria-labelledby={`${formId}-compare`}>
                  <h3
                    id={`${formId}-compare`}
                    className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100"
                  >
                    Compare payments
                  </h3>
                  <div
                    className="mt-4 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2"
                    aria-live="polite"
                  >
                    <div className="flex flex-col rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/50">
                      <h4 className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100">
                        Lease
                      </h4>
                      <dl className="mt-3 flex flex-1 flex-col gap-2">
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                            Monthly depreciation
                          </dt>
                          <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                            {formatUsd(leaseEstimate!.monthlyDepreciation)}
                          </dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                            Monthly rent charge
                          </dt>
                          <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                            {formatUsd(leaseEstimate!.monthlyRentCharge)}
                          </dd>
                        </div>
                        <div className="mt-auto flex items-baseline justify-between gap-4 border-t border-zinc-200 pt-3 dark:border-zinc-700">
                          <dt className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                            Est. monthly lease payment
                          </dt>
                          <dd className="text-base font-semibold tabular-nums text-[var(--mazda-accent,#c40012)]">
                            {formatUsd(paymentComparison.leasePayment)}
                          </dd>
                        </div>
                      </dl>
                      <p className="mt-3 text-xs text-pretty text-zinc-500 dark:text-zinc-400">
                        Depreciation + rent charge = estimated lease payment.
                      </p>
                    </div>

                    <div className="flex flex-col rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/50">
                      <h4 className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100">
                        Finance
                      </h4>
                      <dl className="mt-3 flex flex-1 flex-col gap-2">
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                            Amount financed
                          </dt>
                          <dd className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                            {formatUsd(financeEstimate!.amountFinanced)}
                          </dd>
                        </div>
                        <div className="mt-auto flex items-baseline justify-between gap-4 border-t border-zinc-200 pt-3 dark:border-zinc-700">
                          <dt className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                            Base monthly payment
                          </dt>
                          <dd className="text-base font-semibold tabular-nums text-[var(--mazda-accent,#c40012)]">
                            {formatUsd(paymentComparison.financePayment)}
                          </dd>
                        </div>
                      </dl>
                      <p className="mt-3 text-xs text-pretty text-zinc-500 dark:text-zinc-400">
                        Loan payment on amount financed over your finance term.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-zinc-300 bg-white p-4 dark:border-zinc-600 dark:bg-zinc-900">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        Monthly difference
                      </p>
                      <p className="text-base font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                        {formatUsd(Math.abs(paymentComparison.monthlyDifference))}
                        <span className="ml-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                          {paymentComparison.monthlyDifference === 0
                            ? "— same payment"
                            : paymentComparison.leaseIsLower
                              ? "less per month to lease"
                              : "less per month to finance"}
                        </span>
                      </p>
                    </div>
                  </div>
                </section>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
