import { store } from './store';
import { setLoading } from './store/dashboardReducer';

// Initialize any global state or perform setup tasks
export const initializeApp = () => {
  // Set initial loading state
  store.dispatch(setLoading(true));
  
  // You can add more initialization logic here
  // For example, loading user preferences, fetching initial data, etc.
  
  return store;
}; 