import { useState, useCallback, useRef } from 'react';
import { PerformanceMetrics } from '../types';

export function usePerformanceMetrics(chartId: string) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    updateTime: 0,
    fps: 0,
  });

  const renderStartTime = useRef<number | null>(null);
  const updateStartTime = useRef<number | null>(null);

  /**
   * Mark the start of initial render
   */
  const startRenderMeasure = useCallback(() => {
    performance.mark(`${chartId}-render-start`);
    renderStartTime.current = performance.now();
  }, [chartId]);

  /**
   * Mark the end of initial render and calculate duration
   */
  const endRenderMeasure = useCallback(() => {
    if (!renderStartTime.current) return;

    performance.mark(`${chartId}-render-end`);
    performance.measure(
      `${chartId}-render`,
      `${chartId}-render-start`,
      `${chartId}-render-end`
    );

    const measure = performance.getEntriesByName(`${chartId}-render`)[0];
    const renderTime = measure.duration;

    setMetrics((prev) => ({ ...prev, renderTime }));

    // Clean up marks
    performance.clearMarks(`${chartId}-render-start`);
    performance.clearMarks(`${chartId}-render-end`);
    performance.clearMeasures(`${chartId}-render`);

    renderStartTime.current = null;
  }, [chartId]);

  /**
   * Mark the start of an update/re-render
   */
  const startUpdateMeasure = useCallback(() => {
    performance.mark(`${chartId}-update-start`);
    updateStartTime.current = performance.now();
  }, [chartId]);

  /**
   * Mark the end of an update and calculate duration
   */
  const endUpdateMeasure = useCallback(() => {
    if (!updateStartTime.current) return;

    performance.mark(`${chartId}-update-end`);
    performance.measure(
      `${chartId}-update`,
      `${chartId}-update-start`,
      `${chartId}-update-end`
    );

    const measure = performance.getEntriesByName(`${chartId}-update`)[0];
    const updateTime = measure.duration;

    setMetrics((prev) => ({ ...prev, updateTime }));

    // Clean up marks
    performance.clearMarks(`${chartId}-update-start`);
    performance.clearMarks(`${chartId}-update-end`);
    performance.clearMeasures(`${chartId}-update`);

    updateStartTime.current = null;
  }, [chartId]);

  /**
   * Update FPS metric
   */
  const updateFPS = useCallback((fps: number) => {
    setMetrics((prev) => ({ ...prev, fps }));
  }, []);

  /**
   * Reset all metrics
   */
  const resetMetrics = useCallback(() => {
    setMetrics({
      renderTime: 0,
      updateTime: 0,
      fps: 0,
    });
  }, []);

  return {
    metrics,
    startRenderMeasure,
    endRenderMeasure,
    startUpdateMeasure,
    endUpdateMeasure,
    updateFPS,
    resetMetrics,
  };
}
