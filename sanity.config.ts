import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || '3cyxeuj4';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';

export default defineConfig({
  basePath: '/studio',
  name: 'lixbor-auron-studio',
  title: 'Lixbor Auron LLP Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
