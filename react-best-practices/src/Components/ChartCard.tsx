import React from 'react';
import { Panel } from 'rsuite';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './ChartCard.module.scss';

interface ChartCardProps {
  title: string;
  chartOptions: Highcharts.Options;
  onCardClick: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, chartOptions, onCardClick }) => {
  return (
    <Panel 
      className="chart-card" 
      header={title} 
      bordered 
      shaded 
      onClick={onCardClick}
    >
      <div className="chart-preview">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    </Panel>
  );
};

export default ChartCard;