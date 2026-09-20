import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Products & Commodities',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / Identifier',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'string',
      options: {
        list: [
          { title: 'Chemicals & Fertilizers', value: 'Chemicals & Fertilizers' },
          { title: 'Polymers', value: 'Polymers' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to sort products on the catalog page.',
      initialValue: 10,
    }),
    defineField({
      name: 'isFlagship',
      title: 'Flagship Core Product (e.g. Magnesium Oxide)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'fallbackImageUrl',
      title: 'Fallback Image URL',
      type: 'string',
    }),
    defineField({
      name: 'keyApplications',
      title: 'Key Applications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specifications',
      title: 'Technical Specifications & Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'grades',
      title: 'Specialized Product Grades (e.g. for MgO)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Grade Name', type: 'string' }),
            defineField({ name: 'code', title: 'Grade Code (e.g. MgO-AGRI)', type: 'string' }),
            defineField({ name: 'description', title: 'Grade Description', type: 'text', rows: 2 }),
            defineField({
              name: 'applications',
              title: 'Applications',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'code',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
