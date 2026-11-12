import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('मुख्य पृष्ठ पर #root तत्व नहीं मिला।');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // सेवा कर्मी विफल होने पर भी मुख्य ऐप चलता रहेगा।
    });
  });
}
