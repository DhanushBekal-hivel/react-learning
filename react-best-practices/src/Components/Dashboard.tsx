import React, { useState, useEffect } from 'react';
import { Container, Header, Content, Grid, Row, Col } from 'rsuite';
import UserList from './UserList';
import ChartCard from './ChartCard';
import ChartDetail from './ChartDetail';
import { getChartData } from '../Services/ChartData';
import { ChartInfo } from '../Types/Chart';
import styles from './Dashboard.module.scss';

// Import only the base Highcharts
import Highcharts from 'highcharts';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Define available charts
const availableCharts: ChartInfo[] = [
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
];

const Dashboard: React.FC = () => {
  const [chartsModulesLoaded, setChartsModulesLoaded] = useState(false);
  const [selectedChart, setSelectedChart] = useState<ChartInfo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Load Highcharts modules
  useEffect(() => {
    // Use dynamic imports for Highcharts modules
    const loadHighchartsModules = async () => {
      try {
        const highchartsMore = await import('highcharts/highcharts-more');
        const exporting = await import('highcharts/modules/exporting');
        const exportData = await import('highcharts/modules/export-data');
        
        highchartsMore.default(Highcharts);
        exporting.default(Highcharts);
        exportData.default(Highcharts);
        
        setChartsModulesLoaded(true);
      } catch (error) {
        console.error('Failed to load Highcharts modules:', error);
      }
    };
    
    loadHighchartsModules();
  }, []);

  const handleChartClick = (chart: ChartInfo) => {
    setSelectedChart(chart);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Container className={styles.dashboardContainer}>
      <Header className={styles.dashboardHeader}>
        <h1>Analytics Dashboard</h1>
      </Header>
      <Content className={styles.dashboardContent}>
        <Grid fluid>
          <Row className={styles.mb4}>
            <Col xs={24}>
              <h2>Key Metrics</h2>
            </Col>
          </Row>
          <Row className={styles.chartGrid}>
            {availableCharts.map((chart) => (
              <Col xs={24} sm={12} lg={6} key={chart.id} className={styles.chartGridItem}>
                <ChartCard 
                  title={chart.title} 
                  chartOptions={getChartData(chart.type)}
                  onCardClick={() => handleChartClick(chart)} 
                />
              </Col>
            ))}
          </Row>
          <Row className={styles.mt4}>
            <Col xs={24}>
              <h2>Active Users</h2>
              <UserList users={users} />
            </Col>
          </Row>
        </Grid>
      </Content>

      {selectedChart && (
        <ChartDetail
          open={modalOpen}
          title={selectedChart.title}
          chartOptions={getChartData(selectedChart.type)}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default Dashboard;