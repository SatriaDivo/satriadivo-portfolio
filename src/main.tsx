import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-paper text-ink-primary font-body flex flex-col">
      <App />
    </div>
  </StrictMode>
);