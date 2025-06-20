import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importar BrowserRouter
import './index.css';
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos de react-datepicker
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Envolver App con BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
