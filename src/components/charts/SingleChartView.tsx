import { EChartsRenderer } from './EChartsRenderer';
import { ChartJsRenderer } from './ChartJsRenderer';
import { DataPoint, ChartType, ChartLibrary } from '../../types';
import './SingleChartView.css';

interface SingleChartViewProps {
  data: DataPoint[];
  chartType: ChartType;
  datasetSize: number;
  library: ChartLibrary;
  onLibraryChange: (library: ChartLibrary) => void;
}

export function SingleChartView({ data, chartType, datasetSize, library, onLibraryChange }: SingleChartViewProps) {
  return (
    <div className="single-chart-view">
      <div className="chart-card">
        {library === 'echarts' ? (
          <EChartsRenderer
            data={data}
            chartType={chartType}
            datasetSize={datasetSize}
          />
        ) : (
          <ChartJsRenderer
            data={data}
            chartType={chartType}
            datasetSize={datasetSize}
          />
        )}

        <div className="library-toggle">
          <button
            type="button"
            className={`toggle-btn ${library === 'echarts' ? 'active' : ''}`}
            onClick={() => onLibraryChange('echarts')}
          >
            ECharts
          </button>
          <button
            type="button"
            className={`toggle-btn ${library === 'chartjs' ? 'active' : ''}`}
            onClick={() => onLibraryChange('chartjs')}
          >
            Chart.js
          </button>
        </div>
      </div>
    </div>
  );
}
