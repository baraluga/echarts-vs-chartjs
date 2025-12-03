export interface PerformanceMetrics {
  renderTime: number;        // Initial render time in milliseconds
  updateTime: number;        // Update/re-render time in milliseconds
  fps: number;              // Frames per second during interaction
  memoryUsage?: number;     // Optional: heap size in MB
}

export interface PerformanceMark {
  id: string;
  timestamp: number;
}

export interface PerformanceMeasurement {
  name: string;
  duration: number;
  startTime: number;
  endTime: number;
}
