import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import { ChartType } from '../Types/Chart';
import { getChartData } from '../Services/ChartData';

interface ChartProps {
  type: ChartType;
}

const Chart: React.FC<ChartProps> = ({ type }) => {
  const chartContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainer.current) {
      const chartOptions = getChartData(type);
      Highcharts.chart(chartContainer.current, chartOptions);
    }
  }, [type]);

  return <div ref={chartContainer} style={{ height: '400px', width: '100%' }} />;
};

export default Chart; 