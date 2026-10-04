export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || '3cyxeuj4';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';

// Sanity API version: use today's date or the date you last updated this.
// This tells Sanity which version of its API behaviour to use.
// Safe to update to a newer date at any time — it won't break anything.
export const apiVersion = '2026-10-04';

export const token =
  process.env.SANITY_API_WRITE_TOKEN?.trim() ||
  process.env.SANITY_API_READ_TOKEN?.trim();
