import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChartInfo } from '../Types/Chart';
import { getChartData } from '../Services/ChartData';

// Define the initial state
interface DashboardState {
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

const initialState: DashboardState = {
  isLoading: true,
  selectedChart: null,
  modalOpen: false,
  showTable: false,
  filterOptions: {
    timeRange: 'last30days',
    dataType: 'all',
    category: 'all',
  },
  charts: [
    {
      id: 'sales-trend',
      title: 'Monthly Sales Trend',
      type: 'line',
      description: 'Shows sales performance over the months for current and previous year'
    },
    {
      id: 'quarterly-results',
      title: 'Quarterly Financial Results',
      type: 'column',
      description: 'Financial performance breakdown by quarter'
    },
    {
      id: 'market-share',
      title: 'Product Market Share',
      type: 'pie',
      description: 'Distribution of market share across product categories'
    },
    {
      id: 'traffic-sources',
      title: 'Traffic Sources',
      type: 'area',
      description: 'Traffic attribution by channel over time'
    }
  ],
};

// Create the slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectedChart: (state, action: PayloadAction<ChartInfo | null>) => {
      state.selectedChart = action.payload;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    setShowTable: (state, action: PayloadAction<boolean>) => {
      state.showTable = action.payload;
    },
    updateFilterOptions: (state, action: PayloadAction<Partial<DashboardState['filterOptions']>>) => {
      state.filterOptions = { ...state.filterOptions, ...action.payload };
    },
  },
});

// Export actions
export const { 
  setLoading, 
  setSelectedChart, 
  setModalOpen, 
  setShowTable, 
  updateFilterOptions 
} = dashboardSlice.actions;

// Export reducer
export default dashboardSlice.reducer; 