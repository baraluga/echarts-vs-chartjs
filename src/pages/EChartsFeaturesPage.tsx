import { DataZoomDemo } from '../components/features/DataZoomDemo';
import { VisualMapDemo } from '../components/features/VisualMapDemo';
import { TimelineDemo } from '../components/features/TimelineDemo';
import { SankeyDemo } from '../components/features/SankeyDemo';
import { SaveAsImageDemo } from '../components/features/SaveAsImageDemo';
import './EChartsFeaturesPage.css';

export function EChartsFeaturesPage() {
  return (
    <div className="container">
      <div className="features-page">
        <div className="print-banner">
          <div className="print-banner-icon">🖨️</div>
          <div className="print-banner-content">
            <strong>Print-Optimized Page</strong>
            <p>This page has been specially formatted for printing. Press <kbd>Ctrl+P</kbd> (or <kbd>Cmd+P</kbd> on Mac) to print with optimized layout, B&W-friendly colors, and clean page breaks!</p>
          </div>
        </div>

        <div className="page-header">
          <h2>ECharts Exclusive Features</h2>
          <p className="page-description">
            Explore advanced visualization capabilities that set Apache ECharts
            apart from Chart.js. These features provide enhanced interactivity
            and data exploration capabilities that are not available in Chart.js
            without extensive custom development.
          </p>
        </div>

        <DataZoomDemo />
        <VisualMapDemo />
        <TimelineDemo />
        <SankeyDemo />
        <SaveAsImageDemo />
      </div>
    </div>
  );
}
