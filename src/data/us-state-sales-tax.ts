/** State motor vehicle sales tax rates (state portion). Local tax may apply. */
export type UsStateSalesTax = {
  code: string;
  name: string;
  /** Rate as a decimal (e.g. 0.0415 for 4.15%). */
  rate: number;
  /** Minimum tax due when applicable (e.g. Virginia $75). */
  minimumTax?: number;
};

export const US_STATE_SALES_TAX: UsStateSalesTax[] = [
  { code: "AL", name: "Alabama", rate: 0.02 },
  { code: "AK", name: "Alaska", rate: 0 },
  { code: "AZ", name: "Arizona", rate: 0.056 },
  { code: "AR", name: "Arkansas", rate: 0.065 },
  { code: "CA", name: "California", rate: 0.0725 },
  { code: "CO", name: "Colorado", rate: 0.029 },
  { code: "CT", name: "Connecticut", rate: 0.0635 },
  { code: "DE", name: "Delaware", rate: 0 },
  { code: "DC", name: "District of Columbia", rate: 0.06 },
  { code: "FL", name: "Florida", rate: 0.06 },
  { code: "GA", name: "Georgia", rate: 0.04 },
  { code: "HI", name: "Hawaii", rate: 0.04 },
  { code: "ID", name: "Idaho", rate: 0.06 },
  { code: "IL", name: "Illinois", rate: 0.0625 },
  { code: "IN", name: "Indiana", rate: 0.07 },
  { code: "IA", name: "Iowa", rate: 0.05 },
  { code: "KS", name: "Kansas", rate: 0.065 },
  { code: "KY", name: "Kentucky", rate: 0.06 },
  { code: "LA", name: "Louisiana", rate: 0.0445 },
  { code: "ME", name: "Maine", rate: 0.055 },
  { code: "MD", name: "Maryland", rate: 0.06 },
  { code: "MA", name: "Massachusetts", rate: 0.0625 },
  { code: "MI", name: "Michigan", rate: 0.06 },
  { code: "MN", name: "Minnesota", rate: 0.065 },
  { code: "MS", name: "Mississippi", rate: 0.05 },
  { code: "MO", name: "Missouri", rate: 0.04225 },
  { code: "MT", name: "Montana", rate: 0 },
  { code: "NE", name: "Nebraska", rate: 0.055 },
  { code: "NV", name: "Nevada", rate: 0.0685 },
  { code: "NH", name: "New Hampshire", rate: 0 },
  { code: "NJ", name: "New Jersey", rate: 0.06625 },
  { code: "NM", name: "New Mexico", rate: 0.04 },
  { code: "NY", name: "New York", rate: 0.04 },
  { code: "NC", name: "North Carolina", rate: 0.03 },
  { code: "ND", name: "North Dakota", rate: 0.05 },
  { code: "OH", name: "Ohio", rate: 0.0575 },
  { code: "OK", name: "Oklahoma", rate: 0.0325 },
  { code: "OR", name: "Oregon", rate: 0 },
  { code: "PA", name: "Pennsylvania", rate: 0.06 },
  { code: "RI", name: "Rhode Island", rate: 0.07 },
  { code: "SC", name: "South Carolina", rate: 0.05, minimumTax: 0 },
  { code: "SD", name: "South Dakota", rate: 0.045 },
  { code: "TN", name: "Tennessee", rate: 0.07 },
  { code: "TX", name: "Texas", rate: 0.0625 },
  { code: "UT", name: "Utah", rate: 0.0485 },
  { code: "VT", name: "Vermont", rate: 0.06 },
  { code: "VA", name: "Virginia", rate: 0.0415, minimumTax: 75 },
  { code: "WA", name: "Washington", rate: 0.065 },
  { code: "WV", name: "West Virginia", rate: 0.06 },
  { code: "WI", name: "Wisconsin", rate: 0.05 },
  { code: "WY", name: "Wyoming", rate: 0.04 },
];

export const DEFAULT_SALES_TAX_STATE = "VA";

export const DEFAULT_PROCESSING_FEE = 749;

export function getStateSalesTax(code: string): UsStateSalesTax | undefined {
  return US_STATE_SALES_TAX.find((state) => state.code === code);
}

export function formatSalesTaxRate(rate: number): string {
  return `${(rate * 100).toFixed(rate * 100 % 1 === 0 ? 0 : 2)}%`;
}
