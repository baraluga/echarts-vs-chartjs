# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A mobile-first responsive React application that compares Apache ECharts and Chart.js performance across different dataset sizes (1K to 1M data points). The app features:
- Side-by-side performance comparison with real-time metrics
- Line and mixed chart types
- Performance metrics: render time, update time, FPS during interaction
- ECharts exclusive features showcase (DataZoom, VisualMap, Timeline)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Tech Stack

- **Build Tool**: Vite 5.3
- **Framework**: React 18 with TypeScript
- **Chart Libraries**: Apache ECharts 5.5, Chart.js 4.4 (with react-chartjs-2)
- **Data Generation**: @faker-js/faker
- **Routing**: react-router-dom

## Architecture

### Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Layout components
│   ├── charts/          # EChartsRenderer, ChartJsRenderer
│   ├── controls/        # Dataset size/type selectors
│   ├── metrics/         # Performance metrics display
│   └── features/        # ECharts feature demos
├── hooks/
│   ├── useECharts.ts    # Custom ECharts lifecycle hook
│   ├── usePerformanceMetrics.ts  # Performance tracking
│   └── useFPSCounter.ts # FPS measurement via RAF
├── pages/
│   ├── ComparePage.tsx  # Main comparison page
│   └── EChartsFeaturesPage.tsx # Features showcase
├── utils/
│   ├── dataGenerator.ts # Data generation with TypedArray optimization
│   ├── chartConfigs.ts  # Chart configuration factories
│   └── performanceMeasure.ts # Performance utilities
├── types/               # TypeScript type definitions
└── styles/              # Global and mobile-specific CSS
```

### Key Design Principles

1. **Performance Measurement Isolation**: Data generation happens OUTSIDE performance measurement scope using `useMemo` to prevent skewing metrics

2. **Custom ECharts Hook**: Uses custom `useECharts` hook instead of echarts-for-react for precise control over instance lifecycle and performance measurement insertion points

3. **Large Dataset Optimization**:
   - TypedArray for 1M dataset generation
   - Automatic sampling/decimation for 100K+ datasets
   - Animation and point symbols disabled for large datasets
   - Touch event throttling for mobile performance

4. **Performance Tracking**:
   - Performance API (mark/measure) for render and update timing
   - requestAnimationFrame for FPS measurement during interactions
   - React Profiler for component-level tracking

5. **Mobile-First Design**:
   - Responsive breakpoints: <640px (mobile), 641-1024px (tablet), >1024px (desktop)
   - Touch-action: none on chart containers
   - Minimum 44px touch targets
   - Progressive chart heights per breakpoint

### Critical Patterns

**Data Generation Pattern**:
```typescript
// Generate and cache data BEFORE rendering
const chartData = useMemo(() =>
  generateLineData(DATASET_SIZES[datasetSize]),
  [datasetSize]
);

// Pass pre-generated data to renderers
<EChartsRenderer data={chartData} />
```

**Performance Measurement Pattern**:
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

## Dataset Sizes

- Small: 1,000 points
- Medium: 10,000 points
- Large: 100,000 points
- Extra Large: 1,000,000 points

## Performance Targets

- Small (1K): < 100ms render time
- Medium (10K): < 300ms render time
- Large (100K): < 1s render time
- Extra Large (1M): < 3s render time (with sampling)
- FPS: > 30 FPS (mobile), > 60 FPS (desktop)

## Notes

- Vite configuration includes code splitting for chart libraries (echarts, chartjs, react-vendor chunks)
- ESLint rules are enforced - DO NOT disable eslint rules
- Use micro-commits by grouping changes by logical scope
- Confirm understanding before making actual changes when asked "makes sense"
