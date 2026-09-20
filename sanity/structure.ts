import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings & Company Info')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      S.divider(),
      S.listItem()
        .title('Homepage')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Homepage')
        ),
      S.listItem()
        .title('Who We Are Page')
        .id('whoWeArePage')
        .child(
          S.document()
            .schemaType('whoWeArePage')
            .documentId('whoWeArePage')
            .title('Who We Are')
        ),
      S.listItem()
        .title('Contact Page')
        .id('contactPage')
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
            .title('Contact Page')
        ),
      S.divider(),
      S.documentTypeListItem('product').title('Products & Commodities'),
      S.documentTypeListItem('faqItem').title('FAQ Items'),
    ]);
