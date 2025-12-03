import './FPSMeter.css';

interface FPSMeterProps {
  fps: number;
}

export function FPSMeter({ fps }: FPSMeterProps) {
  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'var(--success-color)';
    if (fps >= 30) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  return (
    <div className="fps-meter">
      <div className="fps-value" style={{ color: getFPSColor(fps) }}>
        {fps}
        <span className="fps-unit">FPS</span>
      </div>
    </div>
  );
}
