import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Statistic from './pages/Statistic';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="statistic" element={<Statistic />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>	
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
