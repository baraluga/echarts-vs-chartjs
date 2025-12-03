import { DataZoomDemo } from '../components/features/DataZoomDemo';
import { VisualMapDemo } from '../components/features/VisualMapDemo';
import { TimelineDemo } from '../components/features/TimelineDemo';
import './EChartsFeaturesPage.css';

export function EChartsFeaturesPage() {
  return (
    <div className="container">
      <div className="features-page">
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
      </div>
    </div>
  );
}
