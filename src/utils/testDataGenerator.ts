import { generateData } from './dataGenerator';
import { DATASET_SIZES } from './constants';

/**
 * Test data generation performance for all dataset sizes
 */
export function testDataGeneration() {
  console.log('=== Data Generation Performance Test ===\n');

  Object.entries(DATASET_SIZES).forEach(([size, count]) => {
    // Test data generation
    const start = performance.now();
    const data = generateData(count);
    const end = performance.now();
    const duration = end - start;

    console.log(`${size} (${count.toLocaleString()} points):`);
    console.log(`  Generation time: ${duration.toFixed(2)}ms`);
    console.log(`  Sample points: ${data.length}\n`);
  });

  console.log('=== Test Complete ===');
}
