import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="min-h-screen bg-paper text-ink-primary font-body flex flex-col">
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);