import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="min-h-screen bg-paper text-ink-circuit font-body flex flex-col">
        <Routes>
          {/* Main Portfolio */}
          <Route path="/" element={<App />} />
          
          {/* Blog / Technical Logs */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);