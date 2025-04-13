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
    </Panel>
  );
};

export default ChartCard;