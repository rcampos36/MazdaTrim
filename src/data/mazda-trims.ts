/**
 * Per model: **sharedSafetyFeatures** apply to every trim (shown once above the cards).
 * Each trim: **addedFeatures** and **trimSafetyAdditions** use **TrimFeatureItem** with a short
 * description of what the feature is and how it helps the driver or passenger.
 */
export interface TrimFeatureItem {
  name: string;
  description: string;
}

function feat(name: string, description: string): TrimFeatureItem {
  return { name, description };
}

export interface ModelTrim {
  id: string;
  name: string;
  startingMsrp: string;
  addedFeatures: TrimFeatureItem[];
  trimSafetyAdditions: TrimFeatureItem[];
  popular?: boolean;
}

export interface ModelTrimLine {
  sharedSafetyFeatures: TrimFeatureItem[];
  trims: ModelTrim[];
}

/** Mazda3 sedan & hatchback — shared safety */
const SHARED_SAFETY_MAZDA3: TrimFeatureItem[] = [
  feat(
    "Advanced Smart City Brake Support with Pedestrian Detection",
    "Monitors ahead at city speeds and can brake automatically to reduce severity if a vehicle or pedestrian is detected.",
  ),
  feat(
    "Lane Departure Warning System with Lane-keep Assist",
    "Warns if you drift from your lane without signaling and can apply gentle steering to help you stay centered.",
  ),
  feat(
    "Blind Spot Monitoring with Rear Cross Traffic Alert",
    "Lights up when a vehicle sits in your blind spot and warns of crossing traffic behind you when reversing.",
  ),
  feat(
    "Mazda Radar Cruise Control with Stop & Go",
    "Keeps a set gap to the car ahead on the highway and can brake to a stop and resume in stop-and-go traffic.",
  ),
  feat(
    "Driver Attention Alert",
    "Watches steering patterns over time and suggests a break if behavior looks like drowsy or inattentive driving.",
  ),
  feat(
    "Dynamic Stability Control and Traction Control System",
    "Cuts engine power or brakes individual wheels to limit slip and help you keep control on slick or uneven surfaces.",
  ),
  feat(
    "Advanced front, side-impact, and side curtain airbags",
    "Supplemental restraints that inflate in a crash to help cushion occupants from impact forces.",
  ),
  feat(
    "Tire Pressure Monitoring System (TPMS)",
    "Illuminates a warning if one or more tires are significantly under-inflated so you can add air before damage occurs.",
  ),
];

/** Crossovers / SUVs (CX-30, CX-50, CX-5, CX-70, CX-90) — shared safety */
const SHARED_SAFETY_SUV: TrimFeatureItem[] = [
  feat(
    "Smart Brake Support with collision warning",
    "Alerts you to possible frontal impacts and can apply the brakes if you don’t respond in time.",
  ),
  feat(
    "Lane Departure Warning with Lane-keep Assist",
    "Notifies you of unintended lane drift and can steer slightly to keep the vehicle between lane markings.",
  ),
  feat(
    "Blind Spot Monitoring with Rear Cross Traffic Alert",
    "Shows when another vehicle is beside you in a blind spot and warns of traffic crossing behind when backing up.",
  ),
  feat(
    "Mazda Radar Cruise Control with Stop & Go",
    "Maintains following distance at speed and can handle full stops and restarts in congested traffic.",
  ),
  feat(
    "Driver Attention Alert",
    "Encourages a rest stop if your steering inputs suggest fatigue or reduced attention over a longer drive.",
  ),
  feat(
    "Hill Launch Assist",
    "Briefly holds brake pressure on inclines so the vehicle doesn’t roll backward when you lift off the brake to accelerate.",
  ),
  feat(
    "Dynamic Stability Control and Traction Control System",
    "Helps prevent skids by adjusting throttle and braking at individual wheels during hard cornering or low grip.",
  ),
  feat(
    "Front, side-impact, and side curtain airbags",
    "Airbag coverage for frontal, side, and curtain areas to help protect occupants in many crash scenarios.",
  ),
  feat(
    "Tire Pressure Monitoring System (TPMS)",
    "Warns when tire pressure drops below a safe threshold so you can correct it and maintain handling and fuel economy.",
  ),
];

const SHARED_SAFETY_CX50_HYBRID: TrimFeatureItem[] = [
  ...SHARED_SAFETY_SUV.slice(0, 8),
  feat(
    "High-voltage battery protective structure",
    "Engineered casing and placement to help shield the hybrid battery pack from road debris and collision intrusion.",
  ),
  ...SHARED_SAFETY_SUV.slice(8),
];

/** MX-5 Miata & RF — shared safety */
const SHARED_SAFETY_MX5: TrimFeatureItem[] = [
  feat(
    "Smart City Brake Support",
    "Can apply braking at lower speeds if a frontal obstacle is detected and the driver hasn’t slowed enough.",
  ),
  feat(
    "Lane Departure Warning System",
    "Alerts you with sound or vibration if the car begins to leave its lane without a turn signal.",
  ),
  feat(
    "Dynamic Stability Control and Traction Control System",
    "Limits wheel spin and helps keep the lightweight chassis stable during aggressive steering or wet pavement.",
  ),
  feat(
    "Driver and passenger front airbags with seat-mounted side airbags",
    "Frontal and thorax protection designed for the roadster’s two-seat cabin layout.",
  ),
  feat(
    "Tire Pressure Monitoring System (TPMS)",
    "Lets you know if a tire is low so you can maintain proper inflation for grip and even tire wear.",
  ),
];

const SAF_AFS = feat(
  "Adaptive Front-Lighting System",
  "Adjusts headlamp aim or distribution in turns and at speed so you see more of the road ahead in the direction you’re steering.",
);
const SAF_360 = feat(
  "360° View Monitor",
  "Stitches multiple camera views into a top-down picture to make parking, curbs, and tight spaces easier to judge.",
);
const SAF_TJA = feat(
  "Traffic Jam Assist",
  "Hands-on assist at low speeds that helps with steering, braking, and following the car ahead in heavy congestion.",
);
const SAF_RCTB = feat(
  "Rear Cross Traffic Braking",
  "Can apply the brakes automatically if sensors detect a vehicle crossing your path while you’re reversing.",
);
const SAF_TSR = feat(
  "Traffic Sign Recognition",
  "Reads certain road signs and can show speed limits or warnings in the display so you’re less likely to miss them.",
);

const TRIM_LINES_BY_MODEL: Record<string, ModelTrimLine> = {
  "mazda3-sedan": {
    sharedSafetyFeatures: SHARED_SAFETY_MAZDA3,
    trims: [
      {
        id: "25-s",
        name: "2.5 S",
        startingMsrp: "$24,550",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "SKYACTIV-G 2.5L engine",
            "Naturally aspirated four-cylinder tuned for smooth response and everyday fuel economy.",
          ),
          feat(
            '8.8" Mazda Connect display',
            "Center screen for audio, settings, and phone integration, often controlled with a console dial for less distraction.",
          ),
          feat(
            "Apple CarPlay™ & Android Auto™",
            "Mirrors supported phone apps for maps, calls, messages, and music on the vehicle display.",
          ),
        ],
      },
      {
        id: "25-s-select-sport",
        name: "2.5 S Select Sport",
        startingMsrp: "$25,440",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "18\" alloy wheels",
            "Larger wheels and lower-profile tires for sharper turn-in and a more athletic stance.",
          ),
          feat(
            "Dual-zone automatic climate control",
            "Driver and front passenger choose separate temperatures for more comfort on long trips.",
          ),
        ],
        popular: true,
      },
      {
        id: "25-s-preferred",
        name: "2.5 S Preferred",
        startingMsrp: "$27,090",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Power moonroof",
            "Glass panel tilts or slides open for fresh air and natural light without leaving the cabin.",
          ),
          feat(
            "Bose® 12-speaker audio",
            "Premium sound with multiple speakers placed around the cabin for clearer music and podcasts.",
          ),
          feat(
            "Heated front seats",
            "Quick warmth on cold mornings; typically multi-level so you can dial in comfort.",
          ),
        ],
      },
      {
        id: "25-s-carbon",
        name: "2.5 S Carbon Edition",
        startingMsrp: "$30,210",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Polymetal Gray exterior treatment",
            "Exclusive gray finish and black accents for a distinct, factory-styled look.",
          ),
          feat(
            "Red leather interior accents",
            "Contrasting red stitching or panels that highlight sport character inside the cabin.",
          ),
          feat(
            "i-Activ AWD®",
            "All-wheel drive that sends torque to all four wheels when slip is detected for better traction in rain or snow.",
          ),
        ],
      },
      {
        id: "25-s-premium",
        name: "2.5 S Premium",
        startingMsrp: "$31,360",
        trimSafetyAdditions: [SAF_AFS],
        addedFeatures: [
          feat(
            "Leather-trimmed seats",
            "Soft-touch seating surfaces that are easier to clean and feel more upscale than cloth.",
          ),
          feat(
            "Windshield-projected Active Driving Display",
            "Key speed and navigation cues appear on the windshield so your eyes stay nearer the road.",
          ),
        ],
      },
      {
        id: "25-turbo-premium-plus",
        name: "2.5 Turbo Premium Plus",
        startingMsrp: "$36,740",
        trimSafetyAdditions: [SAF_360, SAF_TJA],
        addedFeatures: [
          feat(
            "250 hp Dynamic Pressure Turbo (premium fuel)",
            "Turbocharged output for strong passing power when using the recommended higher-octane fuel.",
          ),
        ],
      },
    ],
  },
  "mazda3-hatchback": {
    sharedSafetyFeatures: SHARED_SAFETY_MAZDA3,
    trims: [
      {
        id: "25-s",
        name: "2.5 S",
        startingMsrp: "$25,550",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "SKYACTIV-G 2.5L engine",
            "Responsive four-cylinder suited to daily driving with a balance of efficiency and acceleration.",
          ),
          feat(
            '8.8" Mazda Connect display',
            "Central interface for entertainment, connectivity, and vehicle settings.",
          ),
          feat(
            "Apple CarPlay™ & Android Auto™",
            "Project your phone’s navigation and media to the built-in screen with voice support where available.",
          ),
        ],
      },
      {
        id: "25-s-select-sport",
        name: "2.5 S Select Sport",
        startingMsrp: "$26,740",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "18\" black metallic alloy wheels",
            "Dark-finish wheels that emphasize a sportier hatchback profile.",
          ),
          feat(
            "Dual-zone automatic climate control",
            "Separate left/right temperature settings for driver and front passenger comfort.",
          ),
        ],
        popular: true,
      },
      {
        id: "25-s-preferred",
        name: "2.5 S Preferred",
        startingMsrp: "$28,440",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat("Power moonroof", "Opens or tilts for ventilation and daylight in the cabin."),
          feat(
            "Bose® audio",
            "Upgraded speaker system for richer bass and clearer highs than the base stereo.",
          ),
          feat(
            "Heated front seats",
            "Warmth for driver and passenger in cold weather without bulky layers.",
          ),
        ],
      },
      {
        id: "25-s-carbon",
        name: "2.5 S Carbon Edition",
        startingMsrp: "$31,450",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Exclusive Carbon Edition styling",
            "Unique trim, wheels, or finishes that set this edition apart from other builds.",
          ),
          feat(
            "i-Activ AWD®",
            "Predictive all-wheel drive that helps maintain grip when roads get slick.",
          ),
          feat(
            "Red interior accent treatment",
            "Interior highlights that pair with the Carbon exterior theme.",
          ),
        ],
      },
      {
        id: "25-s-premium",
        name: "2.5 S Premium",
        startingMsrp: "$31,360",
        trimSafetyAdditions: [SAF_AFS],
        addedFeatures: [
          feat(
            "Available 6-speed manual transmission",
            "Engaging stick-shift control for drivers who prefer full gear selection (availability varies by configuration).",
          ),
          feat(
            "Leather-trimmed seats",
            "More premium seating material than cloth or leatherette alone.",
          ),
          feat(
            "Windshield-projected Active Driving Display",
            "HUD-style readouts so critical info sits in your line of sight.",
          ),
        ],
      },
      {
        id: "25-turbo-premium-plus",
        name: "2.5 Turbo Premium Plus",
        startingMsrp: "$37,890",
        trimSafetyAdditions: [SAF_360, SAF_TJA],
        addedFeatures: [
          feat(
            "250 hp Dynamic Pressure Turbo (premium fuel)",
            "High-torque turbo engine for quick merges and highway passing on premium fuel.",
          ),
        ],
      },
    ],
  },
  "cx-30": {
    sharedSafetyFeatures: SHARED_SAFETY_SUV,
    trims: [
      {
        id: "25-s",
        name: "2.5 S",
        startingMsrp: "$25,975",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "SKYACTIV-G 2.5L engine",
            "Proven four-cylinder power for commuting and weekend trips in a compact footprint.",
          ),
          feat(
            '8.8" center display',
            "Primary screen for audio, phone pairing, and vehicle menus.",
          ),
        ],
      },
      {
        id: "25-s-select",
        name: "2.5 S Select",
        startingMsrp: "$27,000",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Roof rails",
            "Mounting points for approved racks to carry bikes, boxes, or sports gear.",
          ),
          feat(
            "Rear privacy glass",
            "Tinted rear glass that reduces glare and helps keep cargo out of plain view.",
          ),
          feat(
            "Dual-zone climate control",
            "Independent temperature zones for left and right front occupants.",
          ),
        ],
        popular: true,
      },
      {
        id: "25-s-preferred",
        name: "2.5 S Preferred",
        startingMsrp: "$28,500",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat("Power moonroof", "Adds light and airflow over front seats."),
          feat(
            "Bose® audio",
            "Brand-name sound tuning with extra speakers for clearer playback.",
          ),
          feat(
            "Heated front seats",
            "Fast heat on cold starts; often paired with heated side mirrors on some packages.",
          ),
        ],
      },
      {
        id: "carbon-turbo",
        name: "2.5 Carbon Turbo",
        startingMsrp: "$32,000",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Turbocharged engine",
            "More horsepower and torque than the base engine for confident highway driving.",
          ),
          feat(
            "Standard i-Activ AWD®",
            "All-wheel drive included on this trim for year-round traction.",
          ),
          feat(
            "Black metallic exterior accents",
            "Dark trim pieces that emphasize a sportier SUV look.",
          ),
        ],
      },
      {
        id: "25-turbo-premium-plus",
        name: "2.5 Turbo Premium Plus",
        startingMsrp: "$36,000",
        trimSafetyAdditions: [SAF_360, SAF_TJA],
        addedFeatures: [
          feat(
            "Up to 250 hp turbo output (premium fuel)",
            "Peak turbo power when refueling with the recommended premium grade.",
          ),
        ],
      },
    ],
  },
  "cx-50": {
    sharedSafetyFeatures: SHARED_SAFETY_SUV,
    trims: [
      {
        id: "25-s",
        name: "2.5 S",
        startingMsrp: "$29,900",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "SKYACTIV-G 2.5L engine",
            "Efficient base engine sized for a compact SUV’s daily duties and light towing where rated.",
          ),
          feat(
            "Mi-Drive (Mazda Intelligent Drive Select)",
            "Drive modes that tweak throttle, shift, and AWD behavior for Normal, Sport, or off-pavement needs.",
          ),
          feat(
            "Available i-Activ AWD®",
            "Optional all-wheel drive that monitors conditions and shifts torque fore and aft as needed.",
          ),
        ],
      },
      {
        id: "25-s-select",
        name: "2.5 S Select",
        startingMsrp: "$31,500",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Power sliding-glass moonroof",
            "One-touch open/close moonroof for cabin brightness and ventilation.",
          ),
          feat(
            "Leatherette seating surfaces",
            "Durable, leather-like upholstery that’s easier to wipe clean than cloth.",
          ),
          feat(
            "Roof rails",
            "Base for crossbars and carriers when you need more cargo flexibility.",
          ),
        ],
        popular: true,
      },
      {
        id: "25-s-preferred",
        name: "2.5 S Preferred",
        startingMsrp: "$33,500",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Bose® audio",
            "Upgraded listening experience for road trips and daily commutes.",
          ),
          feat(
            "Heated front seats",
            "Comfort in winter without idling for the cabin to warm fully.",
          ),
          feat(
            "Power liftgate",
            "Opens the cargo door with a button—handy when your hands are full.",
          ),
        ],
      },
      {
        id: "25-premium",
        name: "2.5 Premium",
        startingMsrp: "$35,500",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Leather-trimmed seats",
            "Softer, more premium seating for long-distance comfort.",
          ),
          feat(
            "Ventilated front seats",
            "Fans pull air through the seat cushions to reduce sweating in hot weather.",
          ),
          feat(
            "Windshield-projected display (HUD)",
            "Speed and nav prompts reflected on the glass so you glance less at the dash.",
          ),
        ],
      },
      {
        id: "25-turbo-premium-plus",
        name: "2.5 Turbo Premium Plus",
        startingMsrp: "$42,000",
        trimSafetyAdditions: [SAF_TJA],
        addedFeatures: [
          feat(
            "256 hp turbocharged engine",
            "Strong turbo output for confident merging and trailer pull within manufacturer limits.",
          ),
          feat(
            "Tow mode / increased towing capability",
            "Transmission and throttle calibration oriented toward stable pulls when properly equipped.",
          ),
        ],
      },
    ],
  },
  "cx-5": {
    sharedSafetyFeatures: SHARED_SAFETY_SUV,
    trims: [
      {
        id: "25-s",
        name: "2.5 S",
        startingMsrp: "$29,990",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "SKYACTIV-G 2.5L engine",
            "Reliable four-cylinder suited to urban and highway use in a compact SUV.",
          ),
          feat(
            '10.25" center display',
            "Wider screen for maps, split views, and clearer menus.",
          ),
          feat(
            "Wireless Apple CarPlay®",
            "Connects iPhone to CarPlay without a cable for fewer cords on the console.",
          ),
        ],
      },
      {
        id: "25-s-select",
        name: "2.5 S Select",
        startingMsrp: "$31,990",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "19\" alloy wheels",
            "Larger-diameter wheels that sharpen steering response and fill the wheel wells.",
          ),
          feat(
            "Power liftgate",
            "Motorized rear door you can open from the key fob or cabin switch.",
          ),
          feat(
            "Black metallic exterior accents",
            "Dark trim for a more assertive exterior appearance.",
          ),
        ],
      },
      {
        id: "25-s-preferred",
        name: "2.5 S Preferred",
        startingMsrp: "$34,250",
        trimSafetyAdditions: [SAF_RCTB],
        addedFeatures: [
          feat(
            "Bose® audio",
            "Richer sound staging for music and hands-free calls.",
          ),
          feat("Power moonroof", "Opens above front occupants for air and sky views."),
          feat(
            "Heated rear seats",
            "Second-row warmth for passengers on cold days.",
          ),
        ],
        popular: true,
      },
      {
        id: "25-s-premium",
        name: "2.5 S Premium",
        startingMsrp: "$36,900",
        trimSafetyAdditions: [SAF_360],
        addedFeatures: [
          feat(
            "Leather-trimmed seating",
            "Leather surfaces on primary touch points for a more upscale feel.",
          ),
          feat(
            "Ventilated front seats",
            "Airflow through perforations to keep you cooler on long summer drives.",
          ),
        ],
      },
      {
        id: "25-s-premium-plus",
        name: "2.5 S Premium Plus",
        startingMsrp: "$38,990",
        trimSafetyAdditions: [SAF_TJA],
        addedFeatures: [
          feat(
            "Premium interior trim upgrades",
            "Higher-grade materials or accents on the dash, doors, or console.",
          ),
          feat(
            "Windshield-projected display (HUD)",
            "Keeps speed and navigation cues in the driver’s forward sight line.",
          ),
        ],
      },
    ],
  },
  "cx-70": {
    sharedSafetyFeatures: SHARED_SAFETY_SUV,
    trims: [
      {
        id: "turbo-s",
        name: "Turbo S",
        startingMsrp: "$42,250",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "e-SKYACTIV® G 3.3L Turbo inline-six",
            "Smooth, torque-rich six-cylinder with turbocharging for refined power delivery.",
          ),
          feat(
            "Standard i-Activ AWD®",
            "All-wheel drive included to help traction in rain, snow, and light off-road.",
          ),
          feat(
            "Mazda Connect™ infotainment",
            "Integrated system for navigation, audio, and vehicle settings on the main display.",
          ),
        ],
      },
      {
        id: "turbo-s-premium",
        name: "Turbo S Premium",
        startingMsrp: "$45,000",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Panoramic moonroof",
            "Large glass roof that brightens the cabin for front and rear passengers.",
          ),
          feat(
            "Leather-trimmed interior",
            "Leather on seats and often steering wheel for a premium touch.",
          ),
          feat(
            "Bose® audio",
            "Multi-speaker setup tuned for the CX-70’s cabin acoustics.",
          ),
        ],
        popular: true,
      },
      {
        id: "turbo-s-premium-plus",
        name: "Turbo S Premium Plus",
        startingMsrp: "$48,500",
        trimSafetyAdditions: [SAF_360],
        addedFeatures: [
          feat(
            "Ventilated front seats",
            "Cooling airflow in the seat cushions and backs on hot days.",
          ),
          feat(
            "Premium interior accents",
            "Extra metal, wood, or contrast stitching for a richer look.",
          ),
        ],
      },
      {
        id: "phev",
        name: "PHEV Premium Plus",
        startingMsrp: "$44,250",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Plug-in hybrid powertrain",
            "Combines gas engine with a rechargeable battery for electric-only trips and blended efficiency.",
          ),
          feat(
            "Combined gas + electric driving range",
            "Use battery miles for short trips and the engine for longer hauls without range anxiety.",
          ),
          feat(
            "DC fast-charging capability",
            "Replenishes the high-voltage battery quickly at compatible public chargers.",
          ),
        ],
      },
    ],
  },
  "cx-90": {
    sharedSafetyFeatures: SHARED_SAFETY_SUV,
    trims: [
      {
        id: "turbo-select",
        name: "Turbo Select",
        startingMsrp: "$38,800",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Three-row seating",
            "Accommodates more passengers or folds flat for large cargo loads.",
          ),
          feat(
            "e-SKYACTIV® G 3.3L Turbo inline-six",
            "Turbo six-cylinder sized to move a three-row SUV with confidence.",
          ),
          feat(
            "Up to 8-passenger capacity",
            "Bench seating configurations that maximize people-carrying when you need it.",
          ),
        ],
      },
      {
        id: "turbo-preferred",
        name: "Turbo Preferred",
        startingMsrp: "$41,500",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Power liftgate",
            "Easier loading of groceries, strollers, and gear into the cargo area.",
          ),
          feat("Power moonroof", "Natural light and ventilation for the first rows."),
          feat(
            "Available second-row captain’s chairs",
            "Walk-through space and individual second-row seats where offered.",
          ),
        ],
        popular: true,
      },
      {
        id: "turbo-premium",
        name: "Turbo Premium",
        startingMsrp: "$44,500",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Leather-trimmed seating",
            "Upgraded upholstery across primary seating positions.",
          ),
          feat(
            "Bose® audio",
            "Clear, full sound for the whole family on long drives.",
          ),
          feat(
            "Hands-free power liftgate",
            "Kick or wave activation (where equipped) when your hands are full.",
          ),
        ],
      },
      {
        id: "turbo-premium-plus",
        name: "Turbo Premium Plus",
        startingMsrp: "$48,000",
        trimSafetyAdditions: [SAF_360],
        addedFeatures: [
          feat(
            "Nappa leather seating",
            "Softer, higher-grade leather for flagship comfort.",
          ),
          feat(
            "Premium interior lighting",
            "Ambient or accent lighting that improves cabin atmosphere at night.",
          ),
        ],
      },
      {
        id: "phev-premium-plus",
        name: "PHEV Premium Plus",
        startingMsrp: "$50,495",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Plug-in hybrid powertrain",
            "Electric driving for daily errands plus a gas engine for longer trips.",
          ),
          feat(
            "7-passenger seating layout",
            "Typical three-row configuration optimized for plug-in packaging.",
          ),
          feat(
            "EV-focused drive modes & MPGe efficiency",
            "Modes that prioritize electric miles or blended operation for efficiency.",
          ),
        ],
      },
    ],
  },
  "mx-5-miata": {
    sharedSafetyFeatures: SHARED_SAFETY_MX5,
    trims: [
      {
        id: "sport",
        name: "Sport",
        startingMsrp: "$30,430",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "SKYACTIV-G 2.0L engine",
            "Lightweight four-cylinder tuned for quick revs and the roadster’s balanced chassis.",
          ),
          feat(
            "Lightweight soft top",
            "Manual or assisted soft top for open-air driving with minimal weight penalty.",
          ),
          feat(
            "Roadster-tuned chassis",
            "Suspension and structure dialed for agility and feedback on twisty roads.",
          ),
        ],
      },
      {
        id: "club",
        name: "Club",
        startingMsrp: "$33,000",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Bilstein® shock absorbers",
            "Performance dampers that better control body motion during hard cornering.",
          ),
          feat(
            "Limited-slip differential",
            "Sends power to the wheel with grip to improve traction exiting corners.",
          ),
          feat(
            "Sport suspension tuning",
            "Firmer springs and dampers for flatter handling at the expense of some ride softness.",
          ),
        ],
        popular: true,
      },
      {
        id: "grand-touring",
        name: "Grand Touring",
        startingMsrp: "$35,500",
        trimSafetyAdditions: [SAF_TSR],
        addedFeatures: [
          feat(
            "Heated seats",
            "Warmth for cool top-down mornings or evening drives.",
          ),
          feat(
            "Automatic climate control",
            "Set a temperature and the system maintains it without constant fan adjustments.",
          ),
        ],
      },
    ],
  },
  "mx-5-miata-rf": {
    sharedSafetyFeatures: SHARED_SAFETY_MX5,
    trims: [
      {
        id: "sport",
        name: "Sport",
        startingMsrp: "$38,450",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Power retractable fastback roof",
            "Hardtop panels stow for convertible-like open air with coupe-like security when closed.",
          ),
          feat(
            "SKYACTIV-G 2.0L engine",
            "Same spirited engine character as the soft-top, paired with the RF’s fixed structure.",
          ),
          feat(
            "LED exterior lighting",
            "Bright, efficient headlights and taillights for night visibility.",
          ),
        ],
      },
      {
        id: "club",
        name: "Club",
        startingMsrp: "$40,500",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Brembo® front brakes (on equipped builds)",
            "High-performance calipers and rotors for stronger, more consistent braking when equipped.",
          ),
          feat(
            "Sport-tuned suspension",
            "Sharper handling bias for enthusiastic driving.",
          ),
          feat(
            "Black exterior accent treatment",
            "Dark wheels or trim for a more aggressive RF appearance.",
          ),
        ],
        popular: true,
      },
      {
        id: "grand-touring",
        name: "Grand Touring",
        startingMsrp: "$43,000",
        trimSafetyAdditions: [SAF_TSR],
        addedFeatures: [
          feat(
            "Heated leather-trimmed seats",
            "Leather surfaces plus heat for comfort in changing weather with the roof configuration.",
          ),
          feat(
            "Navigation",
            "Built-in or connected routing so you’re not dependent on phone signal alone.",
          ),
          feat(
            "Premium audio",
            "Clearer sound for top-down driving wind noise environments.",
          ),
        ],
      },
    ],
  },
  "cx-50-hybrid": {
    sharedSafetyFeatures: SHARED_SAFETY_CX50_HYBRID,
    trims: [
      {
        id: "hybrid-select",
        name: "Hybrid Select",
        startingMsrp: "$34,750",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Hybrid-electric powertrain",
            "Gas engine plus electric motor for regenerative braking and improved efficiency in traffic.",
          ),
          feat(
            "Standard i-Activ AWD®",
            "All-wheel drive included to put hybrid torque to the road in varied conditions.",
          ),
          feat(
            "Mazda Connect™ infotainment",
            "Central hub for hybrid displays, audio, and connectivity.",
          ),
        ],
      },
      {
        id: "hybrid-preferred",
        name: "Hybrid Preferred",
        startingMsrp: "$36,500",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat("Power moonroof", "Adds daylight and ventilation for front occupants."),
          feat(
            "Heated front seats",
            "Quick warmth on cold mornings without waiting for the engine to fully warm the cabin.",
          ),
          feat(
            "Power liftgate",
            "Hands-free-friendly cargo access when loading the rear.",
          ),
        ],
        popular: true,
      },
      {
        id: "hybrid-premium",
        name: "Hybrid Premium",
        startingMsrp: "$39,000",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Leather-trimmed seating",
            "Easier cleanup and a more upscale feel than cloth alone.",
          ),
          feat(
            "Bose® audio",
            "Full-range sound for podcasts and playlists on the road.",
          ),
          feat(
            "Ventilated front seats",
            "Pulls warm air away from your back on humid days.",
          ),
        ],
      },
      {
        id: "hybrid-premium-plus",
        name: "Hybrid Premium Plus",
        startingMsrp: "$42,000",
        trimSafetyAdditions: [SAF_TJA, SAF_360],
        addedFeatures: [
          feat(
            "Premium interior trim",
            "Upgraded finishes on the dash, doors, or shift area for a flagship look.",
          ),
        ],
      },
    ],
  },
};

export function getModelTrimLine(modelId: string): ModelTrimLine | undefined {
  return TRIM_LINES_BY_MODEL[modelId];
}

export function getTrimsForModel(modelId: string): ModelTrim[] {
  return TRIM_LINES_BY_MODEL[modelId]?.trims ?? [];
}
