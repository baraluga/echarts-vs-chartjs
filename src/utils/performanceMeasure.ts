/**
 * Performance measurement utilities
 */

/**
 * Create a performance mark with optional metadata
 */
export function createMark(name: string, detail?: Record<string, unknown>): void {
  performance.mark(name, detail ? { detail } : undefined);
}

/**
 * Measure performance between two marks
 */
export function measureBetweenMarks(
  measureName: string,
  startMark: string,
  endMark: string
): PerformanceMeasure | null {
  try {
    performance.measure(measureName, startMark, endMark);
    const measures = performance.getEntriesByName(measureName, 'measure');
    return measures.length > 0 ? (measures[measures.length - 1] as PerformanceMeasure) : null;
  } catch (error) {
    console.error('Error measuring performance:', error);
    return null;
  }
}

/**
 * Clear all marks and measures for a given prefix
 */
export function clearPerformanceData(prefix: string): void {
  performance.getEntriesByType('mark').forEach((entry) => {
    if (entry.name.startsWith(prefix)) {
      performance.clearMarks(entry.name);
    }
  });

  performance.getEntriesByType('measure').forEach((entry) => {
    if (entry.name.startsWith(prefix)) {
      performance.clearMeasures(entry.name);
    }
  });
}

/**
 * Get all measurements for a given prefix
 */
export function getPerformanceMeasures(prefix: string): PerformanceMeasure[] {
  return performance
    .getEntriesByType('measure')
    .filter((entry) => entry.name.startsWith(prefix)) as PerformanceMeasure[];
}

/**
 * Format milliseconds to readable string
 */
export function formatDuration(ms: number): string {
  if (ms < 1) {
    return `${(ms * 1000).toFixed(2)}μs`;
  } else if (ms < 1000) {
    return `${ms.toFixed(2)}ms`;
  } else {
    return `${(ms / 1000).toFixed(2)}s`;
  }
}

/**
 * Calculate average of an array of numbers
 */
export function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

/**
 * Calculate median of an array of numbers
 */
export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/**
 * Get memory usage if available (Chrome only)
 */
export function getMemoryUsage(): number | null {
  if ('memory' in performance) {
    const memory = (performance as unknown as { memory: { usedJSHeapSize: number } }).memory;
    return memory.usedJSHeapSize / (1024 * 1024); // Convert to MB
  }
  return null;
}
