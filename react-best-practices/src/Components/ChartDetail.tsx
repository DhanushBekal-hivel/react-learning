import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'rsuite';
import Highcharts from 'highcharts';
import styles from './ChartDetail.module.scss';

interface ChartDetailProps {
  open: boolean;
  title: string;
  chartOptions: Highcharts.Options;
  onClose: () => void;
}

const ChartDetail: React.FC<ChartDetailProps> = ({ open, title, chartOptions, onClose }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let chart: Highcharts.Chart | undefined;
    // Store current ref value to use in cleanup
    const currentChartRef = chartRef.current;
    
    // Create chart when component is mounted and visible
    if (open && currentChartRef) {
      // Prepare detailed options
      const detailedOptions: Highcharts.Options = {
        ...chartOptions,
        chart: {
          ...(chartOptions.chart as any),
          height: 500,
          zoomType: 'xy',
          renderTo: currentChartRef
        },
        title: {
          text: title,
          style: { fontSize: '20px' }
        },
        legend: {
          enabled: true,
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          itemStyle: {
            fontSize: '14px'
          }
        },
        tooltip: {
          shared: true,
          borderWidth: 1,
          padding: 10,
          headerFormat: '<span style="font-size: 14px">{point.key}</span><br/>'
        },
        plotOptions: {
          ...(chartOptions.plotOptions as any),
          series: {
            ...(chartOptions.plotOptions?.series as any),
            animation: {
              duration: 1000
            },
            dataLabels: {
              enabled: (chartOptions.chart?.type === 'pie')
            }
          }
        },
        credits: { enabled: false },
        exporting: { enabled: true }
      };
      
      // Create the chart
      chart = Highcharts.chart(detailedOptions);
    }
    
    // Clean up function to destroy chart when component unmounts
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [open, chartOptions, title]);

  return (
    <Modal full open={open} onClose={onClose} className={styles.chartDetailModal}>
      <Modal.Header>
        <Modal.Title>{title} - Detailed View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.chartDetailContainer}>
          <div 
            ref={chartRef} 
            className={styles.chartDetail}
          ></div>
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