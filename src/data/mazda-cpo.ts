import { MAZDA_USA_ORIGIN } from "./mazda-models";

/** Mazda USA Certified Pre-Owned program — https://www.mazdausa.com/certified-pre-owned */
export const MAZDA_CPO_SOURCE_URL = `${MAZDA_USA_ORIGIN}/certified-pre-owned`;

export interface CpoBenefit {
  id: string;
  title: string;
  /** Footnote marker shown as superscript (e.g. "2" for warranty). */
  footnote?: string;
  summary: string;
  description: string;
  imagePath: string;
  /** When true, shown in the first three-column row (matches Mazda “confidence” section). */
  featured?: boolean;
}

const CPO_IMAGE = (path: string) =>
  `${MAZDA_USA_ORIGIN}${path}?w=720`;

export function getCpoImageUrl(imagePath: string): string {
  return CPO_IMAGE(imagePath);
}

export const MAZDA_CPO_INTRO = {
  eyebrow: "Mazda Certified Pre-Owned",
  headline: "Experience the confidence of driving certified",
  subhead:
    "The Mazda Certified Pre-Owned Vehicles program gives you the peace of mind to enjoy every mile.",
  lead:
    "Only the best-maintained late-model vehicles make the Mazda Certified Pre-Owned (CPO) cut. To be eligible, they must pass a rigorous 160-point inspection. From major to minor components, each vehicle is scrutinized and tested so you can feel confident and enjoy every drive, mile after mile.",
};

export const MAZDA_CPO_BENEFITS: CpoBenefit[] = [
  {
    id: "vehicle-warranty",
    title: "12-Month/12,000-Mile CPO Vehicle Limited Warranty",
    footnote: "2",
    featured: true,
    summary:
      "Each Mazda Certified Pre-Owned vehicle comes with a confidence-inspiring 12-Month/12,000-Mile limited warranty.",
    description:
      "Each Mazda Certified Pre-Owned vehicle is covered by any remaining portion of its original 3-year/36,000-mile New Vehicle Limited Warranty. The CPO Limited Vehicle Warranty provides coverage for another 12 months or up to 12,000 miles, with no deductible on covered repairs. For Mazda CPO vehicles that are no longer covered by the New Vehicle Limited Warranty, the CPO Limited Vehicle Warranty takes effect at time of purchase.",
    imagePath:
      "/siteassets/images/cpo/2016-m3s-titaniumflash-street-cpo-overview.jpg",
  },
  {
    id: "powertrain-warranty",
    title: "7-Year/100,000-Mile Limited Powertrain Warranty",
    footnote: "3",
    featured: true,
    summary:
      "Flywheel to freeze plug, thermostat to turbocharger, cylinder block to constant velocity joints—our 7-Year/100,000-Mile CPO Limited Powertrain Warranty has you covered.",
    description:
      "Flywheel to freeze plug, thermostat to turbocharger, cylinder block to constant velocity joints, our 7-Year/100,000-Mile CPO Limited Powertrain Warranty has you covered.",
    imagePath: "/siteassets/images/cpo/skyactivengine-mazdacpo.jpg",
  },
  {
    id: "zero-deductible",
    title: "Zero deductible on covered repairs",
    featured: true,
    summary:
      "In the rare event that a covered part needs to be repaired or replaced, your total out-of-pocket cost will be zero at Mazda dealers throughout the United States.",
    description:
      "In the rare event that a covered part needs to be repaired or replaced, your total out-of-pocket cost will be zero at Mazda Dealers throughout the United States.",
    imagePath: "/siteassets/images/cpo/skyactivsuspension-mazdacpo.jpg",
  },
  {
    id: "roadside",
    title: "24-Hour Emergency Roadside Assistance",
    summary:
      "Mazda Certified Pre-Owned buyers and qualified family members are covered 24 hours a day, 7 days a week.",
    description:
      "Mazda Certified Pre-Owned buyers and qualified family members are covered 24 hours a day, 7 days a week by the complimentary Mazda 24-hour Emergency Roadside Assistance Program. Emergency Roadside Assistance applies for the duration of the 7-Year/100,000-Mile CPO Limited Powertrain Warranty in the U.S. and Canada. Services include jump starts, lockout assistance, flat tire changes, towing to the nearest authorized Mazda dealership, and gas delivery.",
    imagePath: "/siteassets/images/cpo/owners-customerservice-mazdacpo.jpg",
  },
  {
    id: "inspection",
    title: "160-Point Detailed Inspection",
    summary:
      "Each vehicle endures an uncompromising 160-point inspection inside and out, performed by a factory-trained Mazda technician.",
    description:
      "Each vehicle is required to endure an uncompromising 160-point inspection inside and out, performed by a factory-trained Mazda technician. Highlights include A/C and heating, interior, brakes, transmission, exterior, and engine checks.",
    imagePath: "/siteassets/images/cpo/owners-serviceinspection-mazdacpo.jpg",
  },
  {
    id: "carfax",
    title: "CARFAX® Vehicle History Report™",
    footnote: "4",
    summary:
      "Each Mazda Certified Pre-Owned vehicle comes with a CARFAX® Vehicle History Report™.",
    description:
      "To make sure you know exactly what you are getting, each Mazda Certified Pre-Owned vehicle comes with a CARFAX® Vehicle History Report™ and one-year Buyback Guarantee™ from CARFAX®.",
    imagePath: "/siteassets/images/cpo/mx5-tunnel-mazdacpo.jpg",
  },
  {
    id: "transfer",
    title: "Transfer benefits",
    summary:
      "CPO limited warranties are transferable to future owners at no cost.",
    description:
      "No one likes to say goodbye to a Mazda. But if the time comes, your car will be even more attractive to potential buyers because the Mazda Certified Pre-Owned Limited Vehicle and Limited Powertrain warranties are transferable to future owners at no cost.",
    imagePath:
      "/siteassets/images/cpo/2016-m6g-soulred-longroad-aerialview-mazdacpo.jpg",
  },
  {
    id: "siriusxm",
    title: "Complimentary 3-month SiriusXM® trial",
    footnote: "5",
    summary:
      "Select satellite radio–equipped Mazda CPO vehicles include a 3-month SiriusXM All Access trial.",
    description:
      "Select satellite radio–equipped Mazda Certified Pre-Owned Vehicles feature a 3-month trial subscription to the SiriusXM All Access package. Enjoy over 150 channels including commercial-free music, sports, news, talk, comedy, and entertainment—plus streaming online and with the free app.",
    imagePath:
      "/siteassets/images/cpo/2016-cx5-black-studiogray-04-mazdacpo.jpg",
  },
  {
    id: "college",
    title: "Mazda College Graduate Finance Program",
    summary:
      "Recent or soon-to-be graduates may qualify for competitive APRs and lease terms on a new or certified pre-owned Mazda.",
    description:
      "If you're a recent or soon-to-be college graduate—including a graduate of a select trade or vocational program—you may qualify for competitive APRs and lease terms on a new or certified pre-owned Mazda. Visit your local Mazda Dealer for complete program details.",
    imagePath: "/siteassets/images/cpo/column_tout_college_1_550x324.jpg",
  },
];

export const MAZDA_CPO_DISCLAIMERS: { marker: string; text: string }[] = [
  {
    marker: "2",
    text: "Whichever comes first. See your Mazda Dealer for Limited Warranty details.",
  },
  {
    marker: "3",
    text: "Whichever comes first from when the vehicle was originally purchased as new. See your Mazda Dealer for Limited Warranty details.",
  },
  {
    marker: "4",
    text: "Subject to all terms and conditions for CARFAX® Buyback Guarantee™ coverage.",
  },
  {
    marker: "5",
    text: "SiriusXM audio and data services each require a subscription sold separately by Sirius XM Radio Inc. See SiriusXM Customer Agreement for complete terms at www.siriusxm.com.",
  },
];
