import { DataZoomDemo } from '../components/features/DataZoomDemo';
import { VisualMapDemo } from '../components/features/VisualMapDemo';
import { TimelineDemo } from '../components/features/TimelineDemo';
import { SankeyDemo } from '../components/features/SankeyDemo';
import { SaveAsImageDemo } from '../components/features/SaveAsImageDemo';
import './EChartsFeaturesPage.css';

export function EChartsFeaturesPage() {
  const printDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container">
      <div className="features-page">
        {/* Screen-only: Print instruction banner */}
        <div className="print-banner">
          <div className="print-banner-icon">🖨️</div>
          <div className="print-banner-content">
            <strong>Print-Optimized Page</strong>
            <p>This page has been specially formatted for printing. Press <kbd>Ctrl+P</kbd> (or <kbd>Cmd+P</kbd> on Mac) to print with optimized layout, B&W-friendly colors, and clean page breaks!</p>
          </div>
        </div>

        {/* Print-only: Cover header */}
        <div className="print-only print-cover">
          <div className="print-cover-decoration">
            <div className="print-cover-pattern"></div>
          </div>
          <div className="print-cover-content">
            <div className="print-logo">
              <svg viewBox="0 0 100 100" className="print-logo-icon">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
                <path d="M30 65 L30 35 L45 50 L30 65 M55 35 L70 35 L70 65 L55 65 L55 50 L65 50" fill="white" />
              </svg>
              <span>ECharts Features</span>
            </div>
            <h1 className="print-cover-title">Advanced Data Visualization</h1>
            <p className="print-cover-subtitle">
              A comprehensive guide to Apache ECharts' exclusive features
            </p>
            <div className="print-cover-meta">
              <span className="print-cover-date">📅 {printDate}</span>
              <span className="print-cover-type">📄 Feature Reference Handout</span>
            </div>
          </div>
          <div className="print-cover-footer">
            <p>Interactive version available at: <strong>echarts-vs-chartjs.demo</strong></p>
          </div>
        </div>

        {/* Print-only: Executive Summary */}
        <div className="print-only print-summary">
          <h2 className="print-summary-title">
            <span className="print-summary-icon">📊</span>
            Executive Summary
          </h2>
          <p className="print-summary-intro">
            This handout showcases five powerful features exclusive to Apache ECharts that 
            differentiate it from Chart.js. Each feature enables advanced data exploration 
            and visualization capabilities without extensive custom development.
          </p>
          <div className="print-summary-grid">
            <div className="print-summary-card">
              <div className="print-summary-card-icon">🔍</div>
              <h3>DataZoom</h3>
              <p>Interactive zoom & pan for exploring large datasets with slider and gesture controls.</p>
            </div>
            <div className="print-summary-card">
              <div className="print-summary-card-icon">🎨</div>
              <h3>VisualMap</h3>
              <p>Dynamic color mapping based on data values with continuous or piecewise legends.</p>
            </div>
            <div className="print-summary-card">
              <div className="print-summary-card-icon">⏱️</div>
              <h3>Timeline</h3>
              <p>Animated time-series playback with automatic transitions between data states.</p>
            </div>
            <div className="print-summary-card">
              <div className="print-summary-card-icon">🌊</div>
              <h3>Sankey</h3>
              <p>Flow diagrams showing magnitude of relationships between nodes in a system.</p>
            </div>
            <div className="print-summary-card">
              <div className="print-summary-card-icon">💾</div>
              <h3>Save as Image</h3>
              <p>Built-in export functionality to download charts as PNG or SVG files.</p>
            </div>
          </div>
          <div className="print-summary-note">
            <strong>💡 Pro Tip:</strong> Visit the interactive version to experience these features hands-on. 
            The printed charts represent static snapshots of dynamic, interactive visualizations.
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

        {/* Feature 1: DataZoom */}
        <div className="print-only print-annotation print-annotation-teal">
          <div className="print-annotation-badge">Feature 1 of 5</div>
          <div className="print-annotation-content">
            <strong>🔍 DataZoom Deep Dive</strong>
            <p>
              DataZoom transforms static charts into explorable data landscapes. Unlike Chart.js 
              which requires the zoom plugin with limited functionality, ECharts provides native 
              support for both slider-based and inside (gesture-based) zooming. This is particularly 
              valuable for time-series data with thousands of points.
            </p>
            <div className="print-annotation-stats">
              <span>⚡ Handles 100K+ data points</span>
              <span>📱 Touch-friendly</span>
              <span>🎯 LTTB sampling</span>
            </div>
          </div>
        </div>
        <DataZoomDemo />

        {/* Feature 2: VisualMap */}
        <div className="print-only print-annotation print-annotation-purple">
          <div className="print-annotation-badge">Feature 2 of 5</div>
          <div className="print-annotation-content">
            <strong>🎨 VisualMap Deep Dive</strong>
            <p>
              VisualMap provides automatic color encoding based on data dimensions—a feature 
              that requires significant custom code in Chart.js. It supports both continuous 
              gradients and discrete piecewise mappings, making it ideal for heatmaps, 
              geographic visualizations, and any chart where color conveys meaning.
            </p>
            <div className="print-annotation-stats">
              <span>🌈 Continuous gradients</span>
              <span>📊 Piecewise legends</span>
              <span>🖱️ Interactive filtering</span>
            </div>
          </div>
        </div>
        <VisualMapDemo />

        {/* Feature 3: Timeline */}
        <div className="print-only print-annotation print-annotation-orange">
          <div className="print-annotation-badge">Feature 3 of 5</div>
          <div className="print-annotation-content">
            <strong>⏱️ Timeline Deep Dive</strong>
            <p>
              The Timeline component enables animated storytelling with data. Charts automatically 
              transition between different states (years, categories, scenarios) with smooth 
              animations. This is invaluable for presentations and dashboards showing trends 
              over time—a capability completely absent from Chart.js core.
            </p>
            <div className="print-annotation-stats">
              <span>▶️ Auto-play support</span>
              <span>🔄 Smooth transitions</span>
              <span>📈 Multi-series sync</span>
            </div>
          </div>
        </div>
        <TimelineDemo />

        {/* Feature 4: Sankey */}
        <div className="print-only print-annotation print-annotation-blue">
          <div className="print-annotation-badge">Feature 4 of 5</div>
          <div className="print-annotation-content">
            <strong>🌊 Sankey Deep Dive</strong>
            <p>
              Sankey diagrams visualize flow and relationships—perfect for showing energy 
              transfers, user journeys, budget allocations, or any scenario where quantities 
              flow between nodes. Chart.js has no native Sankey support; achieving this 
              requires third-party libraries or D3.js integration.
            </p>
            <div className="print-annotation-stats">
              <span>🔗 Flow visualization</span>
              <span>📐 Auto layout</span>
              <span>🎯 Hover details</span>
            </div>
          </div>
        </div>
        <SankeyDemo />

        {/* Feature 5: Save as Image */}
        <div className="print-only print-annotation print-annotation-green">
          <div className="print-annotation-badge">Feature 5 of 5</div>
          <div className="print-annotation-content">
            <strong>💾 Save as Image Deep Dive</strong>
            <p>
              Built-in toolbox with one-click export to PNG or SVG. Users can capture 
              exactly what they see, including current zoom levels and selections. 
              Chart.js requires custom canvas-to-image code and loses interactivity 
              context. ECharts also supports data view and chart type switching.
            </p>
            <div className="print-annotation-stats">
              <span>📸 PNG export</span>
              <span>🖼️ SVG export</span>
              <span>🔧 Built-in toolbox</span>
            </div>
          </div>
        </div>
        <SaveAsImageDemo />

        {/* Print-only: Footer notes */}
        <div className="print-only print-footer-notes">
          <div className="print-footer-divider"></div>
          <h3>📝 Additional Notes</h3>
          <div className="print-footer-columns">
            <div className="print-footer-column">
              <h4>When to Choose ECharts</h4>
              <ul>
                <li>Large datasets (10K+ points)</li>
                <li>Complex interactivity needs</li>
                <li>Time-series with exploration</li>
                <li>Flow/relationship diagrams</li>
                <li>Dashboard applications</li>
              </ul>
            </div>
            <div className="print-footer-column">
              <h4>When Chart.js May Suffice</h4>
              <ul>
                <li>Simple, static charts</li>
                <li>Smaller datasets</li>
                <li>Bundle size is critical</li>
                <li>Basic bar/line/pie charts</li>
                <li>Quick prototypes</li>
              </ul>
            </div>
            <div className="print-footer-column">
              <h4>Resources</h4>
              <ul>
                <li>echarts.apache.org</li>
                <li>ECharts Examples Gallery</li>
                <li>ECharts GitHub Repository</li>
                <li>Chart.js Documentation</li>
                <li>This interactive demo</li>
              </ul>
            </div>
          </div>
          <div className="print-footer-qr">
            <div className="print-qr-placeholder">
              <div className="print-qr-pattern"></div>
            </div>
            <p>Scan for interactive version</p>
          </div>
        </div>
      </div>
    </div>
  );
}
