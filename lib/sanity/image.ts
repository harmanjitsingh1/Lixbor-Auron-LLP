import { createImageUrlBuilder } from '@sanity/image-url';
import { projectId, dataset } from './config';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || 'production',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any): string {
  if (!source) return '';
  if (typeof source === 'string') return source;
  if (source.asset?._ref || source.asset?._id || source._ref) {
    return imageBuilder.image(source).auto('format').fit('max').url();
  }
  if (source.fallbackImage || source.fallbackImageUrl) {
    return source.fallbackImage || source.fallbackImageUrl;
  }
  return '';
}
