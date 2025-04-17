import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardReducer';
import { RootState } from './types';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // For Highcharts objects
    }),
});

export type AppDispatch = typeof store.dispatch; 