export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || '3cyxeuj4';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';
export const apiVersion = '2024-03-01';
export const token = process.env.SANITY_API_READ_TOKEN?.trim();
