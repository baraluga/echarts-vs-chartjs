import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { generateData } from '../../utils/dataGenerator';
import './FeatureDemo.css';

export function DataZoomDemo() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    const data = generateData(10000);

    const option: echarts.EChartsOption = {
      title: {
        text: 'Interactive DataZoom',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '20%',
      },
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value',
      },
      dataZoom: [
        {
          type: 'slider',
          start: 0,
          end: 20,
          handleSize: '80%',
        },
        {
          type: 'inside',
          start: 0,
          end: 20,
        },
      ],
      series: [
        {
          name: 'Data',
          type: 'line',
          data: data.map((d) => [d.x, d.y]),
          symbol: 'none',
          sampling: 'lttb',
          lineStyle: {
            width: 2,
          },
          areaStyle: {
            opacity: 0.3,
          },
        },
      ],
    };

    chart.setOption(option);

    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, []);

  return (
    <div className="feature-demo">
      <div className="feature-content">
        <div className="feature-info">
          <h4>DataZoom - Interactive Data Exploration</h4>
          <p>
            ECharts DataZoom allows users to zoom and pan through large datasets
            interactively. Use the slider below the chart or scroll/pinch to zoom.
            This feature is not available in Chart.js by default.
          </p>
          <ul className="feature-list">
            <li>Slider zoom control</li>
            <li>Mouse wheel / touchpad zoom</li>
            <li>Touch pinch to zoom on mobile</li>
            <li>Pan by dragging</li>
          </ul>
        </div>
        <div ref={chartRef} className="feature-chart" />
      </div>
    </div>
  );
}
