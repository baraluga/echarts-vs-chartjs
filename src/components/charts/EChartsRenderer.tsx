import { useRef, useEffect, Profiler, ProfilerOnRenderCallback } from 'react';
import { useECharts } from '../../hooks/useECharts';
import { useFPSCounter } from '../../hooks/useFPSCounter';
import { DataPoint, ChartType } from '../../types';
import { getEChartsLineConfig, getEChartsBarConfig } from '../../utils/chartConfigs';
import { FPSMeter } from '../metrics/FPSMeter';
import './ChartRenderer.css';

interface EChartsRendererProps {
  data: DataPoint[];
  chartType: ChartType;
  datasetSize: number;
}

export function EChartsRenderer({ data, chartType, datasetSize }: EChartsRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReady, setOption, getInstance } = useECharts(containerRef);
  const { fps, startTracking, stopTracking } = useFPSCounter();

  // Handle chart rendering
  useEffect(() => {
    if (!isReady) return;

    const instance = getInstance();
    if (!instance) return;

    // Generate chart configuration
    const config = chartType === 'line'
      ? getEChartsLineConfig(data, datasetSize)
      : getEChartsBarConfig(data, datasetSize);

    // Set chart option
    setOption(config, { notMerge: true });

    // Set up interaction listeners for FPS tracking
    const handleMouseEnter = () => startTracking();
    const handleMouseLeave = () => stopTracking();

    const dom = containerRef.current;
    if (dom) {
      dom.addEventListener('mouseenter', handleMouseEnter);
      dom.addEventListener('mouseleave', handleMouseLeave);
      dom.addEventListener('touchstart', handleMouseEnter);
      dom.addEventListener('touchend', handleMouseLeave);
    }

    return () => {
      if (dom) {
        dom.removeEventListener('mouseenter', handleMouseEnter);
        dom.removeEventListener('mouseleave', handleMouseLeave);
        dom.removeEventListener('touchstart', handleMouseEnter);
        dom.removeEventListener('touchend', handleMouseLeave);
      }
      stopTracking();
    };
  }, [data, chartType, datasetSize, isReady, setOption, getInstance, startTracking, stopTracking]);

  // React Profiler callback
  const onRenderCallback: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration
  ) => {
    // Log profiler data for debugging
    if (import.meta.env.DEV) {
      console.log(`[ECharts Profiler] ${id} (${phase}): ${actualDuration.toFixed(2)}ms`);
    }
  };

  return (
    <Profiler id="echarts-renderer" onRender={onRenderCallback}>
      <div className="chart-renderer">
        <FPSMeter fps={fps} />
        <div
          ref={containerRef}
          className="chart-container"
          style={{ touchAction: 'none' }}
        />
      </div>
    </Profiler>
  );
}
