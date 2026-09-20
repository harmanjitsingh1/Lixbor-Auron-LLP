import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Internal Reference)',
      type: 'string',
      initialValue: 'Contact Page Content',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Banner',
      type: 'object',
      fields: [
        defineField({ name: 'kicker', title: 'Kicker Badge', type: 'string', initialValue: 'COMMERCIAL ENQUIRIES' }),
        defineField({ name: 'title', title: 'Banner Title', type: 'string', initialValue: 'Speak to Our Trading Desk' }),
        defineField({ name: 'description', title: 'Banner Description', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'enquiryCategories',
      title: 'Inquiry Categories (Dropdown Options)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Category Value / Key', type: 'string' }),
            defineField({ name: 'label', title: 'Display Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
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
