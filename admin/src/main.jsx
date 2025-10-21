import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Routes, Route, useNavigate } from "react-router-dom";

import  {BrowserRouter}  from 'react-router-dom';
import AdminContextProvider  from './context/AdminContext';
import  DoctorContextProvider from './context/DoctorContext';
import  AppContextProvider  from './context/AppContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <DoctorContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </DoctorContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </StrictMode>
);
