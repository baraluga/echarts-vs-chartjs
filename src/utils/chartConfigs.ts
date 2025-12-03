import type { EChartsOption } from 'echarts';
import type { ChartOptions } from 'chart.js';
import { DataPoint } from '../types';

/**
 * Generate ECharts configuration for line chart
 */
export function getEChartsLineConfig(data: DataPoint[], datasetSize: number): EChartsOption {
  const shouldOptimize = datasetSize >= 100_000;

  return {
    animation: !shouldOptimize, // Disable animation for large datasets
    grid: {
      left: '10%',
      right: '5%',
      top: '10%',
      bottom: '15%',
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '10%'],
    },
    series: [
      {
        type: 'line',
        data: data.map((d) => [d.x, d.y]),
        symbol: shouldOptimize ? 'none' : 'circle', // No symbols for large datasets
        symbolSize: 4,
        sampling: shouldOptimize ? 'lttb' : undefined, // Enable sampling for large datasets
        lineStyle: {
          width: shouldOptimize ? 1 : 2,
        },
        emphasis: {
          disabled: shouldOptimize,
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
        throttle: 50,
      },
    ],
  };
}

/**
 * Generate ECharts configuration for bar chart
 */
export function getEChartsBarConfig(data: DataPoint[], datasetSize: number): EChartsOption {
  const shouldOptimize = datasetSize >= 10_000;

  return {
    animation: !shouldOptimize,
    grid: {
      left: '10%',
      right: '5%',
      top: '10%',
      bottom: '15%',
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '10%'],
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => [d.x, d.y]),
        barWidth: shouldOptimize ? 2 : undefined,
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
        throttle: 50,
      },
    ],
  };
}

/**
 * Generate Chart.js configuration for line chart
 */
export function getChartJsLineConfig(_data: DataPoint[], datasetSize: number): ChartOptions<'line'> {
  const shouldOptimize = datasetSize >= 100_000;

  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: shouldOptimize ? false : undefined,
    elements: {
      point: {
        radius: shouldOptimize ? 0 : 3,
        hitRadius: shouldOptimize ? 0 : 5,
      },
      line: {
        borderWidth: shouldOptimize ? 1 : 2,
      },
    },
    plugins: {
      decimation: {
        enabled: shouldOptimize,
        algorithm: 'lttb',
        samples: 500,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: !shouldOptimize,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };
}

/**
 * Generate Chart.js configuration for bar chart
 */
export function getChartJsBarConfig(_data: DataPoint[], datasetSize: number): ChartOptions<'bar'> {
  const shouldOptimize = datasetSize >= 10_000;

  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: shouldOptimize ? false : undefined,
    plugins: {
      decimation: {
        enabled: shouldOptimize,
        algorithm: 'lttb',
        samples: 500,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: !shouldOptimize,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };
}
