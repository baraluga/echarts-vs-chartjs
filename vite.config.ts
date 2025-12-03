import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize for performance comparison
    minify: 'esbuild', // Use esbuild for faster builds
    // Separate vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'echarts': ['echarts'],
          'chartjs': ['chart.js', 'react-chartjs-2'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
