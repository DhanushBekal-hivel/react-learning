export type ChartType = 'line' | 'column' | 'pie' | 'area' | 'gauge' | 'scatter';

export interface ChartInfo {
  id: string;
  title: string;
  type: ChartType;
  description: string;
}