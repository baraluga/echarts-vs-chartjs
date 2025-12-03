import { useRef, useEffect, useState, RefObject } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts';

export function useECharts(containerRef: RefObject<HTMLDivElement>) {
  const chartInstance = useRef<ECharts | null>(null);
  const [isReady, setIsReady] = useState(false);
  const resizeObserver = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize chart
    chartInstance.current = echarts.init(containerRef.current);
    setIsReady(true);

    // Handle resize with ResizeObserver
    resizeObserver.current = new ResizeObserver(() => {
      chartInstance.current?.resize();
    });
    resizeObserver.current.observe(containerRef.current);

    return () => {
      // Cleanup
      resizeObserver.current?.disconnect();
      chartInstance.current?.dispose();
      chartInstance.current = null;
      setIsReady(false);
    };
  }, [containerRef]);

  const setOption = (option: EChartsOption, opts?: SetOptionOpts) => {
    if (chartInstance.current) {
      chartInstance.current.setOption(option, opts);
    }
  };

  const getInstance = () => chartInstance.current;

  return { chartInstance: chartInstance.current, isReady, setOption, getInstance };
}
