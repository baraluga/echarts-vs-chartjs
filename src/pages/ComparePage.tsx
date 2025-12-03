import { useState, useMemo } from 'react';
import { ControlPanel } from '../components/controls/ControlPanel';
import { SingleChartView } from '../components/charts/SingleChartView';
import { DatasetSize, ChartType, ChartLibrary } from '../types';
import { generateData } from '../utils/dataGenerator';
import { DATASET_SIZES } from '../utils/constants';
import './ComparePage.css';

export function ComparePage() {
  const [datasetSize, setDatasetSize] = useState<DatasetSize>('small');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [library, setLibrary] = useState<ChartLibrary>('echarts');

  // Generate and cache data
  // Data is the same for both libraries to ensure fair comparison
  const chartData = useMemo(() => {
    const count = DATASET_SIZES[datasetSize];
    console.log(`Generating ${count.toLocaleString()} data points...`);

    const startTime = performance.now();
    const data = generateData(count);
    const endTime = performance.now();

    console.log(`Data generation completed in ${(endTime - startTime).toFixed(2)}ms`);
    return data;
  }, [datasetSize]);

  return (
    <div className="container">
      <div className="compare-page">
        <div className="page-header">
          <h2>Performance Comparison</h2>
          <p className="page-description">
            Compare rendering performance between Apache ECharts and Chart.js
            with different dataset sizes and chart types. Toggle between libraries
            and hover over charts to see FPS metrics.
          </p>
        </div>

        <ControlPanel
          datasetSize={datasetSize}
          chartType={chartType}
          onDatasetSizeChange={setDatasetSize}
          onChartTypeChange={setChartType}
        />

        <SingleChartView
          data={chartData}
          chartType={chartType}
          datasetSize={DATASET_SIZES[datasetSize]}
          library={library}
          onLibraryChange={setLibrary}
        />
      </div>
    </div>
  );
}
