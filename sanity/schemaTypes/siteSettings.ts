import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Company Info',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'legalName',
      title: 'Legal Registered Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Company Tagline',
      type: 'string',
    }),
    defineField({
      name: 'subTagline',
      title: 'Sub Tagline',
      type: 'string',
    }),
    defineField({
      name: 'incorporatedYear',
      title: 'Incorporation Year',
      type: 'string',
    }),
    defineField({
      name: 'foundationYear',
      title: 'Foundation Year',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country of Origin',
      type: 'string',
    }),
    defineField({
      name: 'journeyTagline',
      title: 'Journey Tagline',
      type: 'string',
    }),
    defineField({
      name: 'visionTagline',
      title: 'Vision Tagline',
      type: 'string',
    }),
    defineField({
      name: 'placeholders',
      title: 'Official Corporate Details',
      type: 'object',
      fields: [
        defineField({
          name: 'registeredOffice',
          title: 'Registered Office Address',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'llpin',
          title: 'LLPIN',
          type: 'string',
        }),
        defineField({
          name: 'pan',
          title: 'PAN',
          type: 'string',
        }),
        defineField({
          name: 'tan',
          title: 'TAN',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Official Email',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          title: 'Official Phone',
          type: 'string',
        }),
        defineField({
          name: 'website',
          title: 'Official Website URL',
          type: 'string',
        }),
        defineField({
          name: 'iec',
          title: 'Import Export Code (IEC)',
          type: 'string',
        }),
        defineField({
          name: 'gstin',
          title: 'GSTIN',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'mainNavLinks',
      title: 'Main Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Target Path / URL', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'footerLegalLinks',
      title: 'Footer Legal Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Target Path / URL', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'href' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'legalName',
    },
  },
});
