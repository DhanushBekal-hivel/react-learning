import { useState, useCallback } from 'react';
import { ChartInfo } from '../Types/Chart';

export const useChartManager = () => {
  const [selectedChart, setSelectedChart] = useState<ChartInfo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleChartClick = useCallback((chart: ChartInfo) => {
    setSelectedChart(chart);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedChart(null);
  }, []);

  return {
    selectedChart,
    modalOpen,
    showTable,
    setShowTable,
    handleChartClick,
    handleCloseModal,
  };
}; 