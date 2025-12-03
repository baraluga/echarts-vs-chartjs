import { generateLineData, generateMixedData } from './dataGenerator';
import { DATASET_SIZES } from './constants';

/**
 * Test data generation performance for all dataset sizes
 */
export function testDataGeneration() {
  console.log('=== Data Generation Performance Test ===\n');

  Object.entries(DATASET_SIZES).forEach(([size, count]) => {
    // Test line data generation
    const lineStart = performance.now();
    const lineData = generateLineData(count);
    const lineEnd = performance.now();
    const lineDuration = lineEnd - lineStart;

    console.log(`${size} (${count.toLocaleString()} points):`);
    console.log(`  Line data: ${lineDuration.toFixed(2)}ms`);
    console.log(`  Sample points: ${lineData.length}`);

    // Test mixed data generation
    const mixedStart = performance.now();
    const mixedData = generateMixedData(count);
    const mixedEnd = performance.now();
    const mixedDuration = mixedEnd - mixedStart;

    console.log(`  Mixed data: ${mixedDuration.toFixed(2)}ms`);
    console.log(`  Sample points: ${mixedData.length}\n`);
  });

  console.log('=== Test Complete ===');
}
