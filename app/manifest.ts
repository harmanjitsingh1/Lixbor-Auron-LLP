import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lixbor Auron LLP — Global Commodities & Industrial Trading',
    short_name: 'Lixbor Auron',
    description:
      'Premier international commodities trading house connecting markets with Magnesium Oxide (MgO), fertilizers, chemicals, and polymers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070e17',
    theme_color: '#070e17',
    icons: [
      {
        src: '/logo/logo-svg.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/images/logo/logo-png.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
