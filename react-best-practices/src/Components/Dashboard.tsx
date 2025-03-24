import React, { useState } from 'react';
import { Container, Header, Content, Grid, Row, Col } from 'rsuite';
import UserList from './UserList';
import ChartCard from './ChartCard';
import ChartDetail from './ChartDetail';
import { getChartData } from '../Services/ChartData';
import { ChartInfo } from '../Types/Chart';
import './Dashboard.module.scss';

// Import Highcharts modules
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';

// Initialize Highcharts modules
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

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
  const [selectedChart, setSelectedChart] = useState<ChartInfo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChartClick = (chart: ChartInfo) => {
    setSelectedChart(chart);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Container className="dashboard-container">
      <Header className="dashboard-header">
        <h1>Analytics Dashboard</h1>
      </Header>
      <Content className="dashboard-content">
        <Grid fluid>
          <Row className="mb-4">
            <Col xs={24}>
              <h2>Key Metrics</h2>
            </Col>
          </Row>
          <Row className="chart-grid">
            {availableCharts.map((chart) => (
              <Col xs={24} sm={12} lg={6} key={chart.id} className="chart-grid-item">
                <ChartCard 
                  title={chart.title} 
                  chartOptions={getChartData(chart.type)}
                  onCardClick={() => handleChartClick(chart)} 
                />
              </Col>
            ))}
          </Row>
          <Row className="mt-4">
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