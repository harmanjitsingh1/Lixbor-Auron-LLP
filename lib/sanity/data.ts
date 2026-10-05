import { sanityFetch } from './client';
import { urlForImage } from './image';
import {
  siteSettingsQuery,
  homePageQuery,
  whoWeArePageQuery,
  productsQuery,
  faqItemsQuery,
  contactPageQuery,
} from './queries';
import { companyData, mainNavLinks, footerLegalLinks } from '../content/company';
import { faqList, FAQItem } from '../content/faq';
import { productsData, mgoFlagshipGrades } from '../content/products';
import {
  whoWeAreHeroData,
  companyStoryData,
  coreValuesData,
  visionData,
  physicalTradingModelData,
  sourcingProcessData,
  timelineMilestones,
} from '../content/who-we-are';
import { contactHeroData, enquiryCategories } from '../content/contact';
import {
  CompanyDetails,
  Product,
  ValueItem,
  VisionPillar,
  Milestone,
  TradingStep,
  SourcingStep,
} from '../types';

export interface WhoWeAreData {
  hero: {
    kicker: string;
    title: string;
    description: string;
    backgroundImage: string;
  };
  story: {
    kicker: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  coreValues: ValueItem[];
  vision: {
    kicker: string;
    title: string;
    tagline: string;
    description: string;
    pillars: VisionPillar[];
  };
  milestones: Milestone[];
  physicalTradingModel: TradingStep[];
  sourcingProcess: SourcingStep[];
}

export interface HomePageData {
  heroSlides: {
    number: string;
    kicker: string;
    headlineTitle: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    fallbackImage?: string;
  }[];
  essenceSection: {
    kicker: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    rowLinks: { title: string; href: string }[];
  };
  valueCards: {
    kicker: string;
    title: string;
    link: string;
    image: string;
  }[];
  peopleSection: {
    kicker: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
}

export async function getSiteSettings(): Promise<{
  companyData: CompanyDetails;
  mainNavLinks: { name: string; href: string }[];
  footerLegalLinks: { name: string; href: string }[];
}> {
  try {
    const data = await sanityFetch<any>({
      query: siteSettingsQuery,
      tags: ['siteSettings'],
    });

    if (data && data.name) {
      return {
        companyData: {
          name: data.name || companyData.name,
          legalName: data.legalName || companyData.legalName,
          tagline: data.tagline || companyData.tagline,
          subTagline: data.subTagline || companyData.subTagline,
          incorporatedYear: data.incorporatedYear || companyData.incorporatedYear,
          foundationYear: data.foundationYear || companyData.foundationYear,
          country: data.country || companyData.country,
          journeyTagline: data.journeyTagline || companyData.journeyTagline,
          visionTagline: data.visionTagline || companyData.visionTagline,
          placeholders: {
            ...companyData.placeholders,
            ...(data.placeholders || {}),
          },
        },
        mainNavLinks: data.mainNavLinks?.length ? data.mainNavLinks : mainNavLinks,
        footerLegalLinks: data.footerLegalLinks?.length ? data.footerLegalLinks : footerLegalLinks,
      };
    }
  } catch (error) {
    console.warn('Failed to fetch siteSettings from Sanity, falling back to local content:', error);
  }

  return {
    companyData,
    mainNavLinks,
    footerLegalLinks,
  };
}

export async function getHomePageData(): Promise<HomePageData> {
  const fallbackData: HomePageData = {
    heroSlides: [
      {
        number: '01',
        kicker: 'GLOBAL ALLIANCES',
        headlineTitle: 'Global Sourcing & Trade',
        subtitle: 'Connecting global markets with certified industrial raw materials and reliable supply.',
        buttonText: 'EXPLORE',
        buttonLink: '/products',
        image: '/images/hero/hero-1.webp',
        fallbackImage: '/images/hero/hero-1.webp',
      },
      {
        number: '02',
        kicker: 'CORE PRODUCTS',
        headlineTitle: 'Magnesium Oxide & Chemicals',
        subtitle: 'High-purity agricultural, feed, and technical grades from certified producers.',
        buttonText: 'EXPLORE PRODUCTS',
        buttonLink: '/products#mgo-focus',
        image: '/images/hero/hero-2.webp',
        fallbackImage: '/images/hero/hero-2.webp',
      },
      {
        number: '03',
        kicker: 'INDUSTRY PIONEERS',
        headlineTitle: 'Industrial Trade Excellence',
        subtitle: 'Decades of industrial foundation delivering operational reliability and global trade solutions.',
        buttonText: 'WHO WE ARE',
        buttonLink: '/who-we-are',
        image: '/images/hero/hero-3.webp',
        fallbackImage: '/images/hero/hero-3.webp',
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
        { title: 'International Commodity Trading', href: '/products' },
        { title: 'Magnesium Oxide (MgO) Sourcing Program', href: '/products#mgo-focus' },
        { title: 'Chemicals & Fertilizers Distribution', href: '/products#chemicals-fertilizers' },
        { title: 'Polymer Resins & XLPE Cable Compounds', href: '/products#polymers' },
        { title: 'End-to-End Maritime & Storage Logistics', href: '/who-we-are' },
        { title: 'Commercial Integrity & Trade Discretion', href: '/contact' },
      ],
    },
    valueCards: [
      {
        kicker: 'CHEMICALS & FERTILIZERS',
        title: 'High-grade MgO, Urea, Sulphur, and Melamine for agricultural and industrial processing.',
        link: '/products#chemicals-fertilizers',
        image: '/images/cards/card-1.webp',
      },
      {
        kicker: 'POLYMERS & RESINS',
        title: 'XLPE compounds, semiconductive compounds, ABS, and LDPE engineered for power cable & packaging sectors.',
        link: '/products#polymers',
        image: '/images/cards/card-2.webp',
      },
      {
        kicker: 'OUR SOURCING MODEL',
        title: 'End-to-end physical trading & 5-step sourcing methodology: Understand → Source → Verify → Execute.',
        link: '/who-we-are',
        image: '/images/cards/card-3.webp',
      },
      {
        kicker: 'SPEAK TO OUR EXPERTS',
        title: 'Get tailored commercial quotes and technical specifications from our experienced export team.',
        link: '/contact',
        image: '/images/cards/card-4.webp',
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
  };

  try {
    const data = await sanityFetch<any>({
      query: homePageQuery,
      tags: ['homePage'],
    });

    if (data) {
      const heroSlides = data.heroSlides?.length
        ? data.heroSlides.map((s: any, idx: number) => {
            const localPath = `/images/hero/hero-${(idx % 3) + 1}.webp`;
            const cmsImg = urlForImage(s.image);
            const imageSrc = cmsImg && !cmsImg.includes('unsplash.com') ? cmsImg : localPath;
            return {
              number: s.number || `0${idx + 1}`,
              kicker: s.kicker || '',
              headlineTitle: s.headlineTitle || '',
              subtitle: s.subtitle || '',
              buttonText: s.buttonText || 'EXPLORE',
              buttonLink: s.buttonLink || '/products',
              image: imageSrc,
              fallbackImage: localPath,
            };
          })
        : fallbackData.heroSlides;

      const essenceSection = data.essenceSection
        ? {
            kicker: data.essenceSection.kicker || fallbackData.essenceSection.kicker,
            title: data.essenceSection.title || fallbackData.essenceSection.title,
            paragraph1: data.essenceSection.paragraph1 || fallbackData.essenceSection.paragraph1,
            paragraph2: data.essenceSection.paragraph2 || fallbackData.essenceSection.paragraph2,
            rowLinks: data.essenceSection.rowLinks?.length
              ? data.essenceSection.rowLinks
              : fallbackData.essenceSection.rowLinks,
          }
        : fallbackData.essenceSection;

      const valueCards = data.valueCards?.length
        ? data.valueCards.map((c: any) => ({
            kicker: c.kicker || '',
            title: c.title || '',
            link: c.link || '/products',
            image: urlForImage(c.image) || c.fallbackImage || '/images/cards/card-1.webp',
          }))
        : fallbackData.valueCards;

      const peopleSection = data.peopleSection
        ? {
            kicker: data.peopleSection.kicker || fallbackData.peopleSection.kicker,
            title: data.peopleSection.title || fallbackData.peopleSection.title,
            paragraph1: data.peopleSection.paragraph1 || fallbackData.peopleSection.paragraph1,
            paragraph2: data.peopleSection.paragraph2 || fallbackData.peopleSection.paragraph2,
          }
        : fallbackData.peopleSection;

      return {
        heroSlides,
        essenceSection,
        valueCards,
        peopleSection,
      };
    }
  } catch (error) {
    console.warn('Failed to fetch homePage from Sanity, falling back to local content:', error);
  }

  return fallbackData;
}

export async function getWhoWeAreData(): Promise<WhoWeAreData> {
  const fallback = {
    hero: whoWeAreHeroData,
    story: companyStoryData,
    coreValues: coreValuesData,
    vision: visionData,
    milestones: timelineMilestones,
    physicalTradingModel: physicalTradingModelData,
    sourcingProcess: sourcingProcessData,
  };

  try {
    const data = await sanityFetch<any>({
      query: whoWeArePageQuery,
      tags: ['whoWeArePage'],
    });

    if (data) {
      return {
        hero: {
          kicker: data.hero?.kicker || whoWeAreHeroData.kicker,
          title: data.hero?.title || whoWeAreHeroData.title,
          description: data.hero?.description || whoWeAreHeroData.description,
          backgroundImage: urlForImage(data.hero?.backgroundImage) || data.hero?.fallbackImageUrl || whoWeAreHeroData.backgroundImage,
        },
        story: {
          kicker: data.story?.kicker || companyStoryData.kicker,
          title: data.story?.title || companyStoryData.title,
          paragraph1: data.story?.paragraph1 || companyStoryData.paragraph1,
          paragraph2: data.story?.paragraph2 || companyStoryData.paragraph2,
          paragraph3: data.story?.paragraph3 || companyStoryData.paragraph3,
        },
        coreValues: data.coreValues?.length ? data.coreValues : coreValuesData,
        vision: {
          kicker: data.vision?.kicker || visionData.kicker,
          title: data.vision?.title || visionData.title,
          tagline: data.vision?.tagline || visionData.tagline,
          description: data.vision?.description || visionData.description,
          pillars: data.vision?.pillars?.length ? data.vision.pillars : visionData.pillars,
        },
        milestones: data.milestones?.length ? data.milestones : timelineMilestones,
        physicalTradingModel: data.physicalTradingModel?.length ? data.physicalTradingModel : physicalTradingModelData,
        sourcingProcess: data.sourcingProcess?.length ? data.sourcingProcess : sourcingProcessData,
      };
    }
  } catch (error) {
    console.warn('Failed to fetch whoWeArePage from Sanity, falling back to local content:', error);
  }

  return fallback;
}

export async function getProductsData(): Promise<{
  products: Product[];
  mgoGrades: typeof mgoFlagshipGrades;
}> {
  try {
    const data = await sanityFetch<any[]>({
      query: productsQuery,
      tags: ['product', 'products'],
    });

    if (data && data.length > 0) {
      const products: Product[] = data.map((p) => ({
        id: p.id || p._id,
        name: p.name,
        category: p.category,
        shortDescription: p.shortDescription || '',
        fullDescription: p.fullDescription || '',
        keyApplications: p.keyApplications || [],
        specifications: p.specifications || [],
        isFlagship: Boolean(p.isFlagship),
        image: (() => {
          const cmsImg = urlForImage(p.image);
          if (cmsImg && !cmsImg.includes('unsplash.com')) return cmsImg;
          if (p.fallbackImageUrl && !p.fallbackImageUrl.includes('unsplash.com')) return p.fallbackImageUrl;
          return p.category === 'Polymers' ? '/images/cards/card-2.webp' : '/images/cards/card-1.webp';
        })(),
        grades: p.grades || undefined,
      }));

      // Find flagship product or grades
      const flagship = products.find((p) => p.isFlagship || p.name.includes('Magnesium Oxide'));
      const mgoGrades = (flagship?.grades && flagship.grades.length > 0) ? flagship.grades : mgoFlagshipGrades;

      return {
        products,
        mgoGrades,
      };
    }
  } catch (error) {
    console.warn('Failed to fetch products from Sanity, falling back to local content:', error);
  }

  return {
    products: productsData,
    mgoGrades: mgoFlagshipGrades,
  };
}

export async function getFaqData(): Promise<FAQItem[]> {
  try {
    const data = await sanityFetch<any[]>({
      query: faqItemsQuery,
      tags: ['faqItem', 'faq'],
    });

    if (data && data.length > 0) {
      return data.map((item) => ({
        id: item.id || item._id,
        question: item.question,
        answer: item.answer,
        category: item.category,
      }));
    }
  } catch (error) {
    console.warn('Failed to fetch FAQs from Sanity, falling back to local content:', error);
  }

  return faqList;
}

export async function getContactPageData() {
  const fallback = {
    hero: contactHeroData,
    enquiryCategories,
  };

  try {
    const data = await sanityFetch<any>({
      query: contactPageQuery,
      tags: ['contactPage'],
    });

    if (data) {
      return {
        hero: {
          kicker: data.hero?.kicker || contactHeroData.kicker,
          title: data.hero?.title || contactHeroData.title,
          description: data.hero?.description || contactHeroData.description,
        },
        enquiryCategories: data.enquiryCategories?.length ? data.enquiryCategories : enquiryCategories,
      };
    }
  } catch (error) {
    console.warn('Failed to fetch contactPage from Sanity, falling back to local content:', error);
  }

  return fallback;
}
