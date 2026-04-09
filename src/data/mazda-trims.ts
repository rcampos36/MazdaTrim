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
  /** When true, hide “all features from previous trim” (e.g. alternate powertrain branch). */
  hidePreviousTrimComparison?: boolean;
}

export interface ModelTrimLine {
  sharedSafetyFeatures: TrimFeatureItem[];
  trims: ModelTrim[];
}

/**
 * 2026 Mazda3 — standard i-Activsense® (sedan & hatchback; automatic transmission for MRCC per Mazda USA).
 * @see https://www.mazdausa.com/shopping-tools/build-and-price#/26M3S
 * @see https://www.mazdausa.com/shopping-tools/build-and-price#/26M3H
 */
const SHARED_SAFETY_MAZDA3: TrimFeatureItem[] = [
  feat(
    "Mazda Radar Cruise Control with Stop & Go",
    "Maintains following distance and can brake to a stop and resume in congestion (automatic transmission models).",
  ),
  feat(
    "Smart Brake Support",
    "Forward collision warning and automatic emergency braking when a frontal impact risk is detected.",
  ),
  feat(
    "Lane Departure Warning with Lane-keep Assist",
    "Warns if you drift from your lane without signaling and can steer gently to help you stay centered.",
  ),
  feat(
    "Driver Attention Alert",
    "Suggests a break if steering patterns suggest reduced attention over time.",
  ),
  feat(
    "High Beam Control",
    "Automatically switches high and low beams at night to improve visibility without dazzling others.",
  ),
  feat(
    "Blind Spot Monitoring with Rear Cross-Traffic Alert",
    "Indicates vehicles in your blind spot and warns of crossing traffic behind you when reversing.",
  ),
  feat(
    "Vehicle Exit Warning",
    "Can alert occupants if opening a door may conflict with approaching traffic or cyclists.",
  ),
  feat(
    "Rear Seat Alert",
    "Reminds you to check the rear seat after a rear door was opened on a trip.",
  ),
  feat(
    "Dynamic Stability Control and Traction Control System",
    "Adjusts throttle and braking at individual wheels to help maintain control in low-grip or abrupt maneuvers.",
  ),
  feat(
    "Advanced front, side-impact, and side curtain airbags",
    "Supplemental restraints designed to help protect occupants in frontal, side, and curtain impacts.",
  ),
  feat(
    "Tire Pressure Monitoring System (TPMS)",
    "Warns when a tire is significantly under-inflated.",
  ),
];

/**
 * 2026 Mazda CX-30 — standard i-Activsense® and safety (Mazda USA news & build-and-price).
 * @see https://www.mazdausa.com/shopping-tools/build-and-price#/26C30
 */
const SHARED_SAFETY_CX30: TrimFeatureItem[] = [
  feat(
    "Mazda Radar Cruise Control with Stop & Go",
    "Maintains a set gap to traffic ahead on the highway and can brake to a stop and resume in congestion.",
  ),
  feat(
    "Smart Brake Support",
    "Forward collision warning and automatic emergency braking when a frontal impact risk is detected.",
  ),
  feat(
    "High Beam Control",
    "Automatically switches between high and low beams at night to brighten the road without dazzling other drivers.",
  ),
  feat(
    "Lane Departure Warning with Lane-keep Assist",
    "Warns if you drift from your lane without signaling and can apply gentle steering to help you stay centered.",
  ),
  feat(
    "Rear Seat Alert",
    "Reminds you to check the rear seat for passengers or items when exiting after a rear door was opened.",
  ),
  feat(
    "Vehicle Exit Warning",
    "Can alert occupants if it’s unsafe to open a door into approaching traffic or cyclists from behind.",
  ),
  feat(
    "Driver Attention Alert",
    "Suggests a break if steering patterns suggest reduced attention over time.",
  ),
  feat(
    "Blind Spot Monitoring with Rear Cross Traffic Alert",
    "Lights when a vehicle sits in your blind spot and warns of crossing traffic behind you when reversing.",
  ),
  feat(
    "Dynamic Stability Control and Traction Control System",
    "Adjusts throttle and braking at individual wheels to help maintain control in slippery or abrupt maneuvers.",
  ),
  feat(
    "Front, side-impact, and side curtain airbags",
    "Supplemental restraints designed to help protect occupants in frontal, side, and curtain impact scenarios.",
  ),
  feat(
    "Tire Pressure Monitoring System (TPMS)",
    "Illuminates a warning if one or more tires are significantly under-inflated.",
  ),
];

/**
 * 2026 Mazda CX-50 (gas) — standard i-Activsense® from 2.5 S Select baseline.
 * @see https://www.mazdausa.com/shopping-tools/build-and-price#/26C50
 */
const SHARED_SAFETY_CX50_GAS: TrimFeatureItem[] = [
  feat(
    "Mazda Radar Cruise Control with Stop & Go",
    "Maintains following distance and can stop and resume in congestion (Mazda USA CX-50).",
  ),
  feat(
    "Smart Brake Support with Pedestrian Detection",
    "Forward warning and braking when a vehicle or pedestrian collision risk is detected.",
  ),
  feat(
    "Lane Departure Warning with Lane-keep Assist",
    "Warns of lane drift and can apply gentle steering to help keep the vehicle centered.",
  ),
  feat(
    "Blind Spot Monitoring with Rear Cross-Traffic Alert",
    "Side blind-spot indication and alerts for crossing traffic when reversing.",
  ),
  feat(
    "Driver Attention Alert",
    "Suggests a break if steering patterns suggest reduced attention over time.",
  ),
  feat(
    "High Beam Control",
    "Automatically switches high and low beams at night for better visibility and courtesy.",
  ),
  feat(
    "Rear Seat Alert",
    "Reminds you to check the rear seat after a rear door was opened on a trip.",
  ),
  feat(
    "Vehicle Exit Warning",
    "Can alert occupants if opening a door may conflict with approaching traffic or cyclists.",
  ),
  feat(
    "Dynamic Stability Control and Traction Control System",
    "Adjusts throttle and braking at individual wheels to help maintain control in low grip.",
  ),
  feat(
    "Front, side-impact, and side curtain airbags",
    "Supplemental restraints for frontal, side, and curtain impact scenarios.",
  ),
  feat(
    "Tire Pressure Monitoring System (TPMS)",
    "Warns when a tire is significantly under-inflated.",
  ),
];

/**
 * 2026 Mazda CX-50 Hybrid — i-Activsense® plus hybrid high-voltage protection (same core assists as gas CX-50).
 * @see https://www.mazdausa.com/shopping-tools/build-and-price#/2650H
 */
const SHARED_SAFETY_CX50_HYBRID: TrimFeatureItem[] = [
  ...SHARED_SAFETY_CX50_GAS.slice(0, 8),
  feat(
    "High-voltage battery protective structure",
    "Engineered casing and placement to help shield the hybrid battery pack from road debris and collision intrusion.",
  ),
  ...SHARED_SAFETY_CX50_GAS.slice(8),
];

/**
 * 2026 Mazda CX-5 (3rd gen) — standard safety & driver assistance on every trim.
 * @see https://www.mazdausa.com/shopping-tools/build-and-price#/26CX5
 */
const SHARED_SAFETY_CX5: TrimFeatureItem[] = [
  feat(
    "Mazda Radar Cruise Control with Speed Limit Assist",
    "Adaptive cruise that can factor recognized speed limits into following-distance behavior.",
  ),
  feat(
    "Traffic Sign Recognition",
    "Can display recognized speed limits and certain road signs in the cluster or head-up style display.",
  ),
  feat(
    "Rear Smart Brake Support",
    "Can apply braking automatically while reversing if a rear collision risk is detected.",
  ),
  feat(
    "Rear Cross Traffic Alert with Pedestrian Detection",
    "Warns of crossing traffic—and pedestrians where detected—when backing out.",
  ),
  feat(
    "Smart Brake Support (front) with Turn-Across Traffic alert",
    "Forward collision mitigation plus alerts when turning across oncoming paths.",
  ),
  feat(
    "Emergency Lane Keeping",
    "Includes blind-spot-related assist, road-edge keep assist, and head-on traffic avoidance support (Mazda USA).",
  ),
  feat(
    "Blind Spot Monitoring",
    "Indicates when a vehicle is alongside you in an adjacent lane.",
  ),
  feat(
    "Vehicle Exit Warning",
    "Can alert occupants if opening a door may conflict with approaching traffic or cyclists.",
  ),
  feat(
    "Driver Attention Alert",
    "Detects signs of distraction or fatigue and prompts the driver to stay focused or take a break.",
  ),
  feat(
    "Front and rear parking sensors",
    "Distance sensors at both bumpers to ease parking maneuvers.",
  ),
  feat(
    "Rearview camera with dynamic guidelines and tow hitch guide",
    "Backup camera with moving guidelines and a hitch-alignment aid for low-speed towing setup.",
  ),
  feat(
    "Dynamic Stability Control and Traction Control System",
    "Helps maintain control by adjusting throttle and braking at individual wheels in low grip or abrupt maneuvers.",
  ),
  feat(
    "Front, side-impact, and side curtain airbags",
    "Supplemental restraints for frontal, side, and curtain impact scenarios.",
  ),
  feat(
    "Tire Pressure Monitoring System (TPMS)",
    "Warns when a tire is significantly under-inflated.",
  ),
];

/**
 * 2026 Mazda CX-70 — baseline i-Activsense® (3.3 Turbo Preferred & PHEV SC class).
 * @see https://www.mazdausa.com/shopping-tools/build-and-price#/26C70
 */
const SHARED_SAFETY_CX70: TrimFeatureItem[] = [
  feat(
    "Smart Brake Support",
    "Forward collision warning and automatic emergency braking when a frontal risk is detected.",
  ),
  feat(
    "Blind Spot Monitoring",
    "Indicates when a vehicle is in an adjacent lane blind spot.",
  ),
  feat(
    "Mazda Radar Cruise Control with Stop & Go",
    "Adaptive cruise that can brake to a stop and resume in traffic (feature availability per Mazda spec).",
  ),
  feat(
    "Driver Attention Alert",
    "Alerts if reduced attention or fatigue is inferred from driving behavior.",
  ),
  feat(
    "Lane Keep Assist with Lane Departure Warning",
    "Warns of lane drift and can steer gently to help you stay centered.",
  ),
  feat(
    "Rear Cross Traffic Alert",
    "Warns of crossing traffic behind you when reversing.",
  ),
  feat(
    "Vehicle Exit Warning",
    "Can alert if opening a door may conflict with approaching traffic or cyclists.",
  ),
  feat(
    "Rear View Monitor with static guidelines",
    "Backup camera with fixed parking guide lines.",
  ),
  feat(
    "Dynamic Stability Control and Traction Control System",
    "Helps maintain control by adjusting throttle and braking at individual wheels.",
  ),
  feat(
    "Front, side-impact, and side curtain airbags",
    "Supplemental restraints for frontal, side, and curtain impacts.",
  ),
  feat(
    "Tire Pressure Monitoring System (TPMS)",
    "Warns when a tire is significantly under-inflated.",
  ),
];

/**
 * 2026 Mazda CX-90 — baseline i-Activsense® (3.3 Turbo Select; PHEV adds anti-theft immobilizer on Preferred+).
 * @see https://www.mazdausa.com/shopping-tools/build-and-price#/26C90
 */
const SHARED_SAFETY_CX90: TrimFeatureItem[] = [
  feat(
    "Mazda Radar Cruise Control with Stop & Go",
    "Adaptive cruise that can brake to a stop and resume in traffic.",
  ),
  feat(
    "Smart Brake Support",
    "Forward collision warning and automatic emergency braking when a frontal risk is detected.",
  ),
  feat(
    "Blind Spot Monitoring with Vehicle Exit Warning",
    "Blind spot alerts and warnings when exiting may conflict with approaching traffic or cyclists.",
  ),
  feat(
    "Rear Cross Traffic Alert",
    "Warns of crossing traffic behind you when reversing.",
  ),
  feat(
    "Lane Departure Warning System with Lane-keep Assist",
    "Warns of lane drift and can steer gently to help you stay centered.",
  ),
  feat(
    "Rear Seat Alert",
    "Reminds you to check the rear seat for passengers or items after a rear door was used.",
  ),
  feat(
    "Driver Attention Alert",
    "Alerts if reduced attention or fatigue is inferred from driving behavior.",
  ),
  feat(
    "Dynamic Stability Control and Traction Control System",
    "Helps maintain control by adjusting throttle and braking at individual wheels.",
  ),
  feat(
    "Front, side-impact, and side curtain airbags",
    "Supplemental restraints for frontal, side, and curtain impacts.",
  ),
  feat(
    "Tire Pressure Monitoring System (TPMS)",
    "Warns when a tire is significantly under-inflated.",
  ),
];

const SAF_SPEED_LIMIT_ASSIST = feat(
  "Speed Limit Assist",
  "Works with Mazda Radar Cruise Control to factor recognized speed limits into cruising behavior.",
);
const SAF_RVM_DYNAMIC_GUIDELINES = feat(
  "Rear View Monitor with dynamic guidelines",
  "Backup display with guidelines that adjust with steering to show the vehicle path.",
);
const SAF_360_SEE_THROUGH_TRAILER_HITCH = feat(
  "360° View Monitor with See-Through and Trailer Hitch View",
  "Surround cameras with see-through perspective plus a hitch-alignment view for towing setup.",
);

/**
 * 2026 Mazda MX-5 Miata & RF — baseline i-Activsense® and passive safety (Sport & Club; Grand Touring adds more).
 * @see https://www.mazdausa.com/shopping-tools/build-and-price#/26MX5
 * @see https://www.mazdausa.com/shopping-tools/build-and-price#/26MXR
 */
const SHARED_SAFETY_MX5: TrimFeatureItem[] = [
  feat(
    "Smart Brake Support",
    "Forward collision warning and automatic emergency braking when a frontal risk is detected.",
  ),
  feat(
    "Lane Departure Warning System",
    "Alerts you if the car begins to leave its lane without a turn signal.",
  ),
  feat(
    "Blind Spot Monitoring with Rear Cross-Traffic Alert",
    "Blind spot indication and warnings for crossing traffic behind you when reversing.",
  ),
  feat(
    "Driver Attention Alert",
    "Encourages a rest stop if steering patterns suggest reduced attention over time.",
  ),
  feat(
    "Vehicle Exit Warning",
    "Can alert occupants if opening a door may conflict with approaching traffic or cyclists.",
  ),
  feat(
    "Secondary Collision Reduction",
    "Helps mitigate additional forces after an initial collision event.",
  ),
  feat(
    "Dynamic Stability Control and Traction Control System",
    "Limits wheel spin and helps keep the lightweight chassis stable during aggressive steering or wet pavement.",
  ),
  feat(
    "Dual front airbags, seat-mounted side-impact airbags, and side-impact door beams",
    "Frontal, side, and structural protection for the two-seat roadster cabin.",
  ),
  feat(
    "Tire Pressure Monitoring System (TPMS)",
    "Warns when a tire is significantly under-inflated.",
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
const SAF_SBS_REAR_AND_RCTB = feat(
  "Smart Brake Support–Rear and Rear Cross-Traffic Braking",
  "Can apply the brakes while reversing if a rear obstacle or crossing traffic is detected and you don’t respond in time.",
);
const SAF_SBS_REVERSE_AND_REAR_CROSSING = feat(
  "Smart Brake Support–Reverse and Rear Crossing",
  "Braking assist when reversing or when rear cross-traffic poses a collision risk (Mazda3 Turbo Premium Plus).",
);
const SAF_EMERGENCY_LANE_KEEPING = feat(
  "Emergency Lane Keeping",
  "Can help steer back toward the lane if an unintended departure toward detected hazards is recognized.",
);
const SAF_BLIND_SPOT_ASSIST = feat(
  "Blind Spot Assist",
  "Steering-related assistance to help avoid a lane change when a vehicle is detected in the blind spot.",
);
const SAF_FRONT_CROSS_TRAFFIC_ALERT = feat(
  "Front Cross Traffic Alert",
  "Warns of crossing traffic when moving forward from tight or obscured situations.",
);
const SAF_REAR_SMART_BRAKE_SUPPORT = feat(
  "Rear Smart Brake Support",
  "Can apply braking automatically while reversing if a rear collision risk is detected.",
);
const SAF_SBS_TURN_ACROSS_FRONT_CROSSING = feat(
  "Smart Brake Support with Turn-Across Traffic and Front Crossing",
  "Braking support when turning across traffic paths or when frontal crossing movement is detected.",
);
const SAF_SECONDARY_COLLISION_REDUCTION = feat(
  "Secondary Collision Reduction",
  "Helps mitigate additional forces after an initial collision event.",
);
const SAF_360_SEE_THROUGH = feat(
  "360° View Monitor with See-Through View",
  "Surround cameras with a see-through view mode to better judge placement around the vehicle.",
);
const SAF_FCTA_FCTB = feat(
  "Front Cross Traffic Alert and Braking (FCTA/FCTB)",
  "Warns and can brake when crossing traffic is detected while moving forward from tight or obscured exits.",
);
const SAF_DRIVER_MONITORING = feat(
  "Driver Monitoring",
  "Watches for signs of distraction or fatigue and can alert the driver to refocus on the road.",
);
const SAF_360_CX5_EXPANDED = feat(
  "360° View Monitor (expanded views)",
  "Surround view with underfloor, parking, and mirrors-folded perspectives for placement in tight spaces.",
);
const SAF_CTS_LANE_CHANGE_ASSIST = feat(
  "Cruising & Traffic Support with Lane Change Assist",
  "Hands-on highway assist; with turn signal and safe conditions, the system can help execute an automatic lane change.",
);
const SAF_TSR = feat(
  "Traffic Sign Recognition",
  "Reads certain road signs and can show speed limits or warnings in the display so you’re less likely to miss them.",
);
const SAF_HIGH_BEAM_CONTROL = feat(
  "High Beam Control",
  "Automatically switches between high and low beams at night to brighten the road without dazzling other drivers.",
);
const SAF_MRCC_DISTANCE_SPEED_ALERT = feat(
  "Mazda Radar Cruise Control with Distance & Speed Alert",
  "Adaptive cruise with following-distance control and speed-related alerts (Grand Touring automatic; Mazda USA).",
);
const SAF_CRUISING_TRAFFIC_SUPPORT = feat(
  "Cruising & Traffic Support",
  "Hands-on system that maintains following distance and, when lane markings are visible, helps keep the vehicle centered to reduce fatigue in traffic.",
);
const SAF_ROAD_KEEP_AND_HEAD_ON = feat(
  "Road Keep Assist and Head-on Traffic Avoidance Assist",
  "Helps keep the vehicle centered in the lane and can assist when oncoming-traffic conflicts are detected.",
);
const SAF_SECURITY_SYSTEM = feat(
  "Security system",
  "Theft-deterrent alarm and related security functions (per Mazda USA packaging).",
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
            "Front-wheel drive (FWD)",
            "Standard drivetrain for the 2.5 S sedan; i-Activ AWD® is not offered on this grade.",
          ),
          feat(
            "SKYACTIV-G 2.5L engine",
            "Naturally aspirated four-cylinder; up to 186 hp and 186 lb-ft on regular fuel (Mazda USA spec).",
          ),
          feat(
            "SKYACTIV-Drive 6-speed automatic",
            "Six-speed automatic with manual shift mode and Sport mode.",
          ),
          feat(
            "Mazda Connected Services (complimentary 1 year)",
            "Remote vehicle monitoring and features through the MyMazda app after enrollment.",
          ),
          feat(
            "In-car Wi-Fi hotspot capability",
            "Three-month or 2 GB trial, whichever comes first, where equipped and activated.",
          ),
          feat(
            'Mazda Connect with 8.8" center display',
            "Infotainment with console Commander control; wired Apple CarPlay™ and Android Auto™ integration.",
          ),
          feat(
            "Eight-speaker Mazda Harmonic Acoustics™ audio",
            "Standard eight-speaker system for 2026 (Mazda USA packaging).",
          ),
          feat(
            "Push-button start and remote keyless illuminated entry",
            "Keyless start and illuminated entry for easier access at night.",
          ),
          feat(
            "Rearview camera",
            "Backup camera display for parking and reversing.",
          ),
          feat(
            "Dual front USB-C inputs",
            "USB-C ports for charging and compatible connectivity.",
          ),
          feat(
            "Air conditioning and Bluetooth®",
            "Climate control and wireless phone audio pairing.",
          ),
          feat(
            "LED exterior lighting",
            "LED headlights, taillights, and daytime running lights.",
          ),
          feat(
            "Body-colored side mirrors with LED turn-signal indicators",
            "Painted mirror caps with integrated turn signals.",
          ),
          feat(
            '16" silver aluminum-alloy wheels',
            "Silver-finish 16-inch alloy wheels.",
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
            "Mazda Advanced Keyless Entry",
            "Proximity locking and unlocking without pressing remote buttons on a supported key fob.",
          ),
          feat(
            "Rain-sensing windshield wipers",
            "Wiper rate adjusts automatically when the glass gets wet.",
          ),
          feat(
            "Dual-zone automatic climate control",
            "Separate driver and front-passenger temperature settings.",
          ),
          feat(
            "Rear center armrest with cupholders",
            "Fold-down armrest and cupholders for rear passengers.",
          ),
          feat(
            "Black leatherette-trimmed seats",
            "Leather-like seating surfaces in black.",
          ),
          feat(
            "Leather-wrapped steering wheel and shift knob",
            "Soft-touch wrap on primary controls.",
          ),
          feat(
            '18" aluminum-alloy wheels with black finish',
            "Larger black-finish alloy wheels versus the 2.5 S 16-inch silver wheels.",
          ),
          feat(
            "Black heated door mirrors",
            "Heated side mirrors in black to match the wheel treatment.",
          ),
          feat(
            "Alexa Built-in",
            "Voice control for compatible vehicle, climate, audio, and smart-home functions.",
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
            "Power sliding-glass moonroof",
            "Moonroof for light and ventilation over the front seats.",
          ),
          feat(
            "Heated front seats",
            "Multi-level heat for driver and front passenger.",
          ),
          feat(
            "Eight-way power driver’s seat with power lumbar and memory",
            "Power adjustments including lumbar support with memory positions.",
          ),
          feat(
            "Optional Greige leatherette seats",
            "Greige leatherette upholstery available on sedan Preferred (build-dependent).",
          ),
          feat(
            "Body-colored side mirrors with reverse tilt-down",
            "Mirrors tilt down in Reverse on the sedan for curbs and parking lines.",
          ),
          feat(
            '18" silver-finish aluminum-alloy wheels',
            "Silver-finish 18-inch wheels (sedan Preferred; hatchback uses gray metallic per Mazda USA).",
          ),
        ],
      },
      {
        id: "25-s-carbon",
        name: "2.5 S Carbon Edition",
        startingMsrp: "$29,615",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Standard i-Activ AWD®",
            "All-wheel drive standard on Carbon Edition for added traction in varied conditions.",
          ),
          feat(
            "Red leather-trimmed interior",
            "Distinctive red leather paired with select exterior colors.",
          ),
          feat(
            "Exterior colors: Jet Black Mica; available Snowflake White Pearl Mica and Polymetal Gray Metallic",
            "Carbon Edition palette including premium paints where selected (extra charge may apply).",
          ),
          feat(
            "Wireless Apple CarPlay™ and Android Auto™",
            "Cable-free phone projection on supported devices.",
          ),
          feat(
            "HD Radio™",
            "Digital FM with extra program information where stations broadcast in HD.",
          ),
          feat(
            "Qi wireless phone charging",
            "Charge compatible smartphones on the pad without a cable.",
          ),
          feat(
            "Gloss black heated door mirrors",
            "Heated mirrors in gloss black coordinated with Carbon styling.",
          ),
          feat(
            '18" black aluminum-alloy wheels',
            "Black-finish 18-inch alloy wheels.",
          ),
        ],
      },
      {
        id: "25-turbo-premium-plus",
        name: "2.5 Turbo Premium Plus",
        startingMsrp: "$36,740",
        trimSafetyAdditions: [
          SAF_CRUISING_TRAFFIC_SUPPORT,
          SAF_360,
          SAF_SBS_REVERSE_AND_REAR_CROSSING,
          SAF_TSR,
          SAF_AFS,
        ],
        addedFeatures: [
          feat(
            "Standard i-Activ AWD® and Dynamic Pressure Turbo",
            "AWD with turbocharged 2.5L; up to 250 hp and 320 lb-ft on premium fuel (227 hp / 310 lb-ft on regular).",
          ),
          feat(
            "Gloss black aerodynamic accents and black rear spoiler (sedan)",
            "Blacked-out aero trim; sedan adds a blacked-out rear spoiler.",
          ),
          feat(
            "Black or white leather-trimmed seats",
            "Leather seating choices on Turbo Premium Plus sedan.",
          ),
          feat(
            "Bose® 12-speaker premium audio",
            "Bose® premium sound with twelve speakers.",
          ),
          feat(
            '10.25" display with touchscreen and wireless Apple CarPlay™ / Android Auto™',
            "Larger screen with touch control when using wireless phone projection.",
          ),
          feat(
            "Windshield-projected Active Driving Display",
            "Speed, safety, and navigation cues projected in your line of sight.",
          ),
          feat(
            "Front and rear parking sensors",
            "Audible distance alerts to complement the surround-view camera system.",
          ),
          feat(
            "Steering-wheel paddle shifters",
            "Manual shift control without removing hands far from the wheel.",
          ),
          feat(
            "Heated steering wheel",
            "Warmth at the wheel in cold weather.",
          ),
          feat(
            "Frameless auto-dimming rearview mirror with HomeLink®",
            "Glare-reducing mirror; HomeLink® for compatible gates and garage doors.",
          ),
          feat(
            "Mazda Online Navigation",
            "Connected navigation with over-the-air update capability where subscribed and available.",
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
            "Mazda3 hatchback body style",
            "Five-door hatchback layout with flexible cargo volume (Mazda USA 2.5 S).",
          ),
          feat(
            "Front-wheel drive (FWD)",
            "Standard drivetrain on 2.5 S hatchback; i-Activ AWD® is not offered on this grade.",
          ),
          feat(
            "SKYACTIV-G 2.5L engine",
            "Naturally aspirated four-cylinder; up to 186 hp and 186 lb-ft on regular fuel (Mazda USA spec).",
          ),
          feat(
            "SKYACTIV-Drive 6-speed automatic",
            "Six-speed automatic with manual shift mode and Sport mode.",
          ),
          feat(
            "Mazda Connected Services (complimentary 1 year)",
            "Remote vehicle monitoring and features through the MyMazda app after enrollment.",
          ),
          feat(
            "In-car Wi-Fi hotspot capability",
            "Three-month or 2 GB trial, whichever comes first, where equipped and activated.",
          ),
          feat(
            'Mazda Connect with 8.8" center display',
            "Infotainment with console Commander control; wired Apple CarPlay™ and Android Auto™ integration.",
          ),
          feat(
            "Eight-speaker Mazda Harmonic Acoustics™ audio",
            "Standard eight-speaker system for 2026 (Mazda USA packaging).",
          ),
          feat(
            "Push-button start and remote keyless illuminated entry",
            "Keyless start and illuminated entry for easier access at night.",
          ),
          feat(
            "Rearview camera",
            "Backup camera display for parking and reversing.",
          ),
          feat(
            "Dual front USB-C inputs",
            "USB-C ports for charging and compatible connectivity.",
          ),
          feat(
            "Air conditioning and Bluetooth®",
            "Climate control and wireless phone audio pairing.",
          ),
          feat(
            "LED exterior lighting",
            "LED headlights, taillights, and daytime running lights.",
          ),
          feat(
            "Body-colored side mirrors with LED turn-signal indicators",
            "Painted mirror caps with integrated turn signals.",
          ),
          feat(
            '16" silver aluminum-alloy wheels',
            "Silver-finish 16-inch alloy wheels.",
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
            "Mazda Advanced Keyless Entry",
            "Proximity locking and unlocking without pressing remote buttons on a supported key fob.",
          ),
          feat(
            "Rain-sensing windshield wipers",
            "Wiper rate adjusts automatically when the glass gets wet.",
          ),
          feat(
            "Dual-zone automatic climate control",
            "Separate driver and front-passenger temperature settings.",
          ),
          feat(
            "Rear center armrest with cupholders",
            "Fold-down armrest and cupholders for rear passengers.",
          ),
          feat(
            "Black leatherette-trimmed seats",
            "Leather-like seating surfaces in black.",
          ),
          feat(
            "Leather-wrapped steering wheel and shift knob",
            "Soft-touch wrap on primary controls.",
          ),
          feat(
            '18" aluminum-alloy wheels with black finish',
            "Larger black-finish alloy wheels versus the 2.5 S 16-inch silver wheels.",
          ),
          feat(
            "Black heated door mirrors",
            "Heated side mirrors in black to match the wheel treatment.",
          ),
          feat(
            "Alexa Built-in",
            "Voice control for compatible vehicle, climate, audio, and smart-home functions.",
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
          feat(
            "Power sliding-glass moonroof",
            "Moonroof for light and ventilation over the front seats.",
          ),
          feat(
            "Heated front seats",
            "Multi-level heat for driver and front passenger.",
          ),
          feat(
            "Eight-way power driver’s seat with power lumbar and memory",
            "Power adjustments including lumbar support with memory positions.",
          ),
          feat(
            "Black leatherette seats (hatchback standard)",
            "Black leatherette upholstery standard on hatchback Preferred (optional Greige on sedan only).",
          ),
          feat(
            "Body-colored side mirrors with reverse tilt-down",
            "Mirrors tilt down in Reverse for curbs and parking lines.",
          ),
          feat(
            '18" gray metallic aluminum-alloy wheels',
            "Gray metallic finish 18-inch wheels on hatchback Preferred (sedan uses silver-finish 18-inch).",
          ),
        ],
      },
      {
        id: "25-s-carbon",
        name: "2.5 S Carbon Edition",
        startingMsrp: "$30,765",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Standard i-Activ AWD®",
            "All-wheel drive standard on Carbon Edition for traction in varied conditions.",
          ),
          feat(
            "Red leather-trimmed interior",
            "Red leather paired with Jet Black Mica or available Snowflake White Pearl Mica and Polymetal Gray Metallic (premium paint charges may apply).",
          ),
          feat(
            "All features from 2.5 S Preferred",
            "Builds on Preferred equipment including moonroof, heated seats, power driver seat, and Preferred-level tech.",
          ),
          feat(
            "Wireless Apple CarPlay™ and Android Auto™",
            "Cable-free phone projection on supported devices.",
          ),
          feat(
            "HD Radio™",
            "Digital FM with extra program information where stations broadcast in HD.",
          ),
          feat(
            "Qi wireless phone charging",
            "Charge compatible smartphones on the pad without a cable.",
          ),
          feat(
            "Gloss black heated door mirrors",
            "Heated mirrors in gloss black coordinated with Carbon styling.",
          ),
          feat(
            '18" black aluminum-alloy wheels',
            "Black-finish 18-inch alloy wheels.",
          ),
        ],
      },
      {
        id: "25-s-premium",
        name: "2.5 S Premium",
        startingMsrp: "$31,360",
        trimSafetyAdditions: [SAF_TSR, SAF_AFS],
        addedFeatures: [
          feat(
            "Hatchback-exclusive 2.5 S Premium grade",
            "Not offered on the Mazda3 Sedan; unique manual-transmission-focused package (Mazda USA).",
          ),
          feat(
            "Front-wheel drive (FWD) with SKYACTIV-MT 6-speed manual",
            "Six-speed manual gearbox for drivers who prefer to shift themselves; FWD only on this trim.",
          ),
          feat(
            "Bose® 12-speaker premium audio with aluminum speaker grilles",
            "Bose® system with twelve speakers and aluminum grille detail.",
          ),
          feat(
            "SiriusXM® with three-month complimentary trial",
            "Satellite radio trial where activated and available.",
          ),
          feat(
            "Windshield-projected Active Driving Display (full-color)",
            "Full-color head-up style readouts for speed, safety, and navigation cues.",
          ),
          feat(
            "Mazda Online Navigation",
            "Connected navigation with over-the-air update capability where subscribed and available.",
          ),
          feat(
            "Black or red leather-trimmed seats",
            "Leather seating offered in black or red on 2.5 S Premium hatchback.",
          ),
          feat(
            '18" black-finish aluminum-alloy wheels',
            "Black-finish 18-inch wheels.",
          ),
          feat(
            "Signature LED headlights and taillights",
            "Distinctive LED front and rear signature lighting.",
          ),
        ],
      },
      {
        id: "25-turbo-premium-plus",
        name: "2.5 Turbo Premium Plus",
        startingMsrp: "$37,890",
        trimSafetyAdditions: [
          SAF_CRUISING_TRAFFIC_SUPPORT,
          SAF_360,
          SAF_SBS_REVERSE_AND_REAR_CROSSING,
          SAF_TSR,
          SAF_AFS,
        ],
        addedFeatures: [
          feat(
            "Standard i-Activ AWD® and Dynamic Pressure Turbo",
            "AWD with turbocharged 2.5L; up to 250 hp and 320 lb-ft on premium fuel (227 hp / 310 lb-ft on regular).",
          ),
          feat(
            "Gloss black aero accents, rear spoiler, and front air dam (hatchback)",
            "Blacked-out aero trim; hatchback adds rear spoiler and front air dam.",
          ),
          feat(
            "Black or red leather-trimmed seats",
            "Leather seating choices on Turbo Premium Plus hatchback.",
          ),
          feat(
            "Bose® 12-speaker premium audio",
            "Bose® premium sound with twelve speakers.",
          ),
          feat(
            '10.25" display with touchscreen and wireless Apple CarPlay™ / Android Auto™',
            "Larger screen with touch control when using wireless phone projection.",
          ),
          feat(
            "Windshield-projected Active Driving Display",
            "Speed, safety, and navigation cues projected in your line of sight.",
          ),
          feat(
            "Front and rear parking sensors",
            "Audible distance alerts to complement the surround-view camera system.",
          ),
          feat(
            "Steering-wheel paddle shifters",
            "Manual shift control without removing hands far from the wheel.",
          ),
          feat(
            "Heated steering wheel",
            "Warmth at the wheel in cold weather.",
          ),
          feat(
            "Frameless auto-dimming rearview mirror with HomeLink®",
            "Glare-reducing mirror; HomeLink® for compatible gates and garage doors.",
          ),
          feat(
            "Mazda Online Navigation",
            "Connected navigation with over-the-air update capability where subscribed and available.",
          ),
        ],
      },
    ],
  },
  "cx-30": {
    sharedSafetyFeatures: SHARED_SAFETY_CX30,
    trims: [
      {
        id: "25-s",
        name: "2.5 S",
        startingMsrp: "$25,975",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "SKYACTIV-G 2.5L engine (186 hp / 186 lb-ft)",
            "Naturally aspirated four-cylinder; rated output on any regular-grade fuel.",
          ),
          feat(
            "SKYACTIV-Drive 6-speed automatic",
            "Automatic with manual shift mode and Sport mode for more control when you want it.",
          ),
          feat(
            "Standard i-Activ AWD®",
            "Monitors weight distribution and shifts torque for responsive traction in changing conditions.",
          ),
          feat(
            "Brake Limited Slip Differential",
            "New for 2026; helps traction and stability when accelerating by biasing torque to the wheel with grip.",
          ),
          feat(
            "Updated dampers",
            "Revised suspension tuning for 2026 aimed at a more comfortable ride over rough pavement.",
          ),
          feat(
            "G-Vectoring Control Plus",
            "Subtle engine torque and braking adjustments through corners for smoother, more natural handling.",
          ),
          feat(
            "Off-Road Traction Assist",
            "Mode that helps manage wheel slip on loose or uneven surfaces when you’re away from pavement.",
          ),
          feat(
            "Mazda Connected Services (complimentary 1 year)",
            "Remote vehicle status and controls through the MyMazda app after enrollment.",
          ),
          feat(
            "In-car Wi-Fi hotspot trial",
            "Three-month or 2 GB trial (whichever comes first) where equipped and activated.",
          ),
          feat(
            'Mazda Connect with 8.8" display',
            "Center screen controlled with the multifunction Commander control; wired Apple CarPlay® and Android Auto™.",
          ),
          feat(
            "Eight-speaker audio with Mazda Harmonic Acoustics™",
            "Factory-tuned sound through eight speakers for clearer music and calls.",
          ),
          feat(
            "Dual USB-C inputs",
            "Front USB-C ports for charging and compatible device connectivity.",
          ),
          feat(
            '7" LCD multi-information gauge display',
            "Digital driver display for trip, fuel, safety, and vehicle status readouts.",
          ),
          feat(
            "Push-button start and remote keyless illuminated entry",
            "Keyless start and illuminated entry for easier access at night.",
          ),
          feat(
            "Black cloth seats and automatic climate control",
            "Five-seat cloth interior with single-zone automatic temperature control.",
          ),
          feat(
            "Electronic parking brake",
            "Push-button hold and release for the parking brake.",
          ),
          feat(
            "Speed-sensitive power door locks and one-touch power windows",
            "Auto-locking with speed and express up/down windows where equipped.",
          ),
          feat(
            "LED headlights, taillights, and daytime running lights",
            "Automatic on/off LED headlamps plus LED tail and signature DRLs.",
          ),
          feat(
            "Black rear roof spoiler and matte-finish front grille",
            "Sportier rear profile and non-chrome grille treatment.",
          ),
          feat(
            '16" gray metallic aluminum-alloy wheels',
            "Gray metallic finish alloy wheels with all-season tires (size per manufacturer spec).",
          ),
        ],
      },
      {
        id: "25-s-select-sport",
        name: "2.5 S Select Sport",
        startingMsrp: "$27,660",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "18\" aluminum-alloy wheels with Black Metallic finish",
            "Larger black-finish alloys versus the 2.5 S 16-inch gray wheels.",
          ),
          feat(
            "Heated black door mirrors with memory and reverse tilt-down",
            "Heated mirrors that remember your position and tilt down in Reverse for curbs and parking lines.",
          ),
          feat(
            "Available exclusive Ceramic Metallic paint",
            "Special-order exterior color available on this grade (premium paint charges may apply).",
          ),
          feat(
            "Wireless Apple CarPlay® and Android Auto™",
            "Phone projection without a cable on supported devices.",
          ),
          feat(
            "Eight-way power driver’s seat with two-position memory",
            "Power seat adjustments with two stored positions for the driver.",
          ),
          feat(
            "Heated front seats",
            "Quick warmth for driver and front passenger in cold weather.",
          ),
          feat(
            "Alexa Built-in",
            "Voice-assistant integration for compatible commands and skills where connected.",
          ),
          feat(
            "Leatherette seating (Black or Greige)",
            "Leather-like upholstery in black or greige depending on build.",
          ),
          feat(
            "Leather-wrapped steering wheel and shift knob",
            "Soft-touch wrap on primary controls.",
          ),
          feat(
            "Mazda Advanced Keyless Entry",
            "Walk-up locking/unlocking without pressing the remote buttons on a supported key fob.",
          ),
          feat(
            "Dual-zone automatic climate control with rear air-conditioning vents",
            "Separate left/right front temperatures plus vents for rear passengers.",
          ),
          feat(
            "Rear center armrest with cupholders",
            "Fold-down armrest and cupholders for second-row passengers.",
          ),
          feat(
            "Illuminated vanity mirrors",
            "Lit sun-visor mirrors for driver and front passenger.",
          ),
          feat(
            "Rear privacy glass",
            "Tinted rear glass for sun glare reduction and modest cargo concealment.",
          ),
        ],
        popular: true,
      },
      {
        id: "25-s-preferred",
        name: "2.5 S Preferred",
        startingMsrp: "$29,290",
        trimSafetyAdditions: [SAF_SBS_REAR_AND_RCTB],
        addedFeatures: [
          feat(
            '10.25" center display with touchscreen',
            "Larger widescreen with touchscreen for Apple CarPlay® and Android Auto™ on supported apps.",
          ),
          feat(
            "Wireless phone charging",
            "Qi-compatible charging pad for supported smartphones.",
          ),
          feat(
            "Power sliding-glass moonroof with tilt",
            "One-touch moonroof for light, ventilation, and tilt venting.",
          ),
          feat(
            "Silver roof rails",
            "Factory roof rails for approved accessory racks and carriers.",
          ),
          feat(
            "Rain-sensing windshield wipers",
            "Wipers adjust rate automatically when the windshield gets wet.",
          ),
          feat(
            "Leatherette seats",
            "Leather-like seating surfaces on this grade.",
          ),
          feat(
            '18" silver metallic aluminum-alloy wheels',
            "Silver metallic finish 18-inch alloys (versus Select Sport’s black finish).",
          ),
          feat(
            "Body-colored door mirrors",
            "Mirror caps painted to match the body instead of black.",
          ),
          feat(
            "Front and rear parking sensors",
            "Audible alerts for obstacles near the bumpers when parking.",
          ),
          feat(
            "Overhead console with sunglass holder",
            "Convenient storage for sunglasses above the rearview mirror.",
          ),
        ],
      },
      {
        id: "25-s-aire-edition",
        name: "2.5 S Aire Edition",
        startingMsrp: "$29,850",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Gloss black Mazda and CX-30 badging",
            "Black-finish emblems for a monochrome exterior look.",
          ),
          feat(
            '18" black metallic aluminum-alloy wheels',
            "Black metallic wheels coordinated with Aire exterior trim.",
          ),
          feat(
            "Black roof rails and black side mirrors",
            "Dark roof rails and mirror caps matching the Aire theme.",
          ),
          feat(
            "White leatherette seats with gray cloth inserts",
            "Light interior palette with contrasting gray textile inserts.",
          ),
          feat(
            "Gray suede-like interior trim and light gray stitching",
            "Soft-touch trim accents and stitching for a modern, airy cabin.",
          ),
        ],
      },
      {
        id: "25-carbon-edition",
        name: "2.5 Carbon Edition",
        startingMsrp: "$31,030",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Exclusive Polymetal Gray Metallic exterior",
            "Paint exclusive to naturally aspirated Carbon Edition (premium paint charge may apply).",
          ),
          feat(
            "Red leather-trimmed seats and interior accents",
            "Red leather seating and coordinated interior trim.",
          ),
          feat(
            '18" black aluminum-alloy wheels',
            "Black alloy wheels paired with the Carbon color scheme.",
          ),
          feat(
            "Gloss black heated door mirrors",
            "Heated mirrors in gloss black to match Carbon exterior details.",
          ),
          feat(
            "Bose® 12-speaker premium audio",
            "Bose® branded premium sound with twelve speakers.",
          ),
          feat(
            "HD Radio™",
            "Digital FM broadcasts with extra program info where stations support HD Radio™.",
          ),
          feat(
            "Frameless auto-dimming rearview mirror with HomeLink®",
            "Glare-reducing mirror without a thick bezel; HomeLink® for compatible gates and garage doors.",
          ),
        ],
      },
      {
        id: "25-s-premium",
        name: "2.5 S Premium",
        startingMsrp: "$33,240",
        trimSafetyAdditions: [SAF_360, SAF_TSR, SAF_AFS],
        addedFeatures: [
          feat(
            "Heated steering wheel",
            "Warmth at the wheel for cold-weather comfort.",
          ),
          feat(
            "Windshield-projected Active Driving Display",
            "Projects speed, safety, and navigation cues ahead of you to reduce eyes-off-road time.",
          ),
          feat(
            "Black or white leather-trimmed seats",
            "Leather seating choices building on Carbon Edition content.",
          ),
          feat(
            "Power liftgate",
            "Hands-free or switch-operated rear hatch opening and closing where equipped.",
          ),
          feat(
            '18" silver metallic aluminum-alloy wheels',
            "Silver metallic 18-inch wheels as specified for this grade.",
          ),
          feat(
            "LED signature illumination headlights and taillights",
            "Distinctive LED front and rear signature lighting treatment.",
          ),
        ],
      },
      {
        id: "25-turbo-aire-edition",
        name: "2.5 Turbo Aire Edition",
        startingMsrp: "$34,410",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "SKYACTIV-G 2.5 Dynamic Pressure Turbo",
            "Up to 250 hp and 320 lb-ft on 93-octane premium; 227 hp and 310 lb-ft on regular 87-octane fuel.",
          ),
          feat(
            "Strong low-end torque (2,000–2,500 rpm)",
            "Peak torque developed low in the rev range for responsive launches and passing.",
          ),
          feat(
            "Turbo Aire styling (black badges, light interior)",
            "Same modern black-badge look as the 2.5 S Aire Edition with a light cabin theme.",
          ),
          feat(
            "White leatherette with gray suede-like inserts",
            "Seats with gray suede-like inserts matching interior trim and gray stitching.",
          ),
        ],
      },
      {
        id: "25-turbo-premium-plus",
        name: "2.5 Turbo Premium Plus",
        startingMsrp: "$37,900",
        trimSafetyAdditions: [SAF_CRUISING_TRAFFIC_SUPPORT],
        addedFeatures: [
          feat(
            "Gloss black exterior badges",
            "Black-finish Mazda and model badging complementing turbo exterior trim.",
          ),
          feat(
            "Steering-wheel-mounted paddle shifters",
            "Manual gear control without taking hands far from the wheel.",
          ),
          feat(
            "SiriusXM® with three-month trial",
            "Satellite radio trial subscription where activated and available.",
          ),
          feat(
            "Auto-dimming driver’s side door mirror",
            "Reduces glare from headlights behind you on the driver’s mirror.",
          ),
        ],
      },
    ],
  },
  "cx-50": {
    sharedSafetyFeatures: SHARED_SAFETY_CX50_GAS,
    trims: [
      {
        id: "25-s-select",
        name: "2.5 S Select",
        startingMsrp: "$29,900",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "SKYACTIV-G 2.5L engine (187 hp / 185 lb-ft)",
            "Naturally aspirated four-cylinder on regular 87-octane fuel.",
          ),
          feat(
            "SKYACTIV-Drive 6-speed automatic",
            "Six-speed automatic transmission.",
          ),
          feat(
            "Standard i-Activ AWD® and Mi-Drive",
            "All-wheel drive with Mazda Intelligent Drive Select including Sport and Off-Road modes.",
          ),
          feat(
            "Alexa Built-in",
            "Voice control for compatible vehicle, climate, audio, and smart-home functions.",
          ),
          feat(
            "Wireless phone charger and four USB-C ports",
            "Qi charging pad plus four USB-C connections.",
          ),
          feat(
            '10.25" full-color center display with HD Radio™',
            "Widescreen infotainment with HD Radio™ capability.",
          ),
          feat(
            "Eight-speaker audio and wireless Apple CarPlay® / Android Auto™ with touch",
            "Eight speakers; wireless phone projection with touchscreen support when paired.",
          ),
          feat(
            "Mazda Connect™ and Mazda Advanced Keyless Entry",
            "Infotainment system with proximity keyless entry and push-button start.",
          ),
          feat(
            '7" TFT LCD instrument panel',
            "Digital driver display for vehicle and trip information.",
          ),
          feat(
            "Dual-zone automatic climate control with rear vents",
            "Separate front temperatures plus airflow to the second row.",
          ),
          feat(
            "Leather-wrapped steering wheel and shift knob",
            "Half leatherette seats with leather-wrapped primary controls.",
          ),
          feat(
            '17" Black Metallic alloy wheels',
            "Black-finish 17-inch alloy wheels.",
          ),
          feat(
            "Tinted privacy glass, LED headlights, and rear roof spoiler",
            "Privacy rear glass, LED headlamps, and integrated rear spoiler.",
          ),
          feat(
            "Roof rails and black power mirrors with LED turn signals",
            "Roof rails for accessories; power mirrors with integrated signals.",
          ),
          feat(
            "Dual exhaust outlets and rain-sensing windshield wipers",
            "Twin exhaust finishers and automatic wiper speed in rain.",
          ),
        ],
        popular: true,
      },
      {
        id: "25-s-preferred",
        name: "2.5 S Preferred",
        startingMsrp: "$32,400",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Power sliding panoramic moonroof",
            "Large glass moonroof for light and an open feel.",
          ),
          feat(
            "Front and rear parking sensors",
            "Distance alerts for the front and rear bumpers when parking (new for 2026).",
          ),
          feat(
            "Power rear liftgate",
            "Motorized tailgate for easier cargo access.",
          ),
          feat(
            "Heated side mirrors",
            "Heated mirror glass for ice and fog.",
          ),
          feat(
            "Eight-way power driver’s seat with power lumbar",
            "Power driver seat including lumbar adjustment.",
          ),
          feat(
            "Heated front seats",
            "Warmth for driver and front passenger.",
          ),
          feat(
            "Available White Interior Option",
            "Optional white half leatherette seats ($200 when selected).",
          ),
        ],
      },
      {
        id: "25-s-meridian",
        name: "2.5 S Meridian Edition",
        startingMsrp: "$33,150",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            '18" alloy wheels with all-terrain tires',
            "Larger wheels with all-terrain rubber for mixed-surface confidence.",
          ),
          feat(
            "Black roof rails",
            "Dark roof rails matching the Meridian outdoor theme.",
          ),
          feat(
            "Black half leatherette seats (Meridian exclusive)",
            "Black half leatherette upholstery exclusive to this grade.",
          ),
          feat(
            "Exterior colors: Jet Black Mica, Polymetal Gray Metallic, or Zircon Sand Metallic",
            "Meridian Edition offered only in these exterior colors.",
          ),
          feat(
            "Gloss black Mazda emblems and gloss black CX-50, AWD, and Skyactiv-G badging",
            "Black-finish brand and model badges.",
          ),
          feat(
            "Same convenience and safety content as 2.5 S Preferred",
            "Builds on Preferred equipment (moonroof, liftgate, sensors, heated seats, etc.).",
          ),
        ],
      },
      {
        id: "25-s-premium",
        name: "2.5 S Premium",
        startingMsrp: "$34,900",
        trimSafetyAdditions: [SAF_TSR],
        addedFeatures: [
          feat(
            "Black leather seats with 20\" Black Metallic machine-finish wheels",
            "Black leather and 20-inch black metallic machine-finished alloys with all-season tires.",
          ),
          feat(
            "Or White Interior Option: white leather, 20\" Silver wheels, silver roof rails",
            "Optional white leather, 20-inch silver machine-finish wheels, and silver roof rails ($200 interior + options).",
          ),
          feat(
            "Ventilated front seats",
            "Cooling airflow in the front seat cushions and backs.",
          ),
          feat(
            "Power six-way passenger seat and two-position driver memory",
            "Power front passenger adjustment plus two stored driver seat positions.",
          ),
          feat(
            "Auto-dimming rearview mirror with HomeLink®",
            "Glare-reducing mirror with programmable gate and garage buttons.",
          ),
          feat(
            "Bose® 12-speaker premium audio",
            "Bose® premium sound system.",
          ),
          feat(
            "Roof-mounted shark fin antenna and windshield wiper de-icer",
            "Sleek antenna and de-icing for the wiper rest area.",
          ),
          feat(
            "SiriusXM® with three-month trial",
            "Satellite radio trial where activated.",
          ),
        ],
      },
      {
        id: "25-turbo",
        name: "2.5 Turbo",
        startingMsrp: "$37,900",
        trimSafetyAdditions: [SAF_AFS],
        addedFeatures: [
          feat(
            "SKYACTIV-G 2.5L Dynamic Pressure Turbo",
            "256 hp and 320 lb-ft on 93-octane premium; 227 hp and 310 lb-ft on regular 87-octane.",
          ),
          feat(
            "Six-speed automatic with paddle shifters and standard i-Activ AWD®",
            "Paddle shifters with turbo-tuned six-speed and standard AWD.",
          ),
          feat(
            "Up to 3,500 lb towing when properly equipped",
            "Towing mode and accessories enable up to 3,500-pound capacity (Mazda USA).",
          ),
          feat(
            "Builds on 2.5 S Premium with larger dual exhaust outlets",
            "Turbo-specific exhaust finishers plus S Premium-level amenities.",
          ),
          feat(
            "Gloss black Mazda emblems and black roof rails",
            "Black badges and roof rails; White Interior Option swaps to chrome badges and silver rails.",
          ),
          feat(
            "Signature LED headlights with auto-leveling and LED taillights",
            "Signature lighting with automatic headlamp leveling.",
          ),
          feat(
            "Automatic power-folding side mirrors with memory",
            "Mirrors fold at the touch of a button and recall stored positions.",
          ),
          feat(
            "Full-color Active Driving Display (windshield-projected)",
            "Full-color head-up style readouts on the windshield.",
          ),
        ],
      },
      {
        id: "25-turbo-meridian",
        name: "2.5 Turbo Meridian Edition",
        startingMsrp: "$40,400",
        trimSafetyAdditions: [SAF_SECONDARY_COLLISION_REDUCTION],
        addedFeatures: [
          feat(
            '18" alloy wheels with all-terrain tires',
            "All-terrain tires on 18-inch wheels for trailhead and mixed surfaces.",
          ),
          feat(
            "Side rocker garnish, hood graphics, and outdoor-oriented accessories",
            "Distinct exterior trim and accessory focus for outdoor use.",
          ),
          feat(
            "Gloss black Mazda emblems and badges; black roof rails",
            "Black branding and roof rails; exterior limited to Jet Black Mica, Polymetal Gray, or Zircon Sand.",
          ),
          feat(
            "Terracotta leather seats",
            "Terracotta leather upholstery exclusive to this outdoor-focused turbo trim.",
          ),
          feat(
            "Heated rear seats and heated steering wheel",
            "Second-row heat and a heated wheel for cold-weather comfort.",
          ),
          feat(
            "Mazda Online Navigation with over-the-air updates",
            "Connected navigation with OTA map and feature updates where available.",
          ),
        ],
      },
      {
        id: "25-turbo-premium-plus",
        name: "2.5 Turbo Premium Plus",
        startingMsrp: "$42,900",
        trimSafetyAdditions: [
          SAF_360_SEE_THROUGH,
          SAF_EMERGENCY_LANE_KEEPING,
          SAF_BLIND_SPOT_ASSIST,
          SAF_TJA,
          SAF_FRONT_CROSS_TRAFFIC_ALERT,
          SAF_REAR_SMART_BRAKE_SUPPORT,
          SAF_SBS_TURN_ACROSS_FRONT_CROSSING,
        ],
        addedFeatures: [
          feat(
            "All Turbo conveniences except Meridian-exclusive equipment",
            "Full turbo feature set without the Meridian-only all-terrain and hood-graphic package.",
          ),
          feat(
            "Gloss black emblems and black roof rails; available White Interior Option",
            "Black badges and rails, or optional white leather with silver 20-inch wheels and chrome badges.",
          ),
          feat(
            "Frameless auto-dimming rearview mirror with HomeLink®",
            "Premium mirror without a thick bezel plus HomeLink®.",
          ),
          feat(
            "Auto-dimming driver’s side mirror",
            "Glare reduction on the driver’s exterior mirror.",
          ),
        ],
      },
    ],
  },
  "cx-5": {
    sharedSafetyFeatures: SHARED_SAFETY_CX5,
    trims: [
      {
        id: "25-s",
        name: "2.5 S",
        startingMsrp: "$29,990",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "SKYACTIV-G 2.5L (187 hp / 186 lb-ft)",
            "Naturally aspirated four-cylinder with six-speed automatic and standard i-Activ AWD®.",
          ),
          feat(
            "Mi-Drive (Normal, Sport, Off-Road)",
            "Drive modes that tune transmission and AWD behavior for the surface and your mood.",
          ),
          feat(
            "G-Vectoring Control Plus with electronic brake limited-slip differential",
            "Smoother cornering behavior and improved traction when one wheel has less grip.",
          ),
          feat(
            "Updated shocks, wheels, and tires",
            "Third-gen CX-5 ride and handling package with revised dampers and tire setup (Mazda USA).",
          ),
          feat(
            '17" wheels',
            "Standard 17-inch wheels on the entry 2.5 S.",
          ),
          feat(
            "Mazda Connect with Google built-in and Gemini AI assistant",
            "Large touchscreen Mazda Connect with Google built-in, navigation, and voice assistant (Mazda Connected Services trial applies).",
          ),
          feat(
            '12.9" touchscreen with wired Apple CarPlay® and Android Auto™',
            "Widescreen center display with wired phone projection plus Google built-in features.",
          ),
          feat(
            "Eight-speaker audio with HD Radio™",
            "Eight-speaker sound system with HD Radio™ capability.",
          ),
          feat(
            "Dual USB-C ports and dual 12V outlets",
            "Two USB-C charging ports and two 12-volt power outlets.",
          ),
          feat(
            "Eight-way manual driver’s seat and six-way manual passenger seat",
            "Manual seat adjustment for driver and front passenger.",
          ),
          feat(
            "Rear bench with center armrest, recline, and 40/20/40 split with pass-through",
            "Flexible second row for passengers and long cargo.",
          ),
          feat(
            "Dual-zone automatic climate control",
            "Separate left and right front temperature settings.",
          ),
          feat(
            "Leather-wrapped steering wheel and shift knob",
            "Leather wrap on primary controls.",
          ),
          feat(
            '10.25" digital driver display',
            "Large digital instrumentation including tachometer-style readout.",
          ),
          feat(
            "Overhead console with sunglass holder",
            "Storage in the overhead console for sunglasses.",
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
            "Tinted privacy glass",
            "Darkened rear glass for sun glare and modest cargo concealment.",
          ),
          feat(
            "Auto-folding heated door mirrors",
            "Side mirrors fold and heat for parking and cold weather.",
          ),
          feat(
            "Leatherette seats with cloth center insert",
            "Leather-like bolsters with breathable cloth centers.",
          ),
          feat(
            "Frameless auto-dimming rearview mirror",
            "Slim-frame mirror that dims for glare from headlights behind you.",
          ),
          feat(
            "Sun visors with illuminated vanity mirrors",
            "Lit mirrors in both front visors.",
          ),
          feat(
            "Rear-seat air vents",
            "Climate airflow to the second row.",
          ),
          feat(
            "Wireless phone charging",
            "Qi-compatible charging pad for supported phones.",
          ),
          feat(
            "Keyless entry",
            "Keyless access to lock and unlock the vehicle.",
          ),
          feat(
            "Wireless Apple CarPlay® and Android Auto™",
            "Cable-free phone projection on supported devices.",
          ),
        ],
      },
      {
        id: "25-s-preferred",
        name: "2.5 S Preferred",
        startingMsrp: "$34,250",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            '19" alloy wheels',
            "Larger 19-inch alloy wheels versus 17-inch on lower trims.",
          ),
          feat(
            "Roof rails",
            "Factory rails for approved roof accessories.",
          ),
          feat(
            "Power liftgate",
            "Powered rear hatch for easier cargo loading.",
          ),
          feat(
            "Memory settings for door mirrors",
            "Mirrors recall stored positions for different drivers.",
          ),
          feat(
            "Windshield wiper de-icer",
            "Heated area at the wiper park position for ice and snow.",
          ),
          feat(
            "Full-color Active Driving Display (windshield-projected)",
            "Head-up style color readouts projected onto the windshield.",
          ),
          feat(
            "Heated front seats and heated steering wheel",
            "Warmth for front occupants and the steering wheel.",
          ),
          feat(
            "10-way power driver’s seat with memory",
            "Power driver seat adjustments including memory presets.",
          ),
          feat(
            "HomeLink® integrated in rearview mirror",
            "Programmable buttons for compatible garage doors and gates.",
          ),
        ],
        popular: true,
      },
      {
        id: "25-s-premium",
        name: "2.5 S Premium",
        startingMsrp: "$36,900",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Black contrasting exterior trim",
            "Black metallic finish on bumper trim, wheel-arch moldings, and side garnishes.",
          ),
          feat(
            '19" Black Metallic alloy wheels',
            "Black metallic 19-inch wheels.",
          ),
          feat(
            "Signature Illumination LED headlights and taillights",
            "Mazda signature LED daytime running light treatment front and rear.",
          ),
          feat(
            "Large panoramic sunroof",
            "Wide glass sunroof for cabin brightness and ventilation.",
          ),
          feat(
            "Leather seating with ventilated front seats",
            "Leather upholstery with fan-cooled front seats.",
          ),
          feat(
            "Six-way power front passenger seat",
            "Power adjustments for the front passenger.",
          ),
          feat(
            "Heated rear seats",
            "Second-row seat heat for rear passengers.",
          ),
          feat(
            "Color-selectable interior ambient lighting",
            "Ambient lighting adjustable via the infotainment system.",
          ),
          feat(
            "Bose® 12-speaker premium audio with SiriusXM®",
            "Bose® twelve-speaker system with satellite radio capability.",
          ),
          feat(
            "Two additional rear USB-C ports",
            "Extra USB-C charging for second-row passengers.",
          ),
        ],
      },
      {
        id: "25-s-premium-plus",
        name: "2.5 S Premium Plus",
        startingMsrp: "$38,990",
        trimSafetyAdditions: [
          SAF_AFS,
          SAF_FCTA_FCTB,
          SAF_DRIVER_MONITORING,
          SAF_360_CX5_EXPANDED,
          SAF_CTS_LANE_CHANGE_ASSIST,
        ],
        addedFeatures: [
          feat(
            "Hands-free power rear liftgate",
            "Open the liftgate with a hands-free gesture where equipped.",
          ),
          feat(
            '15.6" center touchscreen (replaces 12.9")',
            "Largest infotainment screen in the lineup for maps and controls.",
          ),
          feat(
            "Steering-wheel paddle shifters",
            "Manual gear control without removing hands far from the wheel.",
          ),
          feat(
            "Driver Personalization System",
            "Automatically adjusts mirrors and seating toward optimal positions for visibility and control (Mazda USA).",
          ),
        ],
      },
    ],
  },
  "cx-70": {
    sharedSafetyFeatures: SHARED_SAFETY_CX70,
    trims: [
      {
        id: "33-turbo-preferred",
        name: "3.3 Turbo Preferred",
        startingMsrp: "$42,250",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "e-Skyactiv®-G 3.3L inline-6 turbo with M Hybrid Boost (280 hp / 332 lb-ft)",
            "48V mild hybrid; EPA-estimated 24 city / 28 highway / 25 combined MPG on regular fuel.",
          ),
          feat(
            "Eight-speed automatic, standard i-Activ AWD®, Kinematic Posture Control, Mi-Drive (Sport & Off-Road)",
            "Eight-speed transmission with standard AWD, KPC, and selectable drive modes.",
          ),
          feat(
            "Gloss black Mazda emblems and black rear liftgate badging (2026)",
            "Black-out branding across the 2026 CX-70 lineup.",
          ),
          feat(
            '21" black metallic finish aluminum-alloy wheels',
            "Large black-finish 21-inch wheels.",
          ),
          feat(
            "Black honeycomb grille, rear roof spoiler, roof rails, and exterior garnishes",
            "Sporty black-out exterior trim and functional roof rails.",
          ),
          feat(
            "Power heated side mirrors with LED turn signals and Inline 6 fender badge",
            "Heated power mirrors with signals and six-cylinder badging.",
          ),
          feat(
            "Power sunroof, LED headlights with auto-leveling, LED DRLs and taillights, High Beam Control, rain-sensing wipers",
            "Sunroof, full LED lighting, automatic high beams, and rain-sensing wipers.",
          ),
          feat(
            "Leather-trimmed heated and ventilated front seats; heated rear seats; heated steering wheel",
            "Black or greige leather; climate comfort for both rows and the wheel.",
          ),
          feat(
            "Eight-way power driver’s seat with power lumbar and two-position memory; eight-way power passenger seat",
            "Power adjustments for both front seats with driver memory (Mazda USA 3.3 Turbo Preferred).",
          ),
          feat(
            "Leather-wrapped steering wheel and shift knob, paddle shifters, interior LED lighting",
            "Leather controls, paddle shifters, and ambient interior LEDs.",
          ),
          feat(
            "Retractable rear sunshades",
            "Second-row window shades for sun glare.",
          ),
          feat(
            "Power liftgate, remote-folding rear seats, optimized cargo, sub-trunk storage",
            "Hands-free-friendly cargo access, remote seat release, and hidden underfloor stowage.",
          ),
          feat(
            "Alexa Built-in, 12.3\" Mazda Connect with touch (CarPlay® / Android Auto™), wireless CP/AA",
            "Voice assistant; widescreen infotainment with wireless or touch phone projection.",
          ),
          feat(
            '7" TFT instrument panel, eight-speaker audio, wireless charging, front/rear USB-C',
            "Digital cluster, eight speakers, Qi pad, and multiple USB-C ports.",
          ),
          feat(
            "Mazda Advanced Keyless Entry, push-button start, automatic climate control",
            "Keyless access, start, and single-zone automatic climate (Mazda USA).",
          ),
        ],
        popular: true,
      },
      {
        id: "33-turbo-premium",
        name: "3.3 Turbo Premium",
        startingMsrp: "$46,280",
        trimSafetyAdditions: [
          SAF_CRUISING_TRAFFIC_SUPPORT,
          SAF_EMERGENCY_LANE_KEEPING,
          SAF_SECONDARY_COLLISION_REDUCTION,
          SAF_TSR,
          SAF_SPEED_LIMIT_ASSIST,
        ],
        addedFeatures: [
          feat(
            "Mi-Drive Towing mode — up to 5,000 lb when equipped with Mazda Genuine Towing Accessories",
            "Towing mode raises max trailer rating to 5,000 pounds when properly equipped.",
          ),
          feat(
            "Hands-free power liftgate, power-folding auto-dimming mirrors, shark fin antenna",
            "Hands-free hatch, folding dimming mirrors, and fin antenna.",
          ),
          feat(
            "Blacked-out door handles and pillar garnishes; silver front bumper valence accent",
            "Deeper black-out profile with contrasting silver lower front trim.",
          ),
          feat(
            '12.3" fully digital driver display and Active Driving Display (windshield-projected)',
            "Full digital cluster plus head-up style windshield display.",
          ),
          feat(
            "Bose® 12-speaker premium audio, frameless auto-dimming mirror with HomeLink®",
            "Bose® sound; frameless mirror with HomeLink®.",
          ),
          feat(
            "Mazda Online Navigation, SiriusXM® three-month trial, upgraded interior lighting",
            "Connected navigation, satellite radio trial, and enhanced cabin lighting.",
          ),
        ],
      },
      {
        id: "33-turbo-premium-plus",
        name: "3.3 Turbo Premium Plus",
        startingMsrp: "$49,570",
        trimSafetyAdditions: [
          SAF_AFS,
          SAF_360_SEE_THROUGH_TRAILER_HITCH,
          SAF_FRONT_CROSS_TRAFFIC_ALERT,
          SAF_REAR_SMART_BRAKE_SUPPORT,
          SAF_SBS_TURN_ACROSS_FRONT_CROSSING,
          SAF_RVM_DYNAMIC_GUIDELINES,
        ],
        addedFeatures: [
          feat(
            "Nappa leather (black or red), power panoramic sunroof, windshield wiper de-icer",
            "Nappa upholstery, panoramic roof, and wiper de-icer.",
          ),
          feat(
            "150-watt AC-style power outlet (cargo area)",
            "In-cargo power for small appliances or accessories.",
          ),
        ],
      },
      {
        id: "33-turbo-s-premium",
        name: "3.3 Turbo S Premium",
        startingMsrp: "$53,240",
        trimSafetyAdditions: [SAF_DRIVER_MONITORING],
        addedFeatures: [
          feat(
            "e-Skyactiv®-G 3.3L turbo (up to 340 hp / 369 lb-ft on premium fuel)",
            "High-output inline-6; EPA-estimated 23 city / 28 highway / 25 combined on premium.",
          ),
          feat(
            "Towing mode — up to 5,000 lb with Mazda Genuine Towing Accessories",
            "Same 5,000-pound rating when properly equipped as 3.3 Turbo.",
          ),
          feat(
            '21" black metallic wheels with machine-cut finish',
            "Machine-cut detail on black 21-inch wheels.",
          ),
          feat(
            "Power tilt/telescopic steering column with memory and Driver Personalization System",
            "Power steering column with memory; mirrors/seat personalization like CX-90 flagship tech.",
          ),
          feat(
            "All features of 3.3 Turbo Premium Plus content plus Turbo S upgrades",
            "Builds on Premium Plus equipment with Turbo S power and column/personalization.",
          ),
          feat(
            "Nappa leather, heated/ventilated fronts, heated rears, sunshades, panoramic roof, black exterior trim",
            "Flagship seating comfort, sunshades, roof, and black-out exterior.",
          ),
          feat(
            "12.3\" Mazda Connect (touch with CP/AA), wireless CP/AA, 12.3\" digital cluster, Alexa Built-in",
            "Full connectivity suite with wireless projection where equipped.",
          ),
          feat(
            "360° See-Through and Trailer Hitch View, wireless charging, USB-C, ADD, Mazda Online Navigation",
            "Surround-view towing assist, charging, ports, head-up style display, OTA-capable nav.",
          ),
          feat(
            "Bose® 12-speaker audio, front and rear parking sensors",
            "Premium audio and parking sensors.",
          ),
        ],
      },
      {
        id: "33-turbo-s-premium-plus",
        name: "3.3 Turbo S Premium Plus",
        startingMsrp: "$56,670",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Quilted Tan Nappa leather, two-tone leather-wrapped steering wheel",
            "Tan quilted Nappa with coordinated two-tone steering wheel.",
          ),
          feat(
            "Suede-like dash inserts with stitching and piping",
            "Contrasting suede-style dash trim with fine detailing.",
          ),
        ],
      },
      {
        id: "phev-sc",
        name: "PHEV SC",
        startingMsrp: "$44,250",
        hidePreviousTrimComparison: true,
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Plug-in hybrid line (parallel to 3.3 turbo grades)",
            "Compare packages on Mazda Build & Price; equipment differs from the gasoline trim ladder above.",
          ),
          feat(
            "e-Skyactiv® PHEV (323 hp / 369 lb-ft on recommended premium fuel)",
            "Plug-in hybrid with Charge Mode and EV mode added to Mi-Drive.",
          ),
          feat(
            "EPA-estimated ~30 miles EV range; eight-speed automatic and standard i-Activ AWD®",
            "Electric-focused daily miles plus gas range; eight-speed and AWD standard.",
          ),
          feat(
            "Black badges, honeycomb grille, rear spoiler, roof rails; PHEV fender badge and black SC liftgate badge",
            "PHEV-specific black exterior theme and badging.",
          ),
          feat(
            '19" gray metallic aluminum-alloy wheels',
            "19-inch gray metallic wheels (versus 21-inch on 3.3 Turbo Preferred).",
          ),
          feat(
            "Power liftgate, heated power mirrors with LED signals, LED lighting, High Beam Control, rain-sensing wipers",
            "Liftgate, mirrors, and lighting as on the turbo black-out theme.",
          ),
          feat(
            "Leatherette seats, leather-wrapped wheel and shift knob, eight-way power driver with lumbar, interior LED lighting",
            "Leatherette upholstery with leather-wrapped primary controls.",
          ),
          feat(
            "Same cargo optimizations and sub-trunk design as CX-70 turbo models",
            "Remote-fold rear seats, compartments, hooks, and hidden storage.",
          ),
          feat(
            "12.3\" Mazda Connect with touch when using CP/AA, wired Apple CarPlay® and Android Auto™",
            "Widescreen infotainment; wired phone projection on PHEV SC.",
          ),
          feat(
            "12.3\" fully digital driver display, eight-speaker audio, USB-C front and rear, Alexa Built-in",
            "Full digital cluster, eight speakers, connectivity, and Alexa.",
          ),
          feat(
            "Mazda Advanced Keyless Entry, push-button start, automatic climate control",
            "Keyless entry, start, and automatic climate.",
          ),
        ],
      },
      {
        id: "phev-sc-plus",
        name: "PHEV SC Plus",
        startingMsrp: "$47,250",
        trimSafetyAdditions: [SAF_SECONDARY_COLLISION_REDUCTION],
        addedFeatures: [
          feat(
            "Builds on PHEV SC with leather seating and eight-way power passenger seat",
            "Genuine leather and power front passenger seat.",
          ),
          feat(
            "Two-position driver seat memory, heated and ventilated front seats, heated rear seats, heated steering wheel",
            "Memory driver seat; heated/ventilated fronts; heated second row and wheel.",
          ),
          feat(
            "Active Driving Display and retractable rear sunshades",
            "Windshield-projected display and rear sunshades.",
          ),
          feat(
            "Front and rear parking sensors",
            "Audible distance sensors at both bumpers.",
          ),
        ],
      },
    ],
  },
  "cx-90": {
    sharedSafetyFeatures: SHARED_SAFETY_CX90,
    trims: [
      {
        id: "33-turbo-select",
        name: "3.3 Turbo Select",
        startingMsrp: "$38,800",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "e-Skyactiv® G 3.3 Turbo inline-six — 280 hp / 332 lb-ft (regular 87-octane); M-Hybrid Boost 48V; 8-speed automatic; i-Activ AWD®",
            "Mild-hybrid inline-six with standard all-wheel drive; EPA-estimated 23 city / 28 highway / 25 combined.",
          ),
          feat(
            "Eight-passenger seating (second- and third-row bench)",
            "Three rows of bench seating for up to eight occupants.",
          ),
          feat(
            "Black leatherette; leather-wrapped shift knob and steering wheel with paddle shifters; 7\" TFT LCD cluster; eight-way power driver seat with lumbar",
            "Comfort-focused cabin with digital cluster and power driver seat.",
          ),
          feat(
            "10.25\" center display, Mazda Connect™, Apple CarPlay™ and Android Auto™, eight-speaker audio, Mazda Advanced Keyless Entry, push-button start",
            "Infotainment and connectivity with keyless entry and start.",
          ),
          feat(
            "Front and second-row dual USB-C, rear power windows, three-zone automatic climate control with third-row vents",
            "Charging and climate for all three rows.",
          ),
          feat(
            "19\" silver metallic alloy wheels, power liftgate, roof rails, LED headlights (auto on/off, auto-leveling), LED DRLs and taillights, High Beam Control, heated power mirrors with LED turn signals, rain-sensing wipers",
            "Exterior lighting, convenience, and alloy wheels.",
          ),
          feat(
            "Black garnishes, black \"Inline 6\" fender badging, black honeycomb grille",
            "Base Turbo exterior accents.",
          ),
        ],
      },
      {
        id: "33-turbo-preferred",
        name: "3.3 Turbo Preferred",
        startingMsrp: "$42,950",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "21\" silver metallic wheels; piano black garnishes and front grille mesh",
            "Larger wheels and blacked-out trim accents.",
          ),
          feat(
            "Ventilated front seats; heated second-row seats; heated steering wheel; eight-way power driver seat with power lumbar and memory; eight-way power passenger seat",
            "Comfort upgrades for front and second rows with memory driver seat.",
          ),
          feat(
            "12.3\" center display with wireless Apple CarPlay™ and Android Auto™ (touch capable), wireless phone charging",
            "Larger widescreen with wireless projection and Qi charging.",
          ),
          feat(
            "Power sunroof; black or greige leather seats; heated front seats; second-row retractable window shades; third-row dual USB-C (six USB-C total)",
            "Sunroof, leather upholstery, shades, and USB-C in every row.",
          ),
          feat(
            "Front and rear parking sensors",
            "Distance sensors for easier maneuvering in tight spaces.",
          ),
        ],
        popular: true,
      },
      {
        id: "33-turbo-premium-sport",
        name: "3.3 Turbo Premium Sport",
        startingMsrp: "$46,980",
        trimSafetyAdditions: [
          SAF_EMERGENCY_LANE_KEEPING,
          SAF_BLIND_SPOT_ASSIST,
          SAF_ROAD_KEEP_AND_HEAD_ON,
          SAF_SECONDARY_COLLISION_REDUCTION,
          SAF_CRUISING_TRAFFIC_SUPPORT,
        ],
        addedFeatures: [
          feat(
            "Sport blackout exterior — gloss black honeycomb grille, black chrome signature wing and \"Inline 6\" badge, 21\" black metallic wheels, black bumpers and door garnish, piano black mirrors and roof rails; blacked-out Mazda logos; automatic power-folding auto-dimming mirrors",
            "Premium Sport visual package with dark trim and folding mirrors.",
          ),
          feat(
            "Eight-passenger bench or available seven-passenger second-row captain’s chairs with center walk-through",
            "Flexible seating layouts.",
          ),
          feat(
            "Mi-Drive (Sport, Off-Road, Towing); up to 5,000 lb towing with Mazda Genuine Towing Accessories (up from 3,500 lb)",
            "Drive modes including towing; higher max trailer rating when properly equipped.",
          ),
          feat(
            "Mazda Online Navigation with over-the-air updates; larger panoramic moonroof; hands-free power liftgate; Bose® 12-speaker audio; 12.3\" fully digital cluster; head-up Active Driving Display; frameless auto-dimming mirror with HomeLink®; enhanced interior LED lighting; SiriusXM® three-month trial",
            "Navigation, panoramic roof, premium audio, digital cluster, HUD, and satellite radio trial.",
          ),
        ],
      },
      {
        id: "33-turbo-premium-plus",
        name: "3.3 Turbo Premium Plus",
        startingMsrp: "$50,270",
        trimSafetyAdditions: [
          SAF_AFS,
          SAF_360_SEE_THROUGH_TRAILER_HITCH,
          SAF_FRONT_CROSS_TRAFFIC_ALERT,
          SAF_REAR_SMART_BRAKE_SUPPORT,
          SAF_SBS_TURN_ACROSS_FRONT_CROSSING,
          SAF_RVM_DYNAMIC_GUIDELINES,
          SAF_SECURITY_SYSTEM,
        ],
        addedFeatures: [
          feat(
            "Seven- or eight-passenger seating — bench or second-row captain’s chairs",
            "Choice of captain’s chairs or bench for the second row.",
          ),
          feat(
            "Signature headlight and taillight elements; Adaptive Front-Lighting System (AFS)",
            "Premium lighting with cornering-adaptive headlamps.",
          ),
          feat(
            "Black or white Nappa leather seats; heated steering wheel; foot lamp illumination; 150-watt accessory power outlet (cargo area)",
            "Nappa upholstery, ambient foot lighting, and in-cargo power.",
          ),
        ],
      },
      {
        id: "33-turbo-s-premium-sport",
        name: "3.3 Turbo S Premium Sport",
        startingMsrp: "$53,940",
        trimSafetyAdditions: [
          SAF_EMERGENCY_LANE_KEEPING,
          SAF_BLIND_SPOT_ASSIST,
          SAF_ROAD_KEEP_AND_HEAD_ON,
          SAF_SECONDARY_COLLISION_REDUCTION,
          SAF_CRUISING_TRAFFIC_SUPPORT,
          SAF_DRIVER_MONITORING,
        ],
        addedFeatures: [
          feat(
            "e-Skyactiv® G 3.3 Turbo S — up to 340 hp / 369 lb-ft (premium fuel) or 319 hp on regular; EPA-estimated 23 / 28 / 25",
            "High-output inline-six tuned for flagship performance.",
          ),
          feat(
            "Mi-Drive (Sport, Off-Road, Towing); up to 5,000 lb towing with Mazda Genuine Towing Accessories",
            "Same max towing as other Turbo models when properly equipped.",
          ),
          feat(
            "Turbo S blackout exterior — piano black mesh grille, black chrome signature wing and \"Inline 6\" badging, black 21\" wheels, black lower bumper valence, black moldings and door trims, piano black mirrors and roof rails, blacked-out Mazda logo",
            "Exclusive dark-chrome Turbo S styling.",
          ),
          feat(
            "Driver Personalization System; 12.3\" center display (wireless Apple CarPlay™ / Android Auto™, touch); Mazda Online Navigation with OTA updates; Bose® 12-speaker audio; power liftgate; panoramic moonroof; SiriusXM® trial; 12.3\" digital cluster; six USB-C (two per row); wireless charging; HUD; frameless mirror with HomeLink®",
            "Flagship tech stack with personalization and premium audio.",
          ),
          feat(
            "Heated leather-wrapped steering wheel with power tilt/telescope and memory; black or white Nappa leather; heated and ventilated front seats; heated second-row seats; eight-way power front seats; three-zone climate with third-row vents",
            "Nappa seating, climate, and steering wheel adjustability.",
          ),
          feat(
            "Front and rear parking sensors",
            "Audible distance sensors at both bumpers.",
          ),
        ],
      },
      {
        id: "33-turbo-s-premium-plus",
        name: "3.3 Turbo S Premium Plus",
        startingMsrp: "$57,370",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Seven-passenger layout — second-row captain’s chairs with center console; three-seat third row",
            "Premium two-row captain configuration with rear console.",
          ),
          feat(
            "Nappa leather in black or white Japanese Premium options; second-row ventilated seats; front and rear interior foot lighting; two-tone leather-wrapped steering wheel; 150-watt accessory power outlet",
            "Flagship interior with ventilated second row and foot lighting.",
          ),
        ],
      },
      {
        id: "phev-preferred",
        name: "PHEV Preferred",
        startingMsrp: "$50,495",
        hidePreviousTrimComparison: true,
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "e-Skyactiv® PHEV — 2.5L four with electric motor and 17.8 kWh battery; 323 hp / 369 lb-ft (premium fuel); up to ~26 mi electric range; up to 3,500 lb towing with Mazda Genuine Towing Accessories",
            "Plug-in hybrid with EV-capable operation and moderate towing when equipped.",
          ),
          feat(
            "Mi-Drive (Sport, Off-Road, EV drive modes)",
            "Includes EV mode for electric-first driving when conditions allow.",
          ),
          feat(
            "21\" wheels; ventilated front seats; heated first- and second-row seats; eight-way power driver with lumbar and two-position memory; eight-way power passenger; heated steering wheel",
            "2026 PHEV standard comfort and seating adjustments.",
          ),
          feat(
            "12.3\" center display; wireless charging; wireless Apple CarPlay™ and Android Auto™ (touch); front and rear parking sensors",
            "Widescreen infotainment with wireless connectivity and parking sensors.",
          ),
          feat(
            "Seven-passenger seating — second-row bench; 50/50-split third row",
            "Three-row layout with split-fold third row.",
          ),
          feat(
            "Sunroof; heated side mirrors; power liftgate; 12.3\" fully digital instrument panel; six USB-C (two per row); three-zone automatic climate with third-row vents",
            "Sunroof, digital cluster, USB-C throughout, and tri-zone climate.",
          ),
          feat(
            "Anti-theft immobilizer (i-Activsense® suite as equipped for PHEV)",
            "Immobilizer plus Mazda’s driver-assist packaging for this powertrain.",
          ),
        ],
      },
      {
        id: "phev-premium-sport",
        name: "PHEV Premium Sport",
        startingMsrp: "$55,300",
        trimSafetyAdditions: [
          SAF_EMERGENCY_LANE_KEEPING,
          SAF_BLIND_SPOT_ASSIST,
          SAF_ROAD_KEEP_AND_HEAD_ON,
          SAF_SECONDARY_COLLISION_REDUCTION,
          SAF_CRUISING_TRAFFIC_SUPPORT,
          SAF_TSR,
        ],
        addedFeatures: [
          feat(
            "PHEV Sport blackout — gloss black honeycomb grille, black chrome signature wing, \"PHEV\" fender badge, 21\" black metallic wheels, black bumpers and door garnish, piano black mirrors and roof rails; blacked-out Mazda logo; automatic power-folding auto-dimming mirrors",
            "Blackout exterior aligned with gas Premium Sport models.",
          ),
          feat(
            "Seven-passenger — bench second row or available captain’s chairs; third-row configuration per Mazda packaging",
            "Flexible second-row seating options.",
          ),
          feat(
            "Head-up Active Driving Display; Mazda Navigation with Off-Road functionality; frameless auto-dimming mirror with HomeLink®; enhanced interior LED lighting; Bose® 12-speaker audio; SiriusXM® three-month trial; 1,500-watt charging outlet (rear cargo)",
            "Navigation, HUD, Bose®, and high-output cargo-area power.",
          ),
        ],
      },
      {
        id: "phev-premium-plus",
        name: "PHEV Premium Plus",
        startingMsrp: "$58,500",
        trimSafetyAdditions: [
          SAF_SBS_TURN_ACROSS_FRONT_CROSSING,
          SAF_REAR_SMART_BRAKE_SUPPORT,
          SAF_FRONT_CROSS_TRAFFIC_ALERT,
          SAF_RVM_DYNAMIC_GUIDELINES,
          SAF_360_SEE_THROUGH_TRAILER_HITCH,
          SAF_DRIVER_MONITORING,
          SAF_AFS,
        ],
        addedFeatures: [
          feat(
            "21\" machine-cut alloy wheels; windshield wiper de-icer; bright \"PHEV\" fender badge; Signature headlights and taillights (shared with Turbo S–style lighting); Adaptive Front-Lighting System; heated side mirrors with memory (tilt down in reverse)",
            "Premium wheels, de-icer, and upgraded lighting and mirror memory.",
          ),
          feat(
            "Driver Personalization System — power tilt/telescope steering wheel with memory coordinated with seat and mirrors; Nappa leather (black or white); 150-watt accessory power outlet",
            "Saved driver profiles with steering wheel, seat, and mirror positioning.",
          ),
          feat(
            "Smart Brake Support–Rear with pedestrian detection; Smart Brake Support with Turn-Across Traffic (per Mazda USA)",
            "Additional braking support for rear and turning scenarios.",
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
            "Skyactiv-G 2.0L — 181 hp @ 7,000 rpm, 151 lb-ft @ 4,000 rpm; 7,500 rpm redline; standard six-speed manual",
            "Naturally aspirated four-cylinder and manual gearbox at the core of the MX-5 driving experience (Mazda USA).",
          ),
          feat(
            "Black cloth soft top; 8.8\" Mazda Connect display (touch with Apple CarPlay® / Android Auto™); Alexa Built-in",
            "Lightweight soft top and infotainment with voice integration.",
          ),
          feat(
            "Leather-wrapped tilt/telescoping steering wheel, leather shift knob and parking brake; cloth bucket seats; six-speaker audio (AM/FM, HD Radio™); dual USB-C; Mazda Advanced Keyless Entry; climate control; removable cup holders; lockable center-rear console",
            "Leather touchpoints and everyday cabin convenience.",
          ),
          feat(
            "Metallic black 16\" alloy wheels; dual-tip exhaust; LED headlights, taillights, and DRLs; gloss black door mirrors and high-mount brake light cover; variable-intermittent wipers; rear glass with defogger",
            "Sport exterior lighting and wheels.",
          ),
        ],
      },
      {
        id: "club",
        name: "Club",
        startingMsrp: "$33,930",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Sport-tuned suspension — Bilstein® dampers, front shock tower brace, induction sound enhancer, asymmetric conical clutch-type limited-slip differential",
            "Sharper dynamics and mechanical limited-slip traction (Mazda USA).",
          ),
          feat(
            "DSC-Track mode (Dynamic Stability Control)",
            "Adjusts DSC intervention between full engagement and fully off for track-oriented driving.",
          ),
          feat(
            "Gloss black front air dam and rear lip spoiler; black metallic 17\" wheels; trunk lid shark fin antenna; body-color high-mount brake light cover",
            "Club exterior and wheel treatment.",
          ),
          feat(
            "Vinyl-leather interior; heated cloth seats with suede inserts; piano black seat back bar trim; wireless Apple CarPlay® and Android Auto™; SiriusXM® three-month trial; Bose® nine-speaker premium audio with subwoofer and driver/passenger headrest speakers",
            "Heated seats, wireless phone projection, satellite radio trial, and Bose® with headrest speakers.",
          ),
          feat(
            "Available Brembo® / BBS® / Recaro® package — Brembo® brakes with red calipers, 17\" BBS® forged wheels, heated Recaro® sport seats, aero kit with gloss black side sills and rear bumper skirt, black Alcantara® trim with contrast stitching (soft-top Club; +$5,050 MSRP when equipped)",
            "Factory performance package content and pricing per Mazda USA.",
          ),
        ],
        popular: true,
      },
      {
        id: "grand-touring",
        name: "Grand Touring (6MT)",
        startingMsrp: "$35,730",
        trimSafetyAdditions: [SAF_AFS, SAF_HIGH_BEAM_CONTROL, SAF_TSR],
        addedFeatures: [
          feat(
            "Same performance hardware as Club — Bilstein® dampers, front shock tower brace, induction sound enhancer, DSC-Track mode, asymmetric limited-slip differential; six-speed manual",
            "Grand Touring manual includes Club-level chassis and driveline hardware (Mazda USA).",
          ),
          feat(
            "Black soft top; black and machine-finished aluminum alloy wheels; body-color heated door mirrors with auto-dimming driver mirror; door sill trim plates; rain-sensing wipers; auto on/off headlights",
            "Grand Touring exterior and mirror upgrades vs. Club gloss-black accents.",
          ),
          feat(
            "Automatic air conditioning; frameless auto-dimming rearview mirror with HomeLink®; heated leather-trimmed seats; Mazda Navigation System",
            "Climate control, HomeLink®, leather heat, and built-in navigation.",
          ),
        ],
      },
      {
        id: "grand-touring-at",
        name: "Grand Touring (6AT)",
        startingMsrp: "$36,650",
        trimSafetyAdditions: [
          SAF_AFS,
          SAF_HIGH_BEAM_CONTROL,
          SAF_TSR,
          SAF_MRCC_DISTANCE_SPEED_ALERT,
        ],
        addedFeatures: [
          feat(
            "Six-speed automatic transmission with steering wheel-mounted paddle shifters",
            "Automatic option with manual control via paddles (Mazda USA).",
          ),
          feat(
            "Grand Touring comfort and design — black and machine-finished alloy wheels; body-color heated door mirrors with auto-dimming driver mirror; door sill trim plates; rain-sensing wipers; auto on/off headlights; automatic air conditioning; frameless auto-dimming mirror with HomeLink®; heated leather-trimmed seats; Mazda Navigation System",
            "Same luxury-oriented content as Grand Touring manual without the Club performance hardware (no Bilstein® / LSD package on automatic per Mazda USA).",
          ),
        ],
      },
    ],
  },
  "mx-5-miata-rf": {
    sharedSafetyFeatures: SHARED_SAFETY_MX5,
    trims: [
      {
        id: "grand-touring",
        name: "Grand Touring (6MT)",
        startingMsrp: "$38,450",
        trimSafetyAdditions: [SAF_AFS, SAF_HIGH_BEAM_CONTROL, SAF_TSR],
        addedFeatures: [
          feat(
            "Power retractable fastback roof — opens or closes in about 13 seconds at the touch of a button",
            "RF coupe-like security when closed and open-air convertible character when stowed (Mazda USA).",
          ),
          feat(
            "Skyactiv-G 2.0L — 181 hp @ 7,000 rpm, 151 lb-ft @ 4,000 rpm; six-speed manual; same performance hardware as Club — Bilstein® dampers, front shock tower brace, induction sound enhancer, DSC-Track mode, asymmetric limited-slip differential",
            "Grand Touring manual includes Club-level chassis and driveline; body-color RF (Mazda USA).",
          ),
          feat(
            "Body-color RF; black and machine-finished aluminum alloy wheels; body-color heated door mirrors with auto-dimming driver mirror; door sill trim plates; rain-sensing wipers; auto on/off headlights",
            "Grand Touring exterior vs. Club gloss-black accents.",
          ),
          feat(
            "8.8\" Mazda Connect (touch with Apple CarPlay® / Android Auto™); Alexa Built-in; automatic air conditioning; frameless auto-dimming rearview mirror with HomeLink®; heated leather-trimmed seats; Mazda Navigation System",
            "GT comfort, connectivity, and navigation.",
          ),
        ],
      },
      {
        id: "grand-touring-at",
        name: "Grand Touring (6AT)",
        startingMsrp: "$39,420",
        trimSafetyAdditions: [
          SAF_AFS,
          SAF_HIGH_BEAM_CONTROL,
          SAF_TSR,
          SAF_MRCC_DISTANCE_SPEED_ALERT,
        ],
        addedFeatures: [
          feat(
            "Power retractable fastback roof — ~13 seconds to open or close",
            "RF styling with quick power roof operation.",
          ),
          feat(
            "Six-speed automatic transmission with steering wheel-mounted paddle shifters",
            "Automatic Grand Touring with manual control via paddles (Mazda USA).",
          ),
          feat(
            "Body-color RF; black and machine-finished alloy wheels; body-color heated mirrors with auto-dimming driver mirror; door sill plates; rain-sensing wipers; auto on/off headlights; automatic climate; frameless auto-dimming mirror with HomeLink®; heated leather-trimmed seats; Mazda Navigation System; 8.8\" display, Alexa Built-in",
            "Grand Touring luxury content without the manual-only Club performance hardware (no Bilstein® / LSD package on automatic per Mazda USA).",
          ),
        ],
      },
      {
        id: "club",
        name: "Club",
        startingMsrp: "$41,900",
        hidePreviousTrimComparison: true,
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "Power retractable fastback roof — ~13 seconds open or close; Skyactiv-G 2.0L with six-speed manual",
            "RF delivers both sporty coupe and convertible character (Mazda USA).",
          ),
          feat(
            "Standard Brembo® / BBS® / Recaro® package — Brembo® brakes with red front and rear calipers, 17\" dark gunmetal BBS® forged wheels, heated Recaro® sport seats; aero kit with gloss black side sill extensions and rear bumper skirt; black Alcantara® trim with light gray contrast stitching and black interior accents (included on RF Club; optional on soft-top Club)",
            "Track-oriented package is standard equipment on MX-5 Miata RF Club.",
          ),
          feat(
            "Sport-tuned suspension — Bilstein® dampers, front shock tower brace, induction sound enhancer, asymmetric conical clutch-type limited-slip differential; DSC-Track mode",
            "Same dynamic hardware as soft-top Club.",
          ),
          feat(
            "Gloss black front air dam and rear lip spoiler; trunk lid shark fin antenna; body-color high-mount brake light cover; vinyl-leather interior; heated cloth seats with suede inserts; piano black seat back bar trim",
            "Club exterior and seating; RF Club includes 17\" BBS® forged wheels via the standard Brembo® / BBS® / Recaro® package.",
          ),
          feat(
            "Wireless Apple CarPlay® and Android Auto™; SiriusXM® three-month trial; Bose® nine-speaker premium audio with subwoofer and driver/passenger headrest speakers; 8.8\" display, Alexa Built-in",
            "Wireless projection, satellite radio trial, and Bose® with headrest speakers.",
          ),
        ],
        popular: true,
      },
    ],
  },
  "cx-50-hybrid": {
    sharedSafetyFeatures: SHARED_SAFETY_CX50_HYBRID,
    trims: [
      {
        id: "hybrid-preferred",
        name: "Hybrid Preferred",
        startingMsrp: "$34,750",
        trimSafetyAdditions: [],
        addedFeatures: [
          feat(
            "2.5L hybrid — hybrid battery, three electric motors, electronically controlled CVT (eCVT), standard Electric AWD (eAWD); Mi-Drive Power and Trail modes; 219 hp / 163 lb-ft (regular 87-octane); EPA-estimated 38 MPG combined and 551-mile total driving range",
            "Hybrid powertrain and efficiency figures per Mazda USA (actual range and MPG vary).",
          ),
          feat(
            "Similarly equipped to CX-50 2.5 S Preferred — eight-way power driver seat with power lumbar, heated side mirrors, heated front seats, available White Interior Option (where offered)",
            "Preferred-level convenience shared with the gas 2.5 S Preferred (Mazda USA packaging).",
          ),
          feat(
            "Unique 17\" black alloy wheels; 10.25\" center display with wireless Apple CarPlay® and Android Auto™; eight-speaker audio; four USB-C ports; wireless phone charging; Alexa Built-in",
            "Hybrid Preferred infotainment, connectivity, and wheel treatment.",
          ),
          feat(
            "Power rear liftgate, power sliding panoramic sunroof, front and rear parking sensors",
            "Liftgate, panoramic roof, and parking sensors called out for Hybrid Preferred.",
          ),
        ],
        popular: true,
      },
      {
        id: "hybrid-premium",
        name: "Hybrid Premium",
        startingMsrp: "$38,150",
        trimSafetyAdditions: [SAF_TSR],
        addedFeatures: [
          feat(
            "Builds on Hybrid Preferred — black roof rails and black exhaust pipes",
            "Dark roof rails and exhaust finish vs. Preferred.",
          ),
          feat(
            "Leather seating in black or red (red interior exclusive to CX-50 Hybrid)",
            "Leather upholstery; Hybrid-only red interior choice.",
          ),
          feat(
            "Ventilated front seats; Bose® 12-speaker premium audio; SiriusXM® satellite radio with three-month trial",
            "Ventilation, Bose®, and satellite radio trial.",
          ),
          feat(
            "Power six-way passenger seat; two-position driver seat memory; Traffic Sign Recognition (Mazda Radar Cruise Control with Stop & Go is standard on CX-50 Hybrid — see shared safety)",
            "Premium adds TSR plus power passenger seat and driver memory (Mazda USA Hybrid Premium packaging).",
          ),
        ],
      },
      {
        id: "hybrid-premium-plus",
        name: "Hybrid Premium Plus",
        startingMsrp: "$40,150",
        trimSafetyAdditions: [SAF_AFS],
        addedFeatures: [
          feat(
            "Heated rear seats; heated steering wheel",
            "Second-row heat and heated wheel.",
          ),
          feat(
            "Signature LED headlights with auto-leveling, signature LED taillights; Adaptive Front-Lighting System (AFS)",
            "Signature lighting and cornering-adaptive headlamps (AFS in driver-assist additions).",
          ),
          feat(
            "Unique 19\" split black and machine-polished alloy wheels; silver roof rails and silver exhaust pipes",
            "Premium Plus wheels and silver exterior accents.",
          ),
          feat(
            "Automatic power-folding side mirrors with memory",
            "Folding mirrors with stored positions.",
          ),
          feat(
            "Full-color Active Driving Display (windshield-projected)",
            "Windshield-projected head-up style display in full color.",
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
