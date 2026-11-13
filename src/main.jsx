import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('मुख्य पृष्ठ पर ऐप का स्थान नहीं मिला।');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // सेवा कर्मी उपलब्ध न हो, तब भी ऐप सामान्य रूप से चलेगा।
    });
  });
}
