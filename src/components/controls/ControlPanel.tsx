import { DatasetSize, ChartType } from '../../types';
import { DatasetSizeSelector } from './DatasetSizeSelector';
import { ChartTypeSelector } from './ChartTypeSelector';
import './ControlPanel.css';

interface ControlPanelProps {
  datasetSize: DatasetSize;
  chartType: ChartType;
  onDatasetSizeChange: (size: DatasetSize) => void;
  onChartTypeChange: (type: ChartType) => void;
}

export function ControlPanel({
  datasetSize,
  chartType,
  onDatasetSizeChange,
  onChartTypeChange,
}: ControlPanelProps) {
  return (
    <div className="control-panel">
      <h3 className="control-panel-title">Configuration</h3>
      <div className="controls-grid">
        <DatasetSizeSelector value={datasetSize} onChange={onDatasetSizeChange} />
        <ChartTypeSelector value={chartType} onChange={onChartTypeChange} />
      </div>
    </div>
  );
}
