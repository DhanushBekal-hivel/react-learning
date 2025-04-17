import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/types';
import { updateFilterOptions } from '../store/dashboardReducer';
import styles from './Dashboard.module.scss';

// Map state to props
const mapStateToProps = (state: RootState) => ({
  filterOptions: state.dashboard.filterOptions,
});

// Map dispatch to props
const mapDispatchToProps = {
  updateFilterOptions,
};

// Connect component to Redux
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component props
type FilterControlsProps = PropsFromRedux;

const FilterControls: React.FC<FilterControlsProps> = ({ 
  filterOptions, 
  updateFilterOptions 
}) => {
  // Handle filter change
  const handleFilterChange = (filterType: string, value: string) => {
    updateFilterOptions({ [filterType]: value });
  };

  return (
    <div className={styles.filterControls}>
      <select 
        value={filterOptions.timeRange} 
        onChange={(e) => handleFilterChange('timeRange', e.target.value)}
      >
        <option value="last7days">Last 7 Days</option>
        <option value="last30days">Last 30 Days</option>
        <option value="last90days">Last 90 Days</option>
        <option value="lastYear">Last Year</option>
      </select>
      <select 
        value={filterOptions.dataType} 
        onChange={(e) => handleFilterChange('dataType', e.target.value)}
      >
        <option value="all">All Data</option>
        <option value="sales">Sales Only</option>
        <option value="traffic">Traffic Only</option>
      </select>
      <select 
        value={filterOptions.category} 
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="products">Products</option>
        <option value="services">Services</option>
      </select>
    </div>
  );
};

export default connector(FilterControls); 