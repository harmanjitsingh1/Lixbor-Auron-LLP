import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Internal Reference)',
      type: 'string',
      initialValue: 'Homepage Content',
    }),
    defineField({
      name: 'heroSlides',
      title: 'Hero Carousel Slides',
      type: 'array',
      description: 'Fullscreen background carousel slides on the homepage.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Slide Number (e.g. 01)', type: 'string' }),
            defineField({ name: 'kicker', title: 'Top Kicker (e.g. GLOBAL ALLIANCES)', type: 'string' }),
            defineField({ name: 'headlineTitle', title: 'Headline', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Subtitle Description', type: 'text', rows: 3 }),
            defineField({ name: 'buttonText', title: 'CTA Button Text', type: 'string' }),
            defineField({ name: 'buttonLink', title: 'CTA Button Link', type: 'string' }),
            defineField({
              name: 'image',
              title: 'Slide Background Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'fallbackImage',
              title: 'Fallback Image URL (optional if uploading image asset above)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'headlineTitle',
              subtitle: 'kicker',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'essenceSection',
      title: 'Essence of Who We Are Section',
      type: 'object',
      fields: [
        defineField({ name: 'kicker', title: 'Section Kicker', type: 'string', initialValue: 'DISCOVER LIXBOR AURON' }),
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'The Essence of Who We Are' }),
        defineField({ name: 'paragraph1', title: 'Primary Paragraph', type: 'text', rows: 4 }),
        defineField({ name: 'paragraph2', title: 'Secondary Paragraph', type: 'text', rows: 4 }),
        defineField({
          name: 'rowLinks',
          title: 'Navigation Row Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Link Label', type: 'string' }),
                defineField({ name: 'href', title: 'Target URL', type: 'string' }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'href' },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'valueCards',
      title: 'Value Proposition Cards (Driving Value Across Markets)',
      type: 'array',
      description: 'The 4 tall visual cards highlighting key market capabilities.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'kicker', title: 'Card Kicker (e.g. CHEMICALS & FERTILIZERS)', type: 'string' }),
            defineField({ name: 'title', title: 'Card Title / Description', type: 'text', rows: 3 }),
            defineField({ name: 'link', title: 'Destination Link', type: 'string' }),
            defineField({
              name: 'image',
              title: 'Card Background Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'fallbackImage',
              title: 'Fallback Image Path / URL',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'kicker',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'peopleSection',
      title: 'Our People & Heritage Section',
      type: 'object',
      fields: [
        defineField({ name: 'kicker', title: 'Section Kicker', type: 'string', initialValue: 'OUR TEAM' }),
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Our People & Heritage' }),
        defineField({ name: 'paragraph1', title: 'Lead Paragraph (Bold / Accent)', type: 'text', rows: 3 }),
        defineField({ name: 'paragraph2', title: 'Secondary Paragraph', type: 'text', rows: 4 }),
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'Call To Action Banner',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
        defineField({ name: 'buttonHref', title: 'Button Link', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
