/**
 * Automated Seeding Script for Lixbor Auron LLP Sanity Studio
 * Zero external dependencies — uses Node's built-in fetch.
 * 
 * Usage:
 *   node scripts/seed-sanity.mjs
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simple env loader
function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnvFile(resolve(__dirname, '../.env.local'));
loadEnvFile(resolve(__dirname, '../.env'));

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '').trim() || '3cyxeuj4';
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || '').trim() || 'production';
const token = (process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN || '').trim();
const apiVersion = '2026-10-04';

if (!token) {
  console.error('❌ Error: SANITY_API_READ_TOKEN or SANITY_API_WRITE_TOKEN is missing in .env.local.');
  process.exit(1);
}

const documents = [
  // 1. Site Settings
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    name: 'Lixbor Auron LLP',
    legalName: 'LIXBOR AURON LLP',
    tagline: 'Global Sourcing. Industrial Expertise. Reliable Supply.',
    subTagline: 'Import • Export • Trading • Sourcing • Supply',
    incorporatedYear: '2026',
    foundationYear: '1989',
    country: 'India',
    journeyTagline: '1989 Foundations · 2026 Platform · Global Ambition',
    visionTagline: 'Build → Expand → Globalize',
    placeholders: {
      registeredOffice: 'Shop no. 10, 2nd floor, Khanna City Centre, G.T. Road, Khanna',
      llpin: 'ADB-3045',
      pan: 'AANFL4750H*',
      tan: 'JLDL01971E*',
      email: 'contact@lixborauron.com',
      phone: '+91 62391-41145',
      website: 'https://lixborauron.com',
      iec: 'Applied / In Process',
      gstin: 'Applied / In Process',
    },
    mainNavLinks: [
      { _key: 'nav-1', name: 'Home', href: '/' },
      { _key: 'nav-2', name: 'Who We Are', href: '/who-we-are' },
      { _key: 'nav-3', name: 'Our Products', href: '/products' },
      { _key: 'nav-4', name: 'FAQ', href: '/faq' },
    ],
    footerLegalLinks: [
      { _key: 'legal-1', name: 'Terms & Conditions', href: '/terms-and-conditions' },
      { _key: 'legal-2', name: 'Privacy Notice', href: '/privacy-notice' },
    ],
  },

  // 2. Homepage
  {
    _id: 'homePage',
    _type: 'homePage',
    title: 'Homepage Content',
    heroSlides: [
      {
        _key: 'slide-1',
        number: '01',
        kicker: 'GLOBAL ALLIANCES',
        headlineTitle: 'Global Sourcing & Trade',
        subtitle: 'Connecting global markets with certified industrial raw materials and reliable supply.',
        buttonText: 'EXPLORE',
        buttonLink: '/products',
        fallbackImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80',
      },
      {
        _key: 'slide-2',
        number: '02',
        kicker: 'CORE PRODUCTS',
        headlineTitle: 'Magnesium Oxide & Chemicals',
        subtitle: 'High-purity agricultural, feed, and technical grades from certified producers.',
        buttonText: 'EXPLORE PRODUCTS',
        buttonLink: '/products#mgo-focus',
        fallbackImage: 'https://images.unsplash.com/photo-1616886307848-7f6635699c43?auto=format&fit=crop&w=2000&q=80',
      },
      {
        _key: 'slide-3',
        number: '03',
        kicker: 'INDUSTRY PIONEERS',
        headlineTitle: 'Industrial Trade Excellence',
        subtitle: 'Decades of industrial foundation delivering operational reliability and global trade solutions.',
        buttonText: 'WHO WE ARE',
        buttonLink: '/who-we-are',
        fallbackImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80',
      },
    ],
    essenceSection: {
      kicker: 'DISCOVER LIXBOR AURON',
      title: 'The Essence of Who We Are',
      paragraph1:
        'Lixbor Auron LLP is an independent international commodities trading enterprise focused on facilitating the efficient movement of industrial raw materials, essential chemicals, fertilizers, and polymers across global markets.',
      paragraph2:
        'While incorporated in 2026 as a modern trading platform, our business foundation traces back to 1989 in the iron and steel industry. Our vertical integration across logistics, verified sourcing, and physical supply management gives us greater control at each stage of the trade, resulting in consistent, reliable outcomes for our global partners.',
      rowLinks: [
        { _key: 'row-1', title: 'International Commodity Trading', href: '/products' },
        { _key: 'row-2', title: 'Magnesium Oxide (MgO) Sourcing Program', href: '/products#mgo-focus' },
        { _key: 'row-3', title: 'Chemicals & Fertilizers Distribution', href: '/products#chemicals-fertilizers' },
        { _key: 'row-4', title: 'Polymer Resins & XLPE Cable Compounds', href: '/products#polymers' },
        { _key: 'row-5', title: 'End-to-End Maritime & Storage Logistics', href: '/who-we-are' },
        { _key: 'row-6', title: 'Commercial Integrity & Trade Discretion', href: '/contact' },
      ],
    },
    valueCards: [
      {
        _key: 'card-1',
        kicker: 'CHEMICALS & FERTILIZERS',
        title: 'High-grade MgO, Urea, Sulphur, and Melamine for agricultural and industrial processing.',
        link: '/products#chemicals-fertilizers',
        fallbackImage: '/images/cards/card-1.webp',
      },
      {
        _key: 'card-2',
        kicker: 'POLYMERS & RESINS',
        title: 'XLPE compounds, semiconductive compounds, ABS, and LDPE engineered for power cable & packaging sectors.',
        link: '/products#polymers',
        fallbackImage: '/images/cards/card-2.webp',
      },
      {
        _key: 'card-3',
        kicker: 'OUR SOURCING MODEL',
        title: 'End-to-end physical trading & 5-step sourcing methodology: Understand → Source → Verify → Execute.',
        link: '/who-we-are',
        fallbackImage: '/images/cards/card-3.webp',
      },
      {
        _key: 'card-4',
        kicker: 'SPEAK TO OUR EXPERTS',
        title: 'Get tailored commercial quotes and technical specifications from our experienced export team.',
        link: '/contact',
        fallbackImage: '/images/cards/card-4.webp',
      },
    ],
    peopleSection: {
      kicker: 'OUR TEAM',
      title: 'Our People & Heritage',
      paragraph1:
        'We take a rigorous and selective approach to building our trading matrix, bringing together highly experienced and talented professionals from industrial manufacturing, trade finance, and international logistics.',
      paragraph2:
        'Our group leadership traces its origin back to 1989 in the Indian iron and steel manufacturing sector. Today, we combine deep technical product insight with practical execution capability across global markets, enabling a streamlined structure with a sharply focused ambition to deliver superior B2B outcomes.',
    },
    ctaSection: {
      title: 'Ready to Streamline Your Industrial Raw Material Sourcing?',
      description: 'Connect with our trade desk for technical specifications, commercial quotes, or custom sourcing requirements.',
      buttonText: 'Submit Sourcing Inquiry',
      buttonHref: '/contact',
    },
  },

  // 3. Who We Are
  {
    _id: 'whoWeArePage',
    _type: 'whoWeArePage',
    title: 'Who We Are Content',
    hero: {
      kicker: 'ABOUT LIXBOR AURON LLP',
      title: 'Global Sourcing & Industrial Expertise',
      description:
        'A professionally managed trading company engaged in international sourcing, trading and distribution of chemicals, fertilizers and polymers.',
      fallbackImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80',
    },
    story: {
      kicker: 'OUR HERITAGE & EVOLUTION',
      title: 'From 1989 Industrial Foundations to a 2026 International Trading Platform',
      paragraph1:
        'Lixbor Auron LLP represents a powerful combination of proven industrial heritage and modern global trading capability. Incorporated in 2026 as an international trading entity, our roots extend back to 1989, when our leadership established a strong footprint in the iron and steel industry.',
      paragraph2:
        'Over more than three decades, our group developed extensive experience in industrial manufacturing, quality compliance, logistics management, and nationwide supply across PAN India.',
      paragraph3:
        'Recognizing evolving global supply chain demands, Lixbor Auron LLP was established to extend this foundational discipline into international trading of high-grade industrial raw materials — specializing in Magnesium Oxide, key fertilizers, specialty chemicals, and high-performance polymers.',
    },
    coreValues: [
      { _key: 'v1', id: 'integrity', title: 'Integrity', description: 'Uncompromising commercial transparency, honest contracts, and ethical trade practices across all international dealings.', iconName: 'ShieldCheck' },
      { _key: 'v2', id: 'reliability', title: 'Reliability', description: 'Consistent product availability, predictable lead times, and steadfast execution of supply commitments.', iconName: 'Clock' },
      { _key: 'v3', id: 'quality', title: 'Quality', description: 'Strict adherence to global quality standards, verified manufacturer certification, and stringent pre-shipment inspections.', iconName: 'Award' },
      { _key: 'v4', id: 'responsiveness', title: 'Responsiveness', description: 'Agile communication, prompt commercial quoting, and proactive logistics troubleshooting for global procurement managers.', iconName: 'Zap' },
      { _key: 'v5', id: 'partnership', title: 'Partnership', description: 'Cultivating sustainable, long-term relationships with both verified manufacturers and industrial end-users.', iconName: 'Handshake' },
      { _key: 'v6', id: 'growth', title: 'Growth', description: 'Continuous expanding of market reach, product portfolios, and supply chain capabilities for mutual prosperity.', iconName: 'TrendingUp' },
    ],
    vision: {
      kicker: 'VISION & STRATEGY',
      title: 'To Be Among the World’s Most Trusted International Trading Companies',
      tagline: 'Build → Expand → Globalize',
      description: 'Growing from a focused industrial trader into a diversified global organization known for operational excellence and customer reliability.',
      pillars: [
        { _key: 'p1', title: 'Reliable Sourcing', description: 'Forging direct partnerships with tier-1 verified global producers to ensure consistent material availability.' },
        { _key: 'p2', title: 'Competitive Solutions', description: 'Leveraging economies of scale and market insights to deliver cost-effective commercial terms to industrial buyers.' },
        { _key: 'p3', title: 'Quality-Focused Supply', description: 'Implementing rigorous quality assurance across chemical purities, polymer grades, and physical specifications.' },
        { _key: 'p4', title: 'Efficient Logistics', description: 'Executing seamless maritime freight, multimodal transport, customs clearing, and storage solutions.' },
        { _key: 'p5', title: 'Long-Term Partnerships', description: 'Prioritizing enduring client trust and collaborative growth over short-term transactional trades.' },
      ],
    },
    milestones: [
      { _key: 'm1', year: '1989', title: 'Industrial Foundations', description: 'Initiated operations in the iron and steel industry, establishing manufacturing capabilities and nationwide PAN-India supply networks.', highlight: false },
      { _key: 'm2', year: '2026', title: 'Lixbor Auron LLP Platform', description: 'Incorporated Lixbor Auron LLP to expand operations into international trading of chemicals, fertilizers, and polymers.', highlight: true },
      { _key: 'm3', year: 'Future', title: 'Global Ambition', description: 'Continuous global expansion — "More Products. More Markets. More Connections." — building a worldwide trading presence.', highlight: false },
    ],
    physicalTradingModel: [
      { _key: 'ptm1', step: 1, title: 'Buy', action: 'Direct Procurement', description: 'Sourcing directly from verified global chemical, polymer, and mineral producers at competitive terms.' },
      { _key: 'ptm2', step: 2, title: 'Ship', action: 'Maritime & Multimodal Freight', description: 'Coordinating international vessel chartering, container shipping, port handling, and shipping documentation.' },
      { _key: 'ptm3', step: 3, title: 'Store', action: 'Strategic Warehousing', description: 'Managing secure storage facilities close to key industrial hubs to ensure buffer stock availability.' },
      { _key: 'ptm4', step: 4, title: 'Sell', action: 'Commercial Distribution', description: 'Tailoring customized supply contracts and commercial terms for regional industrial end-users.' },
      { _key: 'ptm5', step: 5, title: 'Blend', action: 'Value-Add Processing', description: 'Offering customized formulation blending, sifting, or packaging modifications when required.' },
      { _key: 'ptm6', step: 6, title: 'Deliver', action: 'Just-in-Time Delivery', description: 'Final door-step delivery to manufacturing facilities, maintaining strict delivery schedules.' },
    ],
    sourcingProcess: [
      { _key: 'sp1', step: 1, title: 'Understand', description: 'Deeply analyzing client chemical specifications, purity requirements, application constraints, and delivery schedules.' },
      { _key: 'sp2', step: 2, title: 'Source', description: 'Identifying verified international producers and manufacturers capable of meeting stringent quality standards.' },
      { _key: 'sp3', step: 3, title: 'Verify', description: 'Conducting lab testing, certificate of analysis (COA) verification, sample validation, and plant audits.' },
      { _key: 'sp4', step: 4, title: 'Execute', description: 'Managing international trade finance, freight booking, customs compliance, and port handling seamlessly.' },
      { _key: 'sp5', step: 5, title: 'Develop', description: 'Fostering long-term strategic supply relationships, post-delivery technical support, and contract continuity.' },
    ],
  },

  // 4. Products (8 items)
  {
    _id: 'prod-magnesium-oxide',
    _type: 'product',
    name: 'Magnesium Oxide (MgO)',
    slug: { _type: 'slug', current: 'magnesium-oxide' },
    category: 'Chemicals & Fertilizers',
    order: 1,
    isFlagship: true,
    shortDescription: 'Core focus product available in specialized grades for agriculture, animal nutrition, and technical applications.',
    fullDescription:
      'Magnesium Oxide (MgO) represents Lixbor Auron LLP’s primary core product focus. We source and distribute high-purity MgO tailored to stringent global specifications across agricultural, animal nutrition, and industrial chemical sectors.',
    keyApplications: [
      'Agriculture & Soil Health',
      'Animal Nutrition & Feed Premixes',
      'Construction Boards & Environmental Treatment',
    ],
    specifications: [
      'Available in MgO purities ranging from 85% to 98%+',
      'Custom mesh sizes (Powder, Granular)',
      'Low heavy-metal profiles certified for feed applications',
      'Controlled reactivity (Light Burned / Caustic Calcined)',
    ],
    fallbackImageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    grades: [
      {
        _key: 'g1',
        name: 'Agricultural Grade',
        code: 'MgO-AGRI',
        description: 'High-bioavailability magnesium source for soil enrichment, fertilizer formulations, and crop yield optimization.',
        applications: ['Soil Conditioners', 'Blended NPK Fertilizers', 'Magnesium Deficiency Treatment', 'Foliar Formulations'],
      },
      {
        _key: 'g2',
        name: 'Animal Nutrition / Feed Grade',
        code: 'MgO-FEED',
        description: 'Purity-certified magnesium oxide formulated for ruminant nutrition, preventing grass tetany and supporting metabolic health.',
        applications: ['Cattle & Ruminant Feed Supplements', 'Mineral Blocks & Premixes', 'Dietary Magnesium Source', 'Livestock Health'],
      },
      {
        _key: 'g3',
        name: 'Technical / Industrial Grade',
        code: 'MgO-TECH',
        description: 'High-purity reactive magnesium oxide for chemical processing, hydrometallurgy, water treatment, and construction boards.',
        applications: ['Magnesium Board Manufacturing', 'Wastewater Neutralization', 'Chemical Synthesis', 'Rubber & Plastics Additives'],
      },
    ],
  },
  {
    _id: 'prod-urea',
    _type: 'product',
    name: 'Urea',
    slug: { _type: 'slug', current: 'urea' },
    category: 'Chemicals & Fertilizers',
    order: 2,
    shortDescription: 'Versatile nitrogen product supplied in technical, prilled, industrial, and automotive (DEF/AdBlue) grades.',
    fullDescription:
      'High-nitrogen chemical compound essential for resin production, industrial chemical synthesis, and automotive exhaust fluid (DEF/AdBlue) manufacturing. Sourced directly from tier-1 chemical producers.',
    keyApplications: [
      'Automotive DEF / AdBlue Production',
      'Urea-Formaldehyde Resins & Adhesives',
      'Industrial Chemical Intermediate',
    ],
    specifications: [
      'Nitrogen Content: 46% min',
      'Grades: Technical / Industrial Grade, Automotive / DEF Grade',
      'Low biuret options for technical & industrial applications',
    ],
    fallbackImageUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    _id: 'prod-granular-sulphur',
    _type: 'product',
    name: 'Granular Sulphur',
    slug: { _type: 'slug', current: 'granular-sulphur' },
    category: 'Chemicals & Fertilizers',
    order: 3,
    shortDescription: 'High-purity elemental sulphur for fertilizer production, sulphuric acid plants, and industrial processing.',
    fullDescription:
      'Bright yellow elemental granular sulphur used extensively in the production of phosphate fertilizers, sulphuric acid manufacturing, rubber vulcanization, and chemical processing.',
    keyApplications: [
      'Sulphuric Acid Manufacturing',
      'Phosphate & Sulphur-Enriched Fertilizers',
      'Rubber Vulcanization & Processing',
      'Chemical & Explosive Manufacturing',
    ],
    specifications: [
      'Purity: 99.5% min elemental sulphur',
      'Form: Bright Yellow Granular (2-6mm)',
      'Low ash and moisture content',
    ],
    fallbackImageUrl: 'https://images.unsplash.com/photo-1616886307848-7f6635699c43?auto=format&fit=crop&w=1000&q=80',
  },
  {
    _id: 'prod-melamine',
    _type: 'product',
    name: 'Melamine',
    slug: { _type: 'slug', current: 'melamine' },
    category: 'Chemicals & Fertilizers',
    order: 4,
    shortDescription: 'Essential organic chemical intermediate for durable resins, laminates, surface coatings, and molding compounds.',
    fullDescription:
      'Melamine is a high-nitrogen heterocyclic compound critical for manufacturing melamine-formaldehyde resins, decorative laminates, wood adhesives, flame retardants, and automotive coatings.',
    keyApplications: [
      'Decorative & Industrial Laminates',
      'Wood Adhesives & Plywood Resins',
      'Surface Coatings & Automotive Finishes',
      'Flame Retardant Plastics',
    ],
    specifications: [
      'Purity: 99.8% min',
      'Appearance: Fine White Powder',
      'Low pH volatility and moisture content',
    ],
    fallbackImageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
  },
  {
    _id: 'prod-xlpe',
    _type: 'product',
    name: 'XLPE (Cross-Linked Polyethylene)',
    slug: { _type: 'slug', current: 'xlpe' },
    category: 'Polymers',
    order: 5,
    shortDescription: 'High-performance cross-linked polyethylene compound for power cable insulation and piping systems.',
    fullDescription:
      'XLPE compounds offer superior electrical insulation, thermal stability, and mechanical strength, making them the industry standard for medium and high-voltage power transmission cables.',
    keyApplications: [
      'Medium & High Voltage Power Cable Insulation',
      'Telecommunication Cable Jackets',
      'Cross-linked PEX Piping Systems',
      'Heavy-Duty Electrical Infrastructure',
    ],
    specifications: [
      'Silane cross-linkable & peroxide cross-linkable options',
      'Excellent dielectric strength & thermal breakdown resistance',
      'Compliant with international IEC cable standards',
    ],
    fallbackImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
  },
  {
    _id: 'prod-semiconductive-compounds',
    _type: 'product',
    name: 'Semiconductive Compounds',
    slug: { _type: 'slug', current: 'semiconductive-compounds' },
    category: 'Polymers',
    order: 6,
    shortDescription: 'Specialized conductive polymer compounds for electrical field distribution in power cable systems.',
    fullDescription:
      'Engineered polymer compounds containing conductive carbon black filler, formulated for conductor and insulation shielding in medium and high-voltage power cables to prevent electrical stress concentrations.',
    keyApplications: [
      'Conductor Shielding in MV/HV Power Cables',
      'Insulation Shielding Layers',
      'Stress Control in Cable Accessories & Joints',
      'High-Reliability Electrical Power Systems',
    ],
    specifications: [
      'Strictly controlled volume resistivity',
      'Smooth surface extrusion quality',
      'High compatibility with XLPE insulation layers',
    ],
    fallbackImageUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    _id: 'prod-abs',
    _type: 'product',
    name: 'ABS (Acrylonitrile Butadiene Styrene)',
    slug: { _type: 'slug', current: 'abs' },
    category: 'Polymers',
    order: 7,
    shortDescription: 'Versatile engineering thermoplastic known for high impact resistance, dimensional stability, and aesthetic finish.',
    fullDescription:
      'ABS polymer resin combines the strength and rigidity of acrylonitrile and styrene polymers with the toughness of polybutadiene rubber. Widely used in automotive components, consumer electronics, and appliances.',
    keyApplications: [
      'Automotive Interior & Exterior Trims',
      'Consumer Electronics & Appliance Housings',
      'Pipe Fittings & Architectural Hardware',
      '3D Printing & Industrial Prototyping',
    ],
    specifications: [
      'Injection molding & extrusion grades available',
      'High impact strength and heat resistance',
      'Custom color compounding options',
    ],
    fallbackImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
  },
  {
    _id: 'prod-ldpe',
    _type: 'product',
    name: 'LDPE (Low-Density Polyethylene)',
    slug: { _type: 'slug', current: 'ldpe' },
    category: 'Polymers',
    order: 8,
    shortDescription: 'Flexible, ductile thermoplastic compound ideal for packaging films, agricultural sheets, and flexible tubing.',
    fullDescription:
      'Low-Density Polyethylene resin offering high clarity, chemical inertness, and flexibility. Essential for heavy-duty industrial film packaging, agricultural mulch films, and squeeze bottles.',
    keyApplications: [
      'Industrial Packaging & Shrink Films',
      'Agricultural & Greenhouse Mulch Films',
      'Flexible Tubing & Cable Jackets',
      'Lamination Resins',
    ],
    specifications: [
      'MFI range tailored for blow film & extrusion',
      'High tensile strength & tear resistance',
      'Food-contact compliant grades available',
    ],
    fallbackImageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80',
  },

  // 5. FAQ Items (8 items)
  {
    _id: 'faq-1',
    _type: 'faqItem',
    question: 'What products do we deal in?',
    answer: 'We deal in chemicals, fertilizers, and polymers.',
    category: 'Products & Sourcing',
    order: 1,
  },
  {
    _id: 'faq-2',
    _type: 'faqItem',
    question: 'What experience supports our business?',
    answer: 'Although incorporated in 2026, we have extensive experience in the iron and steel industry dating back to 1989.',
    category: 'Company & Heritage',
    order: 2,
  },
  {
    _id: 'faq-3',
    _type: 'faqItem',
    question: 'How do we handle inquiries?',
    answer: 'We follow a structured five-step process applied to every inquiry.',
    category: 'Process & Operations',
    order: 3,
  },
  {
    _id: 'faq-4',
    _type: 'faqItem',
    question: 'Why should clients trust us?',
    answer: 'Clients trust us for our experience, reliable sourcing, quality products, transparent dealings, and commitment to long-term partnerships.',
    category: 'Company & Heritage',
    order: 4,
  },
  {
    _id: 'faq-5',
    _type: 'faqItem',
    question: 'Do our products meet international quality standards?',
    answer: 'Yes, we prioritize reliability, global sourcing, and a commitment to quality and service.',
    category: 'Quality Assurance',
    order: 5,
  },
  {
    _id: 'faq-6',
    _type: 'faqItem',
    question: 'What is our quotation process like?',
    answer: 'We follow a structured process applied to every inquiry to ensure specific details for a smooth process.',
    category: 'Process & Operations',
    order: 6,
  },
  {
    _id: 'faq-7',
    _type: 'faqItem',
    question: 'Can we fulfill bulk orders and deliver on time?',
    answer: 'Yes, we focus on reliable supply and global sourcing to meet global demand efficiently.',
    category: 'Logistics & Supply',
    order: 7,
  },
  {
    _id: 'faq-8',
    _type: 'faqItem',
    question: 'How is Magnesium Oxide utilized?',
    answer:
      'Magnesium Oxide (MgO) as a high-demand industrial raw material is used in manufacturing applications. For example, it is used in the production of fertilizers, animal feed, chemicals, refractory materials, and other industrial products, depending on the required grade and specification.',
    category: 'Products & Sourcing',
    order: 8,
  },

  // 6. Contact Page
  {
    _id: 'contactPage',
    _type: 'contactPage',
    title: 'Contact Page Content',
    hero: {
      kicker: 'COMMERCIAL ENQUIRIES',
      title: 'Speak to Our Trading Desk',
      description:
        'Whether you require technical specifications, commercial quotes, COA documentation, or long-term supply contract discussions.',
    },
    enquiryCategories: [
      { _key: 'c1', value: 'chemicals', label: 'Chemicals & Fertilizers (MgO, Urea, Sulphur, Melamine)' },
      { _key: 'c2', value: 'polymers', label: 'Polymers (XLPE, Semiconductive, ABS, LDPE)' },
      { _key: 'c3', value: 'mgo-specialty', label: 'Magnesium Oxide (MgO) Specialized Inquiry' },
      { _key: 'c4', value: 'sourcing-partnership', label: 'Supplier / Manufacturing Partnership' },
      { _key: 'c5', value: 'general', label: 'General Corporate / Trade Inquiry' },
    ],
  },
];

async function runSeed() {
  console.log(`\n🚀 Seeding Sanity dataset "${dataset}" (Project: ${projectId})...\n`);

  const mutations = documents.map((doc) => ({
    createOrReplace: doc,
  }));

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('❌ Sanity API Error:', JSON.stringify(data, null, 2));
    if (data.error?.description?.includes('Insufficient permissions')) {
      console.error('\n⚠️ PERMISSION DENIED: Your token is a "Viewer" token.');
      console.error('👉 Fix: Go to sanity.io/manage -> Your Project -> API -> Tokens.');
      console.error('👉 Change permission to "Editor" or create a new token with "Editor" permission.\n');
    }
    process.exit(1);
  }

  console.log(`✅ SUCCESS! Published ${documents.length} documents to Sanity:`);
  documents.forEach((d) => {
    console.log(`   ✓ ${d._type.padEnd(16)} -> ${d._id}`);
  });
  console.log('\n🎉 All content is now live in Sanity Studio!\n');
}

runSeed().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});
