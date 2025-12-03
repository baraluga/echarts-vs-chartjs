import { useState } from 'react';
import { EChartsRenderer } from './EChartsRenderer';
import { ChartJsRenderer } from './ChartJsRenderer';
import { MetricsDisplay } from '../metrics/MetricsDisplay';
import { DataPoint, MixedDataPoint, ChartType, PerformanceMetrics } from '../../types';
import './ChartComparison.css';

interface ChartComparisonProps {
  data: DataPoint[] | MixedDataPoint[];
  chartType: ChartType;
  datasetSize: number;
}

export function ChartComparison({ data, chartType, datasetSize }: ChartComparisonProps) {
  const [echartsMetrics, setEchartsMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    updateTime: 0,
    fps: 0,
  });

  const [chartjsMetrics, setChartjsMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    updateTime: 0,
    fps: 0,
  });

  return (
    <div className="chart-comparison">
      <div className="chart-wrapper">
        <div className="chart-header">
          <h3 className="chart-title">Apache ECharts</h3>
          <span className="chart-badge echarts-badge">ECharts</span>
        </div>
        <EChartsRenderer
          data={data}
          chartType={chartType}
          datasetSize={datasetSize}
          onMetricsUpdate={setEchartsMetrics}
        />
        <MetricsDisplay metrics={echartsMetrics} libraryName="ECharts" />
      </div>

      <div className="chart-wrapper">
        <div className="chart-header">
          <h3 className="chart-title">Chart.js</h3>
          <span className="chart-badge chartjs-badge">Chart.js</span>
        </div>
        <ChartJsRenderer
          data={data}
          chartType={chartType}
          datasetSize={datasetSize}
          onMetricsUpdate={setChartjsMetrics}
        />
        <MetricsDisplay metrics={chartjsMetrics} libraryName="Chart.js" />
      </div>
    </div>
  );
}
