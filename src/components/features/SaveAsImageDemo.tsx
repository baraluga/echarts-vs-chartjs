import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import './FeatureDemo.css';

export function SaveAsImageDemo() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    // Simple bar chart for demonstration
    const option: echarts.EChartsOption = {
      title: {
        text: 'Monthly Sales Data',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: 'Save as Image',
            name: 'echarts-export',
            pixelRatio: 2,
          },
        },
        right: 20,
        top: 10,
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
      yAxis: {
        type: 'value',
        name: 'Sales ($)',
      },
      series: [
        {
          name: 'Revenue',
          type: 'bar',
          data: [12000, 19000, 15000, 23000, 28000, 31000],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 1, color: '#188df0' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
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
          <h4>Save as Image - Built-in Export</h4>
          <p>
            ECharts includes a built-in toolbox feature that allows users to export
            charts as images with a single click. Look for the camera icon in the
            top-right corner of the chart. This is a native feature, no plugins needed!
          </p>
          <ul className="feature-list">
            <li>One-click image export</li>
            <li>High-resolution output (2x pixel ratio)</li>
            <li>PNG format with transparent background</li>
            <li>No external libraries required</li>
            <li>Chart.js requires custom implementation</li>
          </ul>
        </div>
        <div ref={chartRef} className="feature-chart" />
      </div>
    </div>
  );
}
