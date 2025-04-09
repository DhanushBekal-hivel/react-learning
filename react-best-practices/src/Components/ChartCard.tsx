import React, { useEffect, useRef } from 'react';
import { Panel } from 'rsuite';
import Highcharts from 'highcharts';
import styles from './ChartCard.module.scss';

interface ChartCardProps {
  title: string;
  chartOptions: Highcharts.Options;
  onCardClick: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, chartOptions, onCardClick }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Create chart when component mounts
      Highcharts.chart(chartRef.current, chartOptions);
    }
    
    // Clean up chart when component unmounts
    return () => {
      if (chartRef.current) {
        // Use type assertion to avoid the TypeScript error
        const chart = Highcharts.charts.find(c => c && (c as any).renderTo === chartRef.current);
        if (chart) {
          chart.destroy();
        }
      }
    };
  }, [chartOptions]);

  return (
    <Panel 
      className={styles.chartCard} 
      header={title} 
      bordered 
      shaded 
      onClick={onCardClick}
    >
      <div ref={chartRef} className={styles.chartPreview}></div>
    </Panel>
  );
};

export default ChartCard;