import React from 'react';
import { Modal, Button } from 'rsuite';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './ChartDetail.module.scss';

interface ChartDetailProps {
  open: boolean;
  title: string;
  chartOptions: Highcharts.Options;
  onClose: () => void;
}

const ChartDetail: React.FC<ChartDetailProps> = ({ open, title, chartOptions, onClose }) => {
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

  return (
    <Modal full open={open} onClose={onClose} className="chart-detail-modal">
      <Modal.Header>
        <Modal.Title>{title} - Detailed View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="chart-detail-container">
          <HighchartsReact
            highcharts={Highcharts}
            options={detailedOptions}
            containerProps={{ className: 'chart-detail' }}
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