'use client';

import { useQuery } from '@tanstack/react-query';
import {
  createCategoryData,
  createLocationData,
  createRadarData,
  createScatterData,
  createUserActivityData,
} from '@/lib/analytics-data';

function withDelay<T>(value: T, wait = 350): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), wait);
  });
}

export const analyticsKeys = {
  root: ['analytics'] as const,
  scatter: ['analytics', 'scatter'] as const,
  users: ['analytics', 'users'] as const,
  radar: ['analytics', 'radar'] as const,
  categories: ['analytics', 'categories'] as const,
  locations: ['analytics', 'locations'] as const,
};

export function useScatterDataQuery() {
  return useQuery({
    queryKey: analyticsKeys.scatter,
    queryFn: async () => withDelay(createScatterData()),
  });
}

export function useUserActivityQuery() {
  return useQuery({
    queryKey: analyticsKeys.users,
    queryFn: async () => withDelay(createUserActivityData()),
  });
}

export function useRadarDataQuery() {
  return useQuery({
    queryKey: analyticsKeys.radar,
    queryFn: async () => withDelay(createRadarData()),
  });
}

export function useCategoryDataQuery() {
  return useQuery({
    queryKey: analyticsKeys.categories,
    queryFn: async () => withDelay(createCategoryData()),
  });
}

export function useLocationDataQuery() {
  return useQuery({
    queryKey: analyticsKeys.locations,
    queryFn: async () => withDelay(createLocationData()),
  });
}
