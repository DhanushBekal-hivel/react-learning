import { ChartInfo } from '../Types/Chart';

export interface DashboardState {
  isLoading: boolean;
  selectedChart: ChartInfo | null;
  modalOpen: boolean;
  showTable: boolean;
  filterOptions: {
    timeRange: string;
    dataType: string;
    category: string;
  };
  charts: ChartInfo[];
}

export interface RootState {
  dashboard: DashboardState;
} 