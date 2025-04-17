import React, { useEffect, useRef } from 'react';
import { Modal, Button, Toggle, Table } from 'rsuite';
import Highcharts from 'highcharts';
import styles from './ChartDetail.module.scss';

interface ChartDetailProps {
  open: boolean;
  title: string;
  description: string;
  chartOptions: Highcharts.Options;
  onClose: () => void;
  showTable: boolean;
  setShowTable: (show: boolean) => void;
  tableData: {
    data: any[];
    columns: {
      key: string;
      label: string;
    }[];
  };
}

const ChartDetail: React.FC<ChartDetailProps> = ({ open, title, description, chartOptions, onClose, showTable, setShowTable, tableData }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    let chart: Highcharts.Chart | undefined;
    const currentChartRef = chartRef.current;

    if (open && currentChartRef && !showTable) {
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
      
      chart = Highcharts.chart(detailedOptions);
    }
    
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [open, chartOptions, title, showTable]);

  return (
    <Modal full open={open} onClose={onClose} className={styles.chartDetailModal}>
      <Modal.Header>
        <Modal.Title>{title} - Detailed View</Modal.Title>
        <Toggle 
          checked={showTable}
          onChange={setShowTable}
          checkedChildren="Table"
          unCheckedChildren="Chart"
        />
      </Modal.Header>
      <Modal.Body>
        <div className={styles.chartDetailContainer}>
          {showTable ? (
            <Table
              height={500}
              data={tableData.data}
              bordered
              cellBordered
            >
              {tableData.columns.map(column => (
                <Table.Column key={column.key} flexGrow={1}>
                  <Table.HeaderCell>{column.label}</Table.HeaderCell>
                  <Table.Cell dataKey={column.key} />
                </Table.Column>
              ))}
            </Table>
          ) : (
            <div 
              ref={chartRef} 
              className={styles.chartDetail}
            ></div>
          )}
        </div>
        <p style={{ marginTop: '10px' }}>{description}</p>
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