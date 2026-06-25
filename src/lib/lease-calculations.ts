/** Residual dollar value from MSRP and residual percentage (e.g. 60 → 60%). */
export function calculateResidualFromMsrp(
  msrp: number,
  residualPercent: number,
): number | null {
  if (
    !Number.isFinite(msrp) ||
    msrp < 0 ||
    !Number.isFinite(residualPercent) ||
    residualPercent < 0 ||
    residualPercent > 100
  ) {
    return null;
  }

  return msrp * (residualPercent / 100);
}

export type LeaseCalculationInput = {
  carPrice: number;
  residualValue: number;
  leaseTermMonths: number;
  moneyFactor: number;
  downPayment: number;
  annualMileageLimit: number;
  /** Residual is quoted at this annual mileage; defaults to 12,000. */
  baselineAnnualMileage?: number;
};

/** Industry-standard residual adjustment for miles above/below the baseline allowance. */
export const LEASE_MILEAGE_BASELINE_ANNUAL = 12000;

/** Typical lender residual reduction per mile over the lease term (e.g. Chrysler Capital). */
export const LEASE_MILEAGE_RESIDUAL_RATE_PER_MILE = 0.2;

export type MileageResidualAdjustment = {
  annualMileageLimit: number;
  baselineAnnualMileage: number;
  totalLeaseMiles: number;
  baselineTotalMiles: number;
  mileageDifference: number;
  residualAdjustment: number;
  adjustedResidual: number;
};

/**
 * Higher mileage lowers residual value; lower mileage raises it.
 * Adjustment = −(total lease miles − baseline total miles) × $0.20/mile.
 */
export function adjustResidualForMileage(input: {
  residualValue: number;
  carPrice: number;
  annualMileageLimit: number;
  leaseTermMonths: number;
  baselineAnnualMileage?: number;
}): MileageResidualAdjustment | null {
  const {
    residualValue,
    carPrice,
    annualMileageLimit,
    leaseTermMonths,
    baselineAnnualMileage = LEASE_MILEAGE_BASELINE_ANNUAL,
  } = input;

  if (
    !Number.isFinite(residualValue) ||
    residualValue < 0 ||
    !Number.isFinite(carPrice) ||
    carPrice < 0 ||
    !Number.isFinite(annualMileageLimit) ||
    annualMileageLimit < 0 ||
    !Number.isFinite(leaseTermMonths) ||
    leaseTermMonths <= 0 ||
    !Number.isFinite(baselineAnnualMileage) ||
    baselineAnnualMileage < 0
  ) {
    return null;
  }

  const leaseYears = leaseTermMonths / 12;
  const totalLeaseMiles = annualMileageLimit * leaseYears;
  const baselineTotalMiles = baselineAnnualMileage * leaseYears;
  const mileageDifference = totalLeaseMiles - baselineTotalMiles;
  const residualAdjustment =
    -mileageDifference * LEASE_MILEAGE_RESIDUAL_RATE_PER_MILE;
  const unclampedResidual = residualValue + residualAdjustment;
  const adjustedResidual = Math.min(
    Math.max(unclampedResidual, 0),
    carPrice,
  );

  return {
    annualMileageLimit,
    baselineAnnualMileage,
    totalLeaseMiles,
    baselineTotalMiles,
    mileageDifference,
    residualAdjustment,
    adjustedResidual,
  };
}

export type LeaseCalculationResult = {
  downPayment: number;
  /** Car price after cap cost reduction from down payment. */
  adjustedCapCost: number;
  baseResidualValue: number;
  mileageAdjustedResidual: number;
  mileageResidualAdjustment: number;
  annualMileageLimit: number;
  monthlyDepreciation: number;
  monthlyRentCharge: number;
  /** Base payment before taxes and fees: depreciation + rent charge. */
  monthlyLeasePayment: number;
  dueAtSigning: number;
};

/**
 * Monthly Depreciation = (Adjusted Cap Cost - Mileage-Adjusted Residual) / Lease Term
 * Monthly Rent Charge = (Adjusted Cap Cost + Mileage-Adjusted Residual) × Money Factor
 * Adjusted cap cost = car price − down payment.
 */
export function calculateLeasePayment(
  input: LeaseCalculationInput,
): LeaseCalculationResult | null {
  const {
    carPrice,
    residualValue,
    leaseTermMonths,
    moneyFactor,
    downPayment,
    annualMileageLimit,
    baselineAnnualMileage,
  } = input;

  if (
    !Number.isFinite(carPrice) ||
    carPrice < 0 ||
    !Number.isFinite(residualValue) ||
    residualValue < 0 ||
    !Number.isFinite(leaseTermMonths) ||
    leaseTermMonths <= 0 ||
    !Number.isFinite(moneyFactor) ||
    moneyFactor < 0 ||
    !Number.isFinite(downPayment) ||
    downPayment < 0 ||
    !Number.isFinite(annualMileageLimit) ||
    annualMileageLimit < 0
  ) {
    return null;
  }

  const adjustedCapCost = carPrice - downPayment;
  if (adjustedCapCost < 0) {
    return null;
  }

  const mileageAdjustment = adjustResidualForMileage({
    residualValue,
    carPrice,
    annualMileageLimit,
    leaseTermMonths,
    baselineAnnualMileage,
  });

  if (!mileageAdjustment) {
    return null;
  }

  const { adjustedResidual, residualAdjustment } = mileageAdjustment;

  const monthlyDepreciation =
    (adjustedCapCost - adjustedResidual) / leaseTermMonths;
  const monthlyRentCharge = (adjustedCapCost + adjustedResidual) * moneyFactor;
  const monthlyLeasePayment = monthlyDepreciation + monthlyRentCharge;

  if (
    !Number.isFinite(monthlyDepreciation) ||
    !Number.isFinite(monthlyRentCharge) ||
    !Number.isFinite(monthlyLeasePayment)
  ) {
    return null;
  }

  return {
    downPayment,
    adjustedCapCost,
    baseResidualValue: residualValue,
    mileageAdjustedResidual: adjustedResidual,
    mileageResidualAdjustment: residualAdjustment,
    annualMileageLimit,
    monthlyDepreciation,
    monthlyRentCharge,
    monthlyLeasePayment,
    dueAtSigning: downPayment,
  };
}

export type FinanceCalculationInput = {
  /** Manufacturer suggested retail price (MSRP). */
  msrp: number;
  discount: number;
  rebate: number;
  downPayment: number;
  /** APR as a percentage (e.g. 4.9 for 4.9%). */
  aprPercent: number;
  loanTermMonths: number;
  salesTaxAmount: number;
  processingFee: number;
  registrationFee: number;
  registrationTitleFee: number;
  registrationPlateFee: number;
};

export type FinanceCalculationResult = {
  msrp: number;
  discount: number;
  rebate: number;
  downPayment: number;
  /** MSRP minus discount and rebate — before tax and fees. */
  netCarPrice: number;
  salesTax: number;
  processingFee: number;
  registrationFee: number;
  registrationTitleFee: number;
  registrationPlateFee: number;
  /** Net price plus tax, processing fee, and registration (not reduced by down payment). */
  amountFinanced: number;
  /** Down payment due at signing. */
  dueAtSigning: number;
  /** Loan balance used for the monthly payment (amount financed − down payment). */
  loanBalanceForPayment: number;
  /** Base monthly payment before taxes and fees. */
  baseMonthlyPayment: number;
};

export type SalesTaxInput = {
  carPrice: number;
  taxRate: number;
  minimumTax?: number;
};

/**
 * Sales tax on the full agreed vehicle price.
 * Virginia applies a minimum tax of $75 when configured.
 */
export function calculateSalesTax(input: SalesTaxInput): number | null {
  const { carPrice, taxRate, minimumTax } = input;

  if (
    !Number.isFinite(carPrice) ||
    carPrice < 0 ||
    !Number.isFinite(taxRate) ||
    taxRate < 0
  ) {
    return null;
  }

  const calculatedTax = carPrice * taxRate;
  if (minimumTax !== undefined && calculatedTax < minimumTax) {
    return minimumTax;
  }

  return calculatedTax;
}

/**
 * Net car price = MSRP − discount − rebate.
 * Amount financed = net car price + sales tax + processing fee + registration.
 * Monthly payment is calculated on amount financed − down payment.
 */
export function calculateFinancePayment(
  input: FinanceCalculationInput,
): FinanceCalculationResult | null {
  const {
    msrp,
    discount,
    rebate,
    downPayment,
    aprPercent,
    loanTermMonths,
    salesTaxAmount,
    processingFee,
    registrationFee,
    registrationTitleFee,
    registrationPlateFee,
  } = input;

  if (
    !Number.isFinite(msrp) ||
    msrp < 0 ||
    !Number.isFinite(discount) ||
    discount < 0 ||
    !Number.isFinite(rebate) ||
    rebate < 0 ||
    !Number.isFinite(downPayment) ||
    downPayment < 0 ||
    !Number.isFinite(aprPercent) ||
    aprPercent < 0 ||
    !Number.isFinite(loanTermMonths) ||
    loanTermMonths <= 0 ||
    !Number.isFinite(salesTaxAmount) ||
    salesTaxAmount < 0 ||
    !Number.isFinite(processingFee) ||
    processingFee < 0 ||
    !Number.isFinite(registrationFee) ||
    registrationFee < 0 ||
    !Number.isFinite(registrationTitleFee) ||
    registrationTitleFee < 0 ||
    !Number.isFinite(registrationPlateFee) ||
    registrationPlateFee < 0
  ) {
    return null;
  }

  const netCarPrice = msrp - discount - rebate;
  if (netCarPrice < 0) {
    return null;
  }

  const amountFinanced =
    netCarPrice + salesTaxAmount + processingFee + registrationFee;
  if (amountFinanced <= 0) {
    return null;
  }

  const loanBalanceForPayment = amountFinanced - downPayment;
  if (loanBalanceForPayment <= 0) {
    return null;
  }

  const dueAtSigning = downPayment;

  const monthlyRate = aprPercent / 100 / 12;

  let baseMonthlyPayment: number;
  if (monthlyRate === 0) {
    baseMonthlyPayment = loanBalanceForPayment / loanTermMonths;
  } else {
    baseMonthlyPayment =
      (loanBalanceForPayment * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -loanTermMonths));
  }

  return {
    msrp,
    discount,
    rebate,
    downPayment,
    netCarPrice,
    salesTax: salesTaxAmount,
    processingFee,
    registrationFee,
    registrationTitleFee,
    registrationPlateFee,
    amountFinanced,
    dueAtSigning,
    loanBalanceForPayment,
    baseMonthlyPayment,
  };
}

export function parseFormNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Parse display MSRP strings such as "$29,990" into a number. */
export function parseStartingMsrp(value: string): number | null {
  const cleaned = value.replace(/[$,\s]/g, "");
  if (!cleaned) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
