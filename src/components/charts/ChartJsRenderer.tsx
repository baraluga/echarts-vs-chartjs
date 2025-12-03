import { useRef, useEffect, Profiler, ProfilerOnRenderCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { useFPSCounter } from '../../hooks/useFPSCounter';
import { DataPoint, ChartType } from '../../types';
import { getChartJsLineConfig, getChartJsBarConfig } from '../../utils/chartConfigs';
import { FPSMeter } from '../metrics/FPSMeter';
import './ChartRenderer.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartJsRendererProps {
  data: DataPoint[];
  chartType: ChartType;
  datasetSize: number;
}

export function ChartJsRenderer({ data, chartType, datasetSize }: ChartJsRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { fps, startTracking, stopTracking } = useFPSCounter();

  // Prepare chart data
  // Prepare chart data based on type
  const lineChartData = {
    datasets: [
      {
        label: 'Line Data',
        data: data.map((d) => ({ x: d.x, y: d.y })),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };

  const barChartData = {
    datasets: [
      {
        label: 'Bar Data',
        data: data.map((d) => ({ x: d.x, y: d.y })),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };

  const lineOptions = getChartJsLineConfig(data, datasetSize);
  const barOptions = getChartJsBarConfig(data, datasetSize);

  // Set up interaction listeners for FPS tracking
  useEffect(() => {
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
  }, [startTracking, stopTracking]);

  // React Profiler callback
  const onRenderCallback: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration
  ) => {
    // Log profiler data for debugging
    if (import.meta.env.DEV) {
      console.log(`[Chart.js Profiler] ${id} (${phase}): ${actualDuration.toFixed(2)}ms`);
    }
  };

  return (
    <Profiler id="chartjs-renderer" onRender={onRenderCallback}>
      <div className="chart-renderer" ref={containerRef}>
        <FPSMeter fps={fps} />
        <div className="chart-container" style={{ touchAction: 'none' }}>
          {chartType === 'line' ? (
            <Line data={lineChartData} options={lineOptions} />
          ) : (
            <Bar data={barChartData} options={barOptions} />
          )}
        </div>
      </div>
    </Profiler>
  );
}
