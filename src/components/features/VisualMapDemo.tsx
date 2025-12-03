import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { generateData } from '../../utils/dataGenerator';
import './FeatureDemo.css';

export function VisualMapDemo() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    const data = generateData(5000);

    const option: echarts.EChartsOption = {
      title: {
        text: 'Visual Map - Data-Driven Styling',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      visualMap: {
        top: 50,
        right: 10,
        pieces: [
          {
            gt: 0,
            lte: 20,
            color: '#93CE07',
          },
          {
            gt: 20,
            lte: 40,
            color: '#FBDB0F',
          },
          {
            gt: 40,
            lte: 60,
            color: '#FC7D02',
          },
          {
            gt: 60,
            lte: 80,
            color: '#FD0100',
          },
          {
            gt: 80,
            lte: 100,
            color: '#AA069F',
          },
        ],
        outOfRange: {
          color: '#999',
        },
      },
      grid: {
        left: '10%',
        right: '15%',
        bottom: '15%',
      },
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
      },
      series: [
        {
          name: 'Value',
          type: 'line',
          data: data.map((d) => [d.x, d.y]),
          symbol: 'none',
          sampling: 'lttb',
          lineStyle: {
            width: 2,
          },
          areaStyle: {},
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
          <h4>Visual Map - Data-Driven Visual Encoding</h4>
          <p>
            VisualMap provides powerful data-driven styling capabilities. Colors
            automatically change based on data values, making patterns and trends
            immediately visible. Chart.js requires custom plugins for similar functionality.
          </p>
          <ul className="feature-list">
            <li>Automatic color mapping based on value ranges</li>
            <li>Continuous or piecewise mapping</li>
            <li>Interactive legend</li>
            <li>Customizable color schemes</li>
          </ul>
        </div>
        <div ref={chartRef} className="feature-chart" />
      </div>
    </div>
  );
}
