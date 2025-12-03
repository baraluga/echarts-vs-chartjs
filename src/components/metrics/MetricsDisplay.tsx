import { PerformanceMetrics } from '../../types';
import { MetricCard } from './MetricCard';
import './MetricsDisplay.css';

interface MetricsDisplayProps {
  metrics: PerformanceMetrics;
  libraryName: string;
}

export function MetricsDisplay({ metrics, libraryName }: MetricsDisplayProps) {
  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'var(--success-color)';
    if (fps >= 30) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  const getRenderTimeColor = (time: number) => {
    if (time < 100) return 'var(--success-color)';
    if (time < 500) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  return (
    <div className="metrics-display">
      <h4 className="metrics-title">{libraryName} Performance</h4>
      <div className="metrics-grid">
        <MetricCard
          label="Render Time"
          value={metrics.renderTime}
          unit="ms"
          color={getRenderTimeColor(metrics.renderTime)}
        />
        <MetricCard
          label="Update Time"
          value={metrics.updateTime}
          unit="ms"
          color={getRenderTimeColor(metrics.updateTime)}
        />
        <MetricCard
          label="FPS"
          value={metrics.fps}
          unit="fps"
          color={getFPSColor(metrics.fps)}
        />
      </div>
    </div>
  );
}
