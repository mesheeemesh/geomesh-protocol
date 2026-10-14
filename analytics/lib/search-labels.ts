import type { SearchResultType } from '@/lib/search';

export const TYPE_LABELS: Record<SearchResultType, string> = {
  page: 'Pages',
  metric: 'Metrics',
  location: 'Locations',
  category: 'Categories',
};

export const ORDERED_TYPES: SearchResultType[] = ['page', 'metric', 'location', 'category'];
