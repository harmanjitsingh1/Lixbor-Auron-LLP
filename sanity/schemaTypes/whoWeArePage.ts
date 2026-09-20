import { defineField, defineType } from 'sanity';

export const whoWeArePage = defineType({
  name: 'whoWeArePage',
  title: 'Who We Are Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Internal Reference)',
      type: 'string',
      initialValue: 'Who We Are Content',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Banner',
      type: 'object',
      fields: [
        defineField({ name: 'kicker', title: 'Kicker Badge', type: 'string', initialValue: 'ABOUT LIXBOR AURON LLP' }),
        defineField({ name: 'title', title: 'Banner Title', type: 'string' }),
        defineField({ name: 'description', title: 'Banner Description', type: 'text', rows: 3 }),
        defineField({
          name: 'backgroundImage',
          title: 'Hero Background Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'fallbackImageUrl',
          title: 'Fallback Image URL',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'story',
      title: 'Our Heritage & Story Section',
      type: 'object',
      fields: [
        defineField({ name: 'kicker', title: 'Section Kicker', type: 'string', initialValue: 'OUR HERITAGE' }),
        defineField({ name: 'title', title: 'Section Title', type: 'string' }),
        defineField({ name: 'paragraph1', title: 'Paragraph 1 (Lead/Accent)', type: 'text', rows: 4 }),
        defineField({ name: 'paragraph2', title: 'Paragraph 2', type: 'text', rows: 4 }),
        defineField({ name: 'paragraph3', title: 'Paragraph 3', type: 'text', rows: 4 }),
      ],
    }),
    defineField({
      name: 'coreValues',
      title: 'Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'ID / Key', type: 'string' }),
            defineField({ name: 'title', title: 'Value Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({
              name: 'iconName',
              title: 'Icon Name',
              type: 'string',
              description: 'e.g. ShieldCheck, Clock, Award, Zap, Handshake, TrendingUp',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'iconName' },
          },
        },
      ],
    }),
    defineField({
      name: 'vision',
      title: 'Vision & Strategy Section',
      type: 'object',
      fields: [
        defineField({ name: 'kicker', title: 'Section Kicker', type: 'string', initialValue: 'VISION & STRATEGY' }),
        defineField({ name: 'title', title: 'Section Title', type: 'string' }),
        defineField({ name: 'tagline', title: 'Vision Tagline', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({
          name: 'pillars',
          title: 'Strategic Pillars (1 to 5)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Pillar Title', type: 'string' }),
                defineField({ name: 'description', title: 'Pillar Description', type: 'text', rows: 3 }),
              ],
              preview: {
                select: { title: 'title' },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'milestones',
      title: 'Our Journey Milestones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Year or Period (e.g. 1989, 2026, Future)', type: 'string' }),
            defineField({ name: 'title', title: 'Milestone Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'highlight', title: 'Highlight Card (Featured)', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'year' },
          },
        },
      ],
    }),
    defineField({
      name: 'physicalTradingModel',
      title: 'Physical Trading Model Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Number', type: 'number' }),
            defineField({ name: 'title', title: 'Title (e.g. Buy, Ship, Store)', type: 'string' }),
            defineField({ name: 'action', title: 'Action Subtitle', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'action' },
          },
        },
      ],
    }),
    defineField({
      name: 'sourcingProcess',
      title: '5-Step Sourcing Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Number', type: 'number' }),
            defineField({ name: 'title', title: 'Title (e.g. Understand, Source, Verify)', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
