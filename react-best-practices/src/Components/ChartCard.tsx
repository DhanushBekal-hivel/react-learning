import React, { useEffect, useRef } from 'react';
import { Panel } from 'rsuite';
import Highcharts from 'highcharts';
import styles from './ChartCard.module.scss';

interface ChartCardProps {
  title: string;
  description: string;
  chartOptions: Highcharts.Options;
  onCardClick: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, description, chartOptions, onCardClick }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: Highcharts.Chart | undefined;
    const currentChartRef = chartRef.current;
    
    if (currentChartRef) {
      chart = Highcharts.chart(currentChartRef, chartOptions);
    }
    
    return () => {
      if (chart) {
        chart.destroy();
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
      <p style={{ marginTop: '10px' }}>{description}</p>
    </Panel>
  );
};

export default ChartCard;