import { DatasetSize } from '../types';

export const DATASET_SIZES: Record<DatasetSize, number> = {
  small: 100,          // 100 points
  medium: 1_000,       // 1K points
  large: 10_000,       // 10K points
} as const;

export const DATASET_SIZE_LABELS: Record<DatasetSize, string> = {
  small: 'Small (100)',
  medium: 'Medium (1K)',
  large: 'Large (10K)',
} as const;

export const CHART_TYPE_LABELS: Record<string, string> = {
  line: 'Line Chart',
  bar: 'Bar Chart'
} as const;
