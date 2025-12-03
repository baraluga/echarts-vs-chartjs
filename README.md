# ECharts vs Chart.js Performance Comparison

A mobile-first responsive React application that compares Apache ECharts and Chart.js performance across different dataset sizes (1K to 1M data points).

## Features

### Performance Comparison
- **Side-by-side rendering** of both libraries with identical datasets
- **Real-time performance metrics**:
  - Initial render time
  - Update/re-render time
  - FPS during interaction (hover/zoom/pan)
- **Multiple dataset sizes**: 1K, 10K, 100K, 1M data points
- **Chart types**: Line charts and Mixed charts (line + bar)

### ECharts Exclusive Features
Showcase of advanced capabilities not available in Chart.js:
- **DataZoom**: Interactive zooming and panning with slider controls
- **VisualMap**: Data-driven visual encoding with automatic color mapping
- **Timeline**: Animated temporal visualization with automatic playback

## Tech Stack

- **Build Tool**: Vite 5.3
- **Framework**: React 18 with TypeScript
- **Chart Libraries**:
  - Apache ECharts 5.5
  - Chart.js 4.4 (with react-chartjs-2)
- **Data Generation**: @faker-js/faker
- **Routing**: react-router-dom

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at http://localhost:3000

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Layout components
│   ├── charts/          # EChartsRenderer, ChartJsRenderer, ChartComparison
│   ├── controls/        # Dataset size/type selectors, ControlPanel
│   ├── metrics/         # Performance metrics display components
│   └── features/        # ECharts feature demos (DataZoom, VisualMap, Timeline)
├── hooks/
│   ├── useECharts.ts    # Custom ECharts lifecycle management
│   ├── usePerformanceMetrics.ts  # Performance tracking with Performance API
│   ├── useFPSCounter.ts # FPS measurement via requestAnimationFrame
│   └── useResponsive.ts # Breakpoint detection
├── pages/
│   ├── ComparePage.tsx  # Main comparison page
│   └── EChartsFeaturesPage.tsx # Features showcase
├── utils/
│   ├── dataGenerator.ts # Data generation with TypedArray optimization
│   ├── chartConfigs.ts  # Chart configuration factories
│   ├── performanceMeasure.ts # Performance utilities
│   └── constants.ts     # App constants
├── types/               # TypeScript type definitions
└── styles/              # Global and mobile-specific CSS
```

## Key Features

### Performance Measurement

The app uses multiple techniques to accurately measure chart performance:

1. **Performance API** (mark/measure) for render and update timing
2. **requestAnimationFrame** for FPS measurement during interactions
3. **React Profiler** for component-level tracking

**Important**: Data generation happens OUTSIDE performance measurement scope using `useMemo` to prevent skewing metrics.

### Large Dataset Optimization

- **TypedArray** for efficient 1M dataset generation
- **Automatic sampling/decimation** for 100K+ datasets
- **Smart optimizations**: Animations and point symbols disabled for large datasets
- **Touch event throttling** for mobile performance

### Mobile-First Design

- **Responsive breakpoints**:
  - Mobile: < 640px
  - Tablet: 641px - 1024px
  - Desktop: > 1024px
- **Touch-optimized** with `touch-action: none` on chart containers
- **Minimum 44px touch targets** for accessibility
- **Progressive chart heights** per breakpoint

## Performance Targets

- **Small (1K)**: < 100ms render time
- **Medium (10K)**: < 300ms render time
- **Large (100K)**: < 1s render time
- **Extra Large (1M)**: < 3s render time (with sampling)
- **FPS**: > 30 FPS (mobile), > 60 FPS (desktop)

## Architecture Highlights

### Custom ECharts Hook

Uses a custom `useECharts` hook instead of echarts-for-react for:
- Precise control over instance lifecycle
- Performance measurement insertion points
- Direct access to chart instance

### Data Generation Pattern

```typescript
// Generate and cache data BEFORE rendering
const chartData = useMemo(() =>
  generateLineData(DATASET_SIZES[datasetSize]),
  [datasetSize]
);

// Pass pre-generated data to renderers
<EChartsRenderer data={chartData} />
```

### Performance Measurement Pattern

```typescript
// Start measurement before render
startRenderMeasure();

// Render chart
setOption(config);

// End measurement after paint
requestAnimationFrame(() => {
  endRenderMeasure();
});
```

## Browser Support

- Modern browsers with ES2020 support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+

## Development Notes

- ESLint rules are enforced - do not disable rules
- Use micro-commits by grouping changes by logical scope
- Mobile-first approach for all new features
- Performance measurement isolation is critical

## License

MIT

## Contributing

Contributions are welcome! Please ensure:
1. All ESLint rules pass
2. TypeScript compiles without errors
3. Performance targets are maintained
4. Mobile responsiveness is preserved
