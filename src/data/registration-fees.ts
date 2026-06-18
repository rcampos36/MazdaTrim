/** Virginia DMV passenger vehicle weight classes (dmv201 fee schedule). */
export type VirginiaPassengerWeightClass = "light" | "standard";

export type RegistrationFeesResult = {
  titleFee: number;
  plateRegistrationFee: number;
  total: number;
  weightClass: VirginiaPassengerWeightClass;
  description: string;
};

/** Original certificate of title — Virginia DMV. */
export const VIRGINIA_TITLE_FEE = 15;

/** Annual registration for passenger vehicles ≤ 4,000 lbs. */
export const VIRGINIA_REGISTRATION_LIGHT_PASSENGER = 30.75;

/** Annual registration for passenger vehicles 4,001–6,500 lbs. */
export const VIRGINIA_REGISTRATION_STANDARD_PASSENGER = 35.75;

export const VIRGINIA_PASSENGER_WEIGHT_OPTIONS: {
  id: VirginiaPassengerWeightClass;
  label: string;
  registrationFee: number;
}[] = [
  {
    id: "light",
    label: "Passenger up to 4,000 lbs",
    registrationFee: VIRGINIA_REGISTRATION_LIGHT_PASSENGER,
  },
  {
    id: "standard",
    label: "Passenger 4,001–6,500 lbs",
    registrationFee: VIRGINIA_REGISTRATION_STANDARD_PASSENGER,
  },
];

export const DEFAULT_VIRGINIA_PASSENGER_WEIGHT: VirginiaPassengerWeightClass =
  "standard";

/**
 * Virginia tags at purchase: title fee + first-year registration (license plates).
 * Source: Virginia DMV fee schedule (dmv.virginia.gov). Excludes sales tax,
 * highway use fee, emissions, and local registration surcharges.
 */
export function calculateVirginiaRegistrationFees(
  weightClass: VirginiaPassengerWeightClass = DEFAULT_VIRGINIA_PASSENGER_WEIGHT,
): RegistrationFeesResult {
  const option =
    VIRGINIA_PASSENGER_WEIGHT_OPTIONS.find((entry) => entry.id === weightClass) ??
    VIRGINIA_PASSENGER_WEIGHT_OPTIONS[1];

  const titleFee = VIRGINIA_TITLE_FEE;
  const plateRegistrationFee = option.registrationFee;

  return {
    titleFee,
    plateRegistrationFee,
    total: titleFee + plateRegistrationFee,
    weightClass: option.id,
    description: `$${titleFee.toFixed(2)} title + $${plateRegistrationFee.toFixed(2)} registration (${option.label.toLowerCase()})`,
  };
}
