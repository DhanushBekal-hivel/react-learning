import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'rsuite';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from './ChartDetail.module.scss';

interface ChartDetailProps {
  open: boolean;
  title: string;
  chartOptions: Highcharts.Options;
  onClose: () => void;
}

const ChartDetail: React.FC<ChartDetailProps> = ({ open, title, chartOptions, onClose }) => {
  // Add a chartComponentRef to properly handle the chart instance
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  
  // Apply additional options for the detailed view
  const detailedOptions: Highcharts.Options = {
    ...chartOptions,
    chart: {
      ...(chartOptions.chart as any),
      height: 500,
      zoomType: 'xy'
    },
    title: {
      text: title,
      style: { fontSize: '20px' }
    },
    credits: { enabled: false },
    exporting: { enabled: true }
  };

  // Ensure chart is properly destroyed when component unmounts
  useEffect(() => {
    return () => {
      const chart = chartComponentRef.current?.chart;
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  return (
    <Modal full open={open} onClose={onClose} className={styles.chartDetailModal}>
      <Modal.Header>
        <Modal.Title>{title} - Detailed View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.chartDetailContainer}>
          <HighchartsReact
            highcharts={Highcharts}
            options={detailedOptions}
            containerProps={{ className: styles.chartDetail }}
            ref={chartComponentRef}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChartDetail;