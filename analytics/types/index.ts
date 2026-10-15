export type Category = 'Tech' | 'Finance' | 'AI' | 'Web3';

export interface GistData {
  id: string;
  age: number;
  engagement: number;
  category: Category;
}

export interface LocationTrend {
  location: string;
  values: number[];
}

export interface RadarData {
  label: string;
  values: number[];
}