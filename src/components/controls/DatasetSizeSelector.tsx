import { DatasetSize } from '../../types';
import { DATASET_SIZE_LABELS } from '../../utils/constants';
import './DatasetSizeSelector.css';

interface DatasetSizeSelectorProps {
  value: DatasetSize;
  onChange: (size: DatasetSize) => void;
}

export function DatasetSizeSelector({ value, onChange }: DatasetSizeSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as DatasetSize);
  };

  return (
    <div className="dataset-size-selector">
      <label htmlFor="dataset-size">Dataset Size</label>
      <select
        id="dataset-size"
        value={value}
        onChange={handleChange}
        className="selector"
      >
        {Object.entries(DATASET_SIZE_LABELS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
