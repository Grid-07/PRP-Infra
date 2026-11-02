/**
 * The content of the site, taken from the eight printed brochures.
 *
 * Every brochure is an image-only PDF -- there is no text layer to extract, so
 * each fact below was read off a rendered page. Where a brochure says nothing,
 * the field is left out rather than filled with something plausible: the page
 * simply does not render that section. That is why `specifications`,
 * `amenities` and `proximity` are optional.
 *
 * `theme` is sampled from each project's own brochure, so a project page
 * carries the colour of its printed brochure rather than the parent's navy.
 */

export const company = {
  name: 'PRP Infra Project',
  short: 'PRP',
  claim: 'Fifteen years of crafting luxury',
  phone: '+91 79797 21170',
  phoneHref: 'tel:+917979721170',
  email: 'prpinfraprojects@gmail.com',
  website: 'www.prpinfra.com',
  office: [
    'GE, Ambika Enclave, Shiv Bagan,',
    'Maikey Road, Upper Bazaar,',
    'Ranchi, Jharkhand, India — 834001',
  ],
  city: 'Ranchi, Jharkhand',
  about: [
    'PRP Infra Project is committed to excellence and trust. Our projects bear the reputation for quality and fine design — in the years of our existence we have won numerous accolades, a testament to what we deliver.',
    'Across Ranchi we build for the way people actually live: homes with light and cross-ventilation, a lift that works, a guard at the gate, and a specification that holds up after the paint dries.',
  ],
}

/** Listed on the Amar Villa brochure under "Our Previous Projects". */
export const previousProjects = [
  'Bhardwaj Arpan',
  'Rajrappa Arpan',
  'Ambika Enclave',
  'Gomi Laxmi Enclave',
  'Shailmandram Enclave',
  'Arpan Vilash Block A',
  'Arpan Vilash Block B',
]

/** The specification schedule shared by the three Arpan brochures. */
const ARPAN_SPECS = [
  {
    label: 'Structure',
    value:
      'RCC column and pedestal with anti-termite treatment in foundation. RCC columns, beams and slabs.',
  },
  { label: 'Doors', value: 'Flush door of Greenply, or equivalent.' },
  { label: 'Windows', value: '3-track sliding UPVC windows.' },
  {
    label: 'Flooring',
    value: 'Vitrified floor tiles throughout the flat, except the toilets, of Johnson.',
  },
  {
    label: 'Bathroom',
    value:
      'Ceramic floor tiles and dado in ceramic tiles up to roof height. A standard basin is provided in both toilets.',
  },
  {
    label: 'Kitchen',
    value:
      'Granite working platform with ceramic tile dado up to 24 inches, with a hand-made stainless steel sink.',
  },
  {
    label: 'Walls',
    value:
      '10 inch external and 5 inch internal partition brick masonry. Wall putty inside, texture outside.',
  },
  {
    label: 'Sanitary',
    value:
      'CP or brass fittings of standard make, white glazed vitreous sanitary ware, wall-hung commode with concealed cistern and diverter in every bathroom.',
  },
  {
    label: 'Electrical',
    value:
      'Concealed conduit copper wiring with Anchor modular switches and fittings. AC points and low-height power points in every room.',
  },
  { label: 'Water supply', value: 'Deep borewell to overhead tank.' },
]

const ARPAN_FEATURES = [
  'RERA approved project',
  'Project approved by RMC',
  'Construction with high quality materials',
  'Schools and market within walking distance',
  'Covered parking facility',
  'Easy transport to anywhere in the city',
  'Finance facility from banks',
  'Rainwater harvesting system',
]

const ARPAN_HIGHLIGHTS = [
  'One lift',
  'Branded materials and fittings',
  '24x7 security guard',
  'CCTV',
  'Well ventilated rooms',
]

export const projects = [
  {
    slug: 'prp-godavari',
    name: 'PRP Godavari',
    short: 'Godavari',
    tagline: 'The essence of life',
    location: 'Van Vrindavan Colony, Ranchi',
    rera: 'JHARERA / PROJECT / 13 / 2026',
    year: '2026',
    theme: {
      ink: '#0b2340',
      paper: '#eef1f6',
      accent: '#b97d55',
      accentSoft: '#dca078',
    },
    copy: [
      'Godavari is the newest address in the portfolio — a five-storey block of four homes to a floor, planned so that every flat takes its light from two sides.',
      'Each residence is a three-bedroom home with a drawing and dining room, an open kitchen with a wash, three balconies and a puja space. The lifts open into a lobby shared by four families, not forty.',
    ],
    residences: [
      { type: '3 BHK + drawing / dining', area: '1190', built: '1550', note: 'Flat 101 · open kitchen, wash, 3 balconies, puja' },
      { type: '3 BHK + drawing / dining', area: '1245', built: '1620', note: 'Flat 102 · open kitchen, wash, 3 balconies, puja' },
      { type: '3 BHK + drawing / dining', area: '1340', built: '1740', note: 'Flat 103 · open kitchen, wash, 3 balconies' },
      { type: '3 BHK + drawing / dining', area: '1295', built: '1685', note: 'Flat 104 · open kitchen, wash, 3 balconies' },
    ],
    areaLabels: { area: 'BUA sq ft', built: 'SBUA sq ft' },
    plans: [
      { src: 'plan-typical', caption: 'Typical floor — 1st to 4th' },
      { src: 'plan-101', caption: 'Flat 101 — individual plan' },
      { src: 'plan-102', caption: 'Flat 102 — individual plan' },
    ],
  },

  {
    slug: 'amar-villa',
    name: 'Amar Villa',
    short: 'Amar Villa',
    tagline: 'Blooming lifestyle',
    location: 'Dr. Nag Campus, Kanke Road, Ranchi',
    theme: {
      ink: '#0d2b23',
      paper: '#f3ede1',
      accent: '#b5673f',
      accentSoft: '#d99b6c',
    },
    copy: [
      'Amar Villa sits off Kanke Road on the Dr. Nag Campus — five floors of three-bedroom homes arranged three to a landing, each with a drawing room, dining, puja and a run of balconies on two sides.',
      'The specification is written down and priced in, not promised verbally: vitrified flooring, UPVC windows, granite counters, CP fittings of named makes, and a central security control room with CCTV across the common areas.',
    ],
    residences: [
      { type: '3 BHK', area: '1625', note: 'Flat 1 · two bedrooms with attached toilets, drawing 15\'0" x 12\'0"' },
      { type: '3 BHK', area: '1690', note: 'Flat 2 · corner flat, five balconies' },
      { type: '3 BHK', area: '1600', note: 'Flat 3 · drawing 15\'0" x 12\'0", puja 5\'3" x 6\'0"' },
    ],
    areaLabels: { area: 'SBUA sq ft' },
    amenities: [
      'CCTV in floor lobbies and common areas',
      'Access control at the entrance lobby',
      'Central security control room',
      'Granite lift lobby',
      'Rainwater harvesting',
      'Covered parking',
    ],
    specifications: [
      {
        label: 'Dining & drawing',
        value:
          '1200 x 600 mm vitrified tile (Somany / Kajaria or equivalent). Walls in ready-to-paint putty. Pre-laminated flush shutters with SS fittings, Dorma or Godrej.',
      },
      { label: 'Bedrooms', value: 'Laminated wooden floor in the master bedroom, vitrified tile in the others.' },
      {
        label: 'Toilets',
        value:
          'Ceramic tiles to door height, stone or granite counter, single-lever CP fittings, wall-hung commode, health faucet, towel ring and soap dish.',
      },
      { label: 'Kitchen', value: 'Anti-skid ceramic floor, polished granite counter, single-bowl SS sink with hot and cold supply.' },
      { label: 'Balcony', value: 'Anti-skid ceramic tiles and all-weather textured paint.' },
      { label: 'Lift lobby', value: 'Natural stone and granite, with Italian marble on the lift fascia.' },
      { label: 'Corridor', value: 'Granite and vitrified tiles, plastic emulsion to full height.' },
      {
        label: 'Services',
        value:
          'Copper wiring in conduit with modular switches (Havells or equivalent), telephone and DTH points, all-weather external paint.',
      },
      { label: 'Structure', value: 'Earthquake-resistant RCC framed columns and beams.' },
    ],
    proximity: [
      { label: 'Schools & colleges', items: ['International Public School — 1.7 km', 'Cambrian Public School — 3.4 km'] },
      { label: 'Hospitals', items: ['Gandhi Nagar Hospital — 9.3 km', 'Kanke General Hospital — 4.3 km'] },
      {
        label: 'Travel',
        items: ['Birsa Munda Airport — 14.5 km', 'ITI Bus Stand — 8.7 km', 'Ranchi Railway Station — 9.8 km'],
      },
      {
        label: 'Shopping & leisure',
        items: ['Reliance Smart Bazaar — 1.7 km', 'PVR Cinema — 6.6 km', 'Nucleus Mall — 6.6 km'],
      },
      { label: 'Ring road', items: ['Ring Road — 3 km', 'Chandni Chowk — 1.7 km'] },
      { label: 'Everyday', items: ['Temple — 0.5 km', 'Gokul Sweets — 850 m', 'Rock Garden — 2.6 km'] },
    ],
    plans: [
      { src: 'plan-typical', caption: 'Typical floor — three homes to a landing' },
      { src: 'plan-unit-1', caption: 'Flat 1 — 1625 sq ft' },
      { src: 'plan-unit-2', caption: 'Flat 2 — 1690 sq ft' },
      { src: 'plan-unit-3', caption: 'Flat 3 — 1600 sq ft' },
    ],
    gallery: [{ src: 'interior', caption: 'Interior study — the Amar Villa palette' }],
  },

  {
    slug: 'rajrappa-arpan',
    name: 'Rajrappa Arpan',
    short: 'Rajrappa',
    location: 'Ranchi',
    theme: {
      ink: '#3d2418',
      paper: '#f6ece2',
      accent: '#b06a45',
      accentSoft: '#d99b7c',
    },
    copy: [
      'Rajrappa Arpan is a four-home floor plate wrapped around a single core, so every flat is a corner flat — light on two faces, and no home looking straight into another.',
      'The terrace is the part people remember: a community hall of 396 sq ft opening onto a lawn, with a pergola lounge at the edge. It is shared space that is actually worth walking up for.',
    ],
    residences: [
      { type: '3 BHK', area: '1255', built: '1630', note: 'Flat 1' },
      { type: '3 BHK', area: '1450', built: '1885', note: 'Flat 2' },
      { type: '3 BHK', area: '1280', built: '1665', note: 'Flat 3' },
      { type: '3 BHK', area: '1075', built: '1400', note: 'Flat 4' },
    ],
    areaLabels: { area: 'B/U area sq ft', built: 'Super B/U sq ft' },
    amenities: [
      'Community hall — 20\'8" x 21\'8", 396 sq ft',
      'Landscaped terrace lawn',
      'Pergola lounge and seating deck',
      'Covered car park at ground',
      'Lift',
    ],
    plans: [{ src: 'plan-typical', caption: 'Typical floor — four homes' }],
    gallery: [
      { src: 'terrace', caption: 'Terrace — community hall and pergola' },
      { src: 'lounge', caption: 'Terrace lounge' },
    ],
  },

  {
    slug: 'majestic',
    name: 'Majestic',
    short: 'Majestic',
    tagline: 'Your wish is transformed into existence',
    location: 'Ranchi',
    theme: {
      ink: '#241407',
      paper: '#f2e9d6',
      accent: '#a8802f',
      accentSoft: '#c9a05a',
    },
    copy: [
      'Majestic is the one mixed-use address in the portfolio: a residential tower and a commercial block sharing a single compound, so the shop downstairs and the home upstairs belong to the same address.',
      'A community that is diverse and designed — residential and commercial spaces in an ecosystem that is rich in potential. The commercial block runs an anchor shop across three levels with four offices above.',
    ],
    residences: [
      { type: 'Anchor shop', area: '3450', note: 'Ground, 1st and 2nd floor · carpet 2450 sq ft' },
      { type: 'Shop', area: '1135', note: 'Commercial block' },
      { type: 'Office 1', area: '490', note: '3rd to 5th floor' },
      { type: 'Office 2', area: '975', note: '3rd to 5th floor' },
      { type: 'Office 3', area: '1225', note: '3rd to 5th floor' },
      { type: '3 BHK', area: '1490', note: 'Residential tower · flats 103 / 203 / 303 / 403' },
      { type: '3 BHK', area: '1405', note: 'Residential tower · flats 104 / 204 / 304 / 404' },
    ],
    areaLabels: { area: 'Super built-up sq ft' },
    amenities: [
      'Residential and commercial in one compound',
      'Two lifts — one per block',
      'Covered parking',
      '70 ft wide internal corridor',
      'Entrance lobby',
    ],
    plans: [
      { src: 'plan-shop', caption: 'Commercial — ground, 1st and 2nd floor' },
      { src: 'plan-office', caption: 'Commercial — 3rd, 4th and 5th floor' },
      { src: 'plan-flat', caption: 'Residential — typical floor' },
    ],
    gallery: [
      { src: 'commercial', caption: 'The commercial block' },
      { src: 'tower', caption: 'The residential tower' },
      { src: 'iso-1', caption: 'Typical home — isometric' },
      { src: 'iso-2', caption: 'Typical home — isometric' },
    ],
  },

  {
    slug: 'arpan-enclave',
    name: 'Arpan Enclave',
    short: 'Arpan Enclave',
    tagline: 'Phase 1 & Phase 2',
    location: 'Ranchi',
    theme: {
      ink: '#0a1e33',
      paper: '#eef1f0',
      accent: '#a8452f',
      accentSoft: '#c96a4e',
    },
    copy: [
      'Arpan Enclave was built in two phases on one site — four homes to a floor in Phase 1, and a Phase 2 plate that adds a shared terrace at the top.',
      'Every home is a three-bedroom flat with a drawing room, dining, puja and a balcony off each bedroom. The specification is the standard Arpan schedule: vitrified flooring, UPVC windows, granite counters, and a lift that serves every floor.',
    ],
    residences: [
      { type: '3 BHK', area: '1400', note: 'Phase 1 · Flat 1' },
      { type: '3 BHK', area: '1410', note: 'Phase 1 · Flat 2' },
      { type: '3 BHK', area: '1260', note: 'Phase 1 · Flat 3' },
      { type: '3 BHK', area: '1550', note: 'Phase 1 · Flat 4' },
      { type: '3 BHK', area: '1485', note: 'Phase 2 · Flat 3' },
      { type: '3 BHK', area: '1145', note: 'Phase 2 · Flats 1 & 2' },
      { type: '3 BHK', area: '1625', note: 'Phase 2 · Flat 2' },
    ],
    areaLabels: { area: 'SBA sq ft' },
    amenities: ARPAN_FEATURES,
    highlights: ARPAN_HIGHLIGHTS,
    specifications: ARPAN_SPECS,
    plans: [
      { src: 'plan-phase-1', caption: 'Phase 1 — typical floor' },
      { src: 'plan-phase-2', caption: 'Phase 2 — 1st to 3rd floor' },
      { src: 'plan-terrace', caption: 'Phase 2 — terrace floor' },
    ],
  },

  {
    slug: 'nishes-arpan',
    name: 'Nishesh Arpan',
    short: 'Nishesh',
    location: 'Ranchi',
    rera: 'RERA approved',
    theme: {
      ink: '#1b2b33',
      paper: '#f4f4f4',
      accent: '#2e8b8b',
      accentSoft: '#7ec4c4',
    },
    copy: [
      'Nishesh Arpan mixes two-bedroom and three-bedroom homes on the lower floors and opens out on the fourth, where the larger flats sit.',
      'It is built to the same Arpan specification as the rest of the portfolio — vitrified flooring, UPVC windows, granite counters, one lift, and a guard at the gate around the clock.',
    ],
    residences: [
      { type: '3 BHK', area: '1190', note: '1st to 3rd floor · Flat 1' },
      { type: '2 BHK', area: '645', note: '1st to 3rd floor · Flat 2' },
      { type: '2 BHK', area: '1205', note: '1st to 3rd floor · Flat 3' },
      { type: '3 BHK', area: '1555', note: '4th floor · Flat 1' },
      { type: '2 BHK', area: '1665', note: '4th floor · Flat 2' },
    ],
    areaLabels: { area: 'Carpet area sq ft' },
    amenities: ARPAN_FEATURES,
    highlights: ARPAN_HIGHLIGHTS,
    specifications: ARPAN_SPECS,
    plans: [
      { src: 'plan-lower', caption: '1st to 3rd floor' },
      { src: 'plan-upper', caption: '4th floor' },
    ],
  },

  {
    slug: 'palash-arpan',
    name: 'Palash Arpan',
    short: 'Palash',
    tagline: 'Well planned apartments',
    location: 'Ranchi',
    rera: 'JHARERA / PROJECT / 133 / 2022',
    year: '2022',
    theme: {
      ink: '#143a3f',
      paper: '#eef6f6',
      accent: '#7b3535',
      accentSoft: '#a9d8d8',
    },
    copy: [
      'Palash Arpan is a four-home floor plate with three-bedroom flats on three corners and a two-bedroom home completing the fourth.',
      'The plan does the work here: every bedroom takes an external wall, the kitchens are pushed to the edge for ventilation, and the balconies are deep enough to sit in rather than stand on.',
    ],
    residences: [
      { type: '3 BHK', area: '1385', note: 'Flat 1' },
      { type: '3 BHK', area: '1450', note: 'Flat 2' },
      { type: '3 BHK', area: '1325', note: 'Flat 3' },
      { type: '2 BHK', area: '1260', note: 'Flat 4' },
    ],
    areaLabels: { area: 'SBA sq ft' },
    amenities: ARPAN_FEATURES,
    highlights: ARPAN_HIGHLIGHTS,
    specifications: ARPAN_SPECS.map((s) =>
      s.label === 'Flooring'
        ? { ...s, value: '4x2 GVT vitrified floor tiles throughout the flat, except the toilets, of Johnson.' }
        : s
    ),
    plans: [{ src: 'plan-typical', caption: 'Typical floor — four homes' }],
    gallery: [{ src: 'interior', caption: 'Interior study' }],
  },

  {
    slug: 'arpan-vilash',
    name: 'Arpan Vilash',
    short: 'Vilash',
    tagline: 'A home that you deserve',
    location: 'Arpan Colony, Tetartoli Talab, near RIMS, Ranchi',
    theme: {
      ink: '#4a3226',
      paper: '#f2ede2',
      accent: '#a8654f',
      accentSoft: '#c98a8a',
    },
    copy: [
      'Arpan Vilash is the largest scheme in the portfolio: two blocks of eight floors on a site held together by open ground, with 82 per cent of the land left unbuilt.',
      'Magnificent high-rise living with a designer elevation, planned around health, lifestyle and recreation — a temple, a jogging track, a children\u2019s park, a gym and a yoga and meditation centre, all inside the compound.',
    ],
    residences: [
      { type: '3 BHK — Block A', area: '1805', note: 'Flat 101A · super built-up' },
      { type: '3 BHK — Block A', area: '1820', note: 'Flat 102A · super built-up' },
      { type: '3 BHK — Block B', area: '1805', note: 'Mirror plate' },
    ],
    areaLabels: { area: 'Super built-up sq ft' },
    amenities: [
      'Temple',
      'Jogging track',
      'Children\u2019s park',
      '82% open space',
      'Gym and yoga meditation centre',
      'Community hall',
      'Ample visitor parking',
      'Boom barrier with car tag at entrance',
      '24-hour power backup for common areas',
      '24-hour security with CCTV and guard',
      'Fire fighting equipment',
      'Loan and EMI facility available',
    ],
    specifications: [
      { label: 'Structure', value: 'RCC framed structure to the design and specification of the structural consultant.' },
      { label: 'Chaukhat', value: 'Wooden door frame.' },
      { label: 'Doors', value: 'Decorative main door; flush shutters of standard make elsewhere.' },
      { label: 'Windows', value: '3-track UPVC sliding windows.' },
      { label: 'Kitchen', value: 'Vitrified floor, granite working platform, 24 inch glazed tile dado, stainless steel sink.' },
      { label: 'Lift', value: 'Six-passenger manual lift, with 3.3 kVA supply and a 300 W backup set.' },
      { label: 'Flooring', value: 'Vitrified throughout; marble on the staircase and landings; 7 ft glazed tiles on balcony walls.' },
      { label: 'Electrical', value: 'Concealed copper wiring, modular switches and fittings of Havells.' },
      { label: 'Internal finish', value: 'Smooth plaster of paris with a coat of primer.' },
      { label: 'External finish', value: 'Elevation design in weather coat paint.' },
      { label: 'Sanitary', value: 'Wall-hung WC with diverter system; chromium plated fittings of reputed brand.' },
    ],
    plans: [
      { src: 'master-plan', caption: 'Master plan — Block A and Block B' },
      { src: 'plan-block-a', caption: 'Block A — typical floor' },
    ],
    gallery: [
      { src: 'tower-a', caption: 'Block A' },
      { src: 'tower-b', caption: 'Block B' },
      { src: 'iso', caption: 'Typical home — isometric' },
    ],
  },
]

export const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))
