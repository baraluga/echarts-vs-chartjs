import { ChartType } from '../../types';
import { CHART_TYPE_LABELS } from '../../utils/constants';
import './ChartTypeSelector.css';

interface ChartTypeSelectorProps {
  value: ChartType;
  onChange: (type: ChartType) => void;
}

export function ChartTypeSelector({ value, onChange }: ChartTypeSelectorProps) {
  const handleChange = (type: ChartType) => {
    onChange(type);
  };

  return (
    <div className="chart-type-selector">
      <label>Chart Type</label>
      <div className="toggle-group">
        <button
          type="button"
          className={`toggle-button ${value === 'line' ? 'active' : ''}`}
          onClick={() => handleChange('line')}
        >
          {CHART_TYPE_LABELS.line}
        </button>
        <button
          type="button"
          className={`toggle-button ${value === 'bar' ? 'active' : ''}`}
          onClick={() => handleChange('bar')}
        >
          {CHART_TYPE_LABELS.bar}
        </button>
      </div>
    </div>
  );
}
