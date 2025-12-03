import './MetricCard.css';

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
  color?: string;
}

export function MetricCard({ label, value, unit, color = 'var(--primary-color)' }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value" style={{ color }}>
        {value.toFixed(2)}
        <span className="metric-unit">{unit}</span>
      </div>
    </div>
  );
}
