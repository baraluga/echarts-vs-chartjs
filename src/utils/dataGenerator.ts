import { faker } from '@faker-js/faker';
import { DataPoint } from '../types';

/**
 * Generate chart data points
 */
export function generateData(count: number): DataPoint[] {
  const data: DataPoint[] = [];
  const startDate = new Date(2024, 0, 1).getTime();

  // Use seed for reproducible results
  faker.seed(12345);

  for (let i = 0; i < count; i++) {
    data.push({
      x: startDate + i * 60000, // 1-minute intervals
      y: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
    });
  }

  return data;
}


/**
 * Decimate data for display optimization
 * Uses Largest Triangle Three Buckets (LTTB) sampling algorithm
 */
export function decimateData(
  data: DataPoint[],
  targetSize: number
): DataPoint[] {
  if (data.length <= targetSize) return data;

  const bucketSize = (data.length - 2) / (targetSize - 2);
  const sampled: DataPoint[] = [data[0]]; // Always include first point

  for (let i = 0; i < targetSize - 2; i++) {
    const avgRangeStart = Math.floor((i + 1) * bucketSize) + 1;
    const avgRangeEnd = Math.floor((i + 2) * bucketSize) + 1;
    const avgRangeLength = avgRangeEnd - avgRangeStart;

    let avgX = 0;
    let avgY = 0;

    for (let j = avgRangeStart; j < avgRangeEnd; j++) {
      avgX += data[j].x;
      avgY += data[j].y;
    }
    avgX /= avgRangeLength;
    avgY /= avgRangeLength;

    // Get the range for this bucket
    const rangeStart = Math.floor(i * bucketSize) + 1;
    const rangeEnd = Math.floor((i + 1) * bucketSize) + 1;

    // Select point with largest triangle area
    let maxArea = -1;
    let maxAreaPoint = data[rangeStart];
    const pointAX = sampled[sampled.length - 1].x;
    const pointAY = sampled[sampled.length - 1].y;

    for (let j = rangeStart; j < rangeEnd; j++) {
      const area = Math.abs(
        (pointAX - avgX) * (data[j].y - pointAY) -
        (pointAX - data[j].x) * (avgY - pointAY)
      ) * 0.5;

      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = data[j];
      }
    }

    sampled.push(maxAreaPoint);
  }

  sampled.push(data[data.length - 1]); // Always include last point

  return sampled;
}

/**
 * Get optimal point count for rendering based on viewport width
 */
export function getOptimalPointCount(dataLength: number, viewportWidth: number): number {
  // Aim for roughly 1 point per pixel for smooth rendering
  const maxPoints = Math.min(viewportWidth * 2, dataLength);
  return Math.max(100, maxPoints); // Minimum 100 points for smooth curves
}
