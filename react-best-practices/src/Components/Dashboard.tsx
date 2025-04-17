import React, { useEffect, Suspense, lazy } from 'react';
import { Container, Header, Content, Grid, Row, Col } from 'rsuite';
import { connect, ConnectedProps } from 'react-redux';
import { getChartData } from '../Services/ChartData';
import { ChartInfo } from '../Types/Chart';
import styles from './Dashboard.module.scss';
import Highcharts from 'highcharts';
import { RootState } from '../store/types';
import { 
  setLoading, 
  setSelectedChart, 
  setModalOpen, 
  setShowTable
} from '../store/dashboardReducer';
import FilterControls from './FilterControls';

// Lazy load components
const ChartCard = lazy(() => import('./ChartCard'));
const ChartDetail = lazy(() => import('./ChartDetail'));

// Loading fallback component
const LoadingFallback = () => (
  <div className={styles.loadingContainer}>
    <span>Loading chart...</span>
  </div>
);

// Map state to props
const mapStateToProps = (state: RootState) => ({
  isLoading: state.dashboard.isLoading,
  selectedChart: state.dashboard.selectedChart,
  modalOpen: state.dashboard.modalOpen,
  showTable: state.dashboard.showTable,
  charts: state.dashboard.charts,
});

// Map dispatch to props
const mapDispatchToProps = {
  setLoading,
  setSelectedChart,
  setModalOpen,
  setShowTable,
};

// Connect component to Redux
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component props
type DashboardProps = PropsFromRedux;

const Dashboard: React.FC<DashboardProps> = ({
  isLoading,
  selectedChart,
  modalOpen,
  showTable,
  charts,
  setLoading,
  setSelectedChart,
  setModalOpen,
  setShowTable,
}) => {
  // Load Highcharts modules
  useEffect(() => {
    const loadHighchartsModules = async () => {
      try {
        const [highchartsMore, exporting, exportData] = await Promise.all([
          import('highcharts/highcharts-more'),
          import('highcharts/modules/exporting'),
          import('highcharts/modules/export-data')
        ]);
        
        highchartsMore.default(Highcharts);
        exporting.default(Highcharts);
        exportData.default(Highcharts);
      } catch (error) {
        console.error('Failed to load Highcharts modules:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadHighchartsModules();
  }, [setLoading]);

  // Handle chart click
  const handleChartClick = (chart: ChartInfo) => {
    setSelectedChart(chart);
    setModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedChart(null);
  };

  // Memoize the chart grid to prevent unnecessary re-renders
  const ChartGrid = React.memo(() => (
    <Row className={styles.chartGrid}>
      {charts.map((chart) => (
        <Col xs={24} sm={24} md={12} lg={12} key={chart.id} className={styles.chartGridItem}>
          <Suspense fallback={<LoadingFallback />}>
            <ChartCard 
              title={chart.title} 
              description={chart.description}
              chartOptions={getChartData(chart.type).chartOptions}
              onCardClick={() => handleChartClick(chart)} 
            />
          </Suspense>
        </Col>
      ))}
    </Row>
  ));

  return (
    <Container className={styles.dashboardContainer}>
      <Header className={styles.dashboardHeader}>
        <h1>Analytics Dashboard</h1>
        <FilterControls />
      </Header>
      <Content className={styles.dashboardContent}>
        <Grid fluid>
          <Row className={styles.mb4}>
            <Col xs={24}>
              <h2>Key Metrics</h2>
            </Col>
          </Row>
          {!isLoading && <ChartGrid />}
        </Grid>
      </Content>

      {selectedChart && (
        <Suspense fallback={<LoadingFallback />}>
          <ChartDetail
            open={modalOpen}
            title={selectedChart.title}
            description={selectedChart.description}
            chartOptions={getChartData(selectedChart.type).chartOptions}
            onClose={handleCloseModal}
            showTable={showTable}
            setShowTable={setShowTable}
            tableData={getChartData(selectedChart.type).tableData}
          />
        </Suspense>
      )}
    </Container>
  );
};

// Export connected component
export default connector(Dashboard);