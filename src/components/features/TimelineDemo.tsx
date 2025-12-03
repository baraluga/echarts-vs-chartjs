import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import './FeatureDemo.css';

export function TimelineDemo() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    // Generate data for multiple time periods (years 2020-2024)
    const years = ['2020', '2021', '2022', '2023', '2024'];
    const categories = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];

    const generateYearData = (year: number) => {
      return categories.map((_category, idx) => {
        const base = 20 + idx * 10;
        const variation = (year - 2020) * 5 + Math.random() * 10;
        return Math.round(base + variation);
      });
    };

    const option: echarts.EChartsOption = {
      baseOption: {
        timeline: {
          axisType: 'category',
          data: years,
          autoPlay: true,
          playInterval: 2000,
          left: '10%',
          right: '10%',
          bottom: '5%',
        },
        title: {
          text: 'Timeline - Temporal Data Animation',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          top: 40,
          data: categories,
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '20%',
          bottom: '20%',
        },
        xAxis: {
          type: 'category',
          data: ['Q1', 'Q2', 'Q3', 'Q4'],
          splitLine: { show: false },
        },
        yAxis: {
          type: 'value',
          name: 'Sales',
        },
      },
      options: years.map((year, yearIdx) => ({
        title: {
          text: `Timeline - Temporal Data Animation (${year})`,
        },
        series: categories.map((category) => {
          const yearData = generateYearData(2020 + yearIdx);
          return {
            name: category,
            type: 'bar',
            data: [
              Math.round(yearData[categories.indexOf(category)] * (0.8 + Math.random() * 0.4)),
              Math.round(yearData[categories.indexOf(category)] * (0.9 + Math.random() * 0.4)),
              Math.round(yearData[categories.indexOf(category)] * (0.85 + Math.random() * 0.4)),
              Math.round(yearData[categories.indexOf(category)] * (1.0 + Math.random() * 0.3)),
            ],
          };
        }),
      })),
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
          <h4>Timeline - Animated Temporal Visualization</h4>
          <p>
            The Timeline component enables animated visualization of data changes
            over time. Watch as the chart automatically transitions through different
            time periods. Chart.js has no built-in equivalent feature.
          </p>
          <ul className="feature-list">
            <li>Automatic animation playback</li>
            <li>Manual timeline control</li>
            <li>Smooth transitions between time periods</li>
            <li>Perfect for showing trends over time</li>
          </ul>
        </div>
        <div ref={chartRef} className="feature-chart" />
      </div>
    </div>
  );
}
