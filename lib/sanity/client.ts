import { createClient, type QueryParams } from 'next-sanity';
import { projectId, dataset, apiVersion, token } from './config';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = false,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      tags,
      revalidate,
    },
  });
}
