import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import './FeatureDemo.css';

export function SankeyDemo() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    // Sample data representing energy flow
    const data = {
      nodes: [
        { name: 'Coal' },
        { name: 'Natural Gas' },
        { name: 'Solar' },
        { name: 'Wind' },
        { name: 'Electricity' },
        { name: 'Heating' },
        { name: 'Industrial' },
        { name: 'Residential' },
        { name: 'Commercial' },
      ],
      links: [
        { source: 'Coal', target: 'Electricity', value: 30 },
        { source: 'Natural Gas', target: 'Electricity', value: 25 },
        { source: 'Natural Gas', target: 'Heating', value: 15 },
        { source: 'Solar', target: 'Electricity', value: 10 },
        { source: 'Wind', target: 'Electricity', value: 15 },
        { source: 'Electricity', target: 'Industrial', value: 35 },
        { source: 'Electricity', target: 'Residential', value: 25 },
        { source: 'Electricity', target: 'Commercial', value: 20 },
        { source: 'Heating', target: 'Residential', value: 10 },
        { source: 'Heating', target: 'Commercial', value: 5 },
      ],
    };

    const option: echarts.EChartsOption = {
      title: {
        text: 'Energy Flow Sankey Diagram',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'sankey',
          data: data.nodes,
          links: data.links,
          emphasis: {
            focus: 'adjacency',
          },
          lineStyle: {
            color: 'gradient',
            curveness: 0.5,
          },
          label: {
            color: '#333',
            fontWeight: 'bold',
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
          <h4>Sankey Diagram - Flow Visualization</h4>
          <p>
            Sankey diagrams visualize the flow of resources, energy, or data between
            different stages or categories. The width of each flow represents the
            quantity, making it easy to see proportions and relationships at a glance.
          </p>
          <ul className="feature-list">
            <li>Built-in chart type in ECharts</li>
            <li>Interactive hover highlighting</li>
            <li>Automatic layout calculation</li>
            <li>Customizable colors and styles</li>
            <li>Not available in Chart.js</li>
          </ul>
        </div>
        <div ref={chartRef} className="feature-chart" />
      </div>
    </div>
  );
}
