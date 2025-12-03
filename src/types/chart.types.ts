export interface DataPoint {
  x: number;
  y: number;
  label?: string;
}

export type DatasetSize = 'small' | 'medium' | 'large';
export type ChartType = 'line' | 'bar';
export type ChartLibrary = 'echarts' | 'chartjs';

export interface ChartData {
  datasetSize: DatasetSize;
  chartType: ChartType;
  points: DataPoint[];
}
