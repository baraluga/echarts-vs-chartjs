import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ComparePage } from './pages/ComparePage';
import { EChartsFeaturesPage } from './pages/EChartsFeaturesPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ComparePage />} />
          <Route path="/features" element={<EChartsFeaturesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
