import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    name,
    legalName,
    tagline,
    subTagline,
    incorporatedYear,
    foundationYear,
    country,
    journeyTagline,
    visionTagline,
    placeholders,
    mainNavLinks,
    footerLegalLinks
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    title,
    heroSlides[] {
      number,
      kicker,
      headlineTitle,
      subtitle,
      buttonText,
      buttonLink,
      image,
      fallbackImage
    },
    essenceSection {
      kicker,
      title,
      paragraph1,
      paragraph2,
      rowLinks[] {
        title,
        href
      }
    },
    valueCards[] {
      kicker,
      title,
      link,
      image,
      fallbackImage
    },
    peopleSection {
      kicker,
      title,
      paragraph1,
      paragraph2
    },
    ctaSection {
      title,
      description,
      buttonText,
      buttonHref
    }
  }
`;

export const whoWeArePageQuery = groq`
  *[_type == "whoWeArePage"][0] {
    title,
    hero {
      kicker,
      title,
      description,
      backgroundImage,
      fallbackImageUrl
    },
    story {
      kicker,
      title,
      paragraph1,
      paragraph2,
      paragraph3
    },
    coreValues[] {
      id,
      title,
      description,
      iconName
    },
    vision {
      kicker,
      title,
      tagline,
      description,
      pillars[] {
        title,
        description
      }
    },
    milestones[] {
      year,
      title,
      description,
      highlight
    },
    physicalTradingModel[] {
      step,
      title,
      action,
      description
    },
    sourcingProcess[] {
      step,
      title,
      description
    }
  }
`;

export const productsQuery = groq`
  *[_type == "product"] | order(order asc, name asc) {
    _id,
    name,
    "id": coalesce(slug.current, _id),
    category,
    order,
    isFlagship,
    shortDescription,
    fullDescription,
    image,
    fallbackImageUrl,
    keyApplications,
    specifications,
    grades[] {
      name,
      code,
      description,
      applications
    }
  }
`;

export const faqItemsQuery = groq`
  *[_type == "faqItem"] | order(order asc, _createdAt asc) {
    "id": _id,
    question,
    answer,
    category,
    order
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    title,
    hero {
      kicker,
      title,
      description
    },
    enquiryCategories[] {
      value,
      label
    }
  }
`;
