import React, { useState, useEffect } from 'react';
import { Container, Header, Content, Grid, Row, Col} from 'rsuite';
import ChartCard from './ChartCard';
import ChartDetail from './ChartDetail';
import { getChartData } from '../Services/ChartData';
import { ChartInfo } from '../Types/Chart';
import styles from './Dashboard.module.scss';

import Highcharts from 'highcharts';
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

// Add this near your other interfaces/types
interface ChartData {
  data: any[]; // Replace 'any' with your specific data structure
  columns: {
    key: string;
    label: string;
  }[];
}

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState<ChartInfo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

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
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load Highcharts modules:', error);
        setIsLoading(false);
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
            {!isLoading && availableCharts.map((chart) => (
              <Col xs={24} sm={24} md={12} lg={12} key={chart.id} className={styles.chartGridItem}>
                <ChartCard 
                  title={chart.title} 
                  chartOptions={getChartData(chart.type).chartOptions}
                  onCardClick={() => handleChartClick(chart)} 
                />
              </Col>
            ))}
          </Row>
        </Grid>
      </Content>

      {selectedChart && (
        <ChartDetail
          open={modalOpen}
          title={selectedChart.title}
          chartOptions={getChartData(selectedChart.type).chartOptions}
          onClose={handleCloseModal}
          showTable={showTable}
          setShowTable={setShowTable}
          tableData={getChartData(selectedChart.type).tableData}
        />
      )}
    </Container>
  );
};

export default Dashboard;