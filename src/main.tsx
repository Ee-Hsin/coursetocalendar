import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

var options = {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.05,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1
};

setTimeout(() => {
  window.grained("#grain", options);
}, 2000)
